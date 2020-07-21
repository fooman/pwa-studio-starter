import { useCallback, useState, useMemo } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useCartContext } from '@magento/peregrine/lib/context/cart';

import { appendOptionsToPayload } from '@magento/peregrine/lib/util/appendOptionsToPayload';
import { findMatchingVariant } from '@magento/peregrine/lib/util/findMatchingProductVariant';
import { isProductConfigurable } from '@magento/peregrine/lib/util/isProductConfigurable';

const INITIAL_OPTION_CODES = new Map();
const INITIAL_OPTION_SELECTIONS = new Map();
const INITIAL_QUANTITY = 1;

const deriveOptionCodesFromProduct = product => {
    // If this is a simple product it has no option codes.
    if (!isProductConfigurable(product)) {
        return INITIAL_OPTION_CODES;
    }

    // Initialize optionCodes based on the options of the product.
    const initialOptionCodes = new Map();
    if(product.options){
        for (const {
            option_id,
            title
        } of product.options) {
            initialOptionCodes.set(option_id, title);
        }
    }
    else{
        for (const {
            attribute_id,
            attribute_code
        } of product.configurable_options) {
            initialOptionCodes.set(attribute_id, attribute_code);
        }
    }

    return initialOptionCodes;
};

// Similar to deriving the initial codes for each option.
const deriveOptionSelectionsFromProduct = product => {
    if (!isProductConfigurable(product)) {
        return INITIAL_OPTION_SELECTIONS;
    }
    const initialOptionSelections = new Map();
    if(product.options){
        for (const { option_id } of product.options) {
            initialOptionSelections.set(option_id, undefined);
        }
    }
    else {
        for (const {attribute_id} of product.configurable_options) {
            initialOptionSelections.set(attribute_id, undefined);
        }
    }

    return initialOptionSelections;
};

const getIsMissingOptions = (product, optionSelections) => {
    // Non-configurable products can't be missing options.
    if (!isProductConfigurable(product)) {
        return false;
    }

    // Configurable products are missing options if we have fewer
    // option selections than the product has options.
    const { configurable_options = {}, options = {} } = product;
    const numProductOptions = configurable_options.length ? configurable_options.length : options.length;
    const numProductSelections = Array.from(optionSelections.values()).filter(
        value => !undefined
    ).length;

    return numProductSelections < numProductOptions;
};

const getMediaGalleryEntries = (product, optionCodes, optionSelections) => {
    let value = [];

    const { media_gallery_entries, variants } = product;
    const isConfigurable = isProductConfigurable(product);

    // Selections are initialized to "code => undefined". Once we select a value, like color, the selections change. This filters out unselected options.
    const optionsSelected = product.options &&
        Array.from(optionSelections.values()).filter(value => !!value).length >
        0;

    if (!isConfigurable || !optionsSelected) {
        value = media_gallery_entries;
    } else {
        // If any of the possible variants matches the selection add that
        // variant's image to the media gallery. NOTE: This _can_, and does,
        // include variants such as size. If Magento is configured to display
        // an image for a size attribute, it will render that image.
        // const item = findMatchingVariant({
        //     optionCodes,
        //     optionSelections,
        //     variants
        // });

        // value = item
        //     ? [...item.product.media_gallery_entries, ...media_gallery_entries]
        //     : media_gallery_entries;

        value = media_gallery_entries;
    }

    return value;
};

// We only want to display breadcrumbs for one category on a PDP even if a
// product has multiple related categories. This function filters and selects
// one category id for that purpose.
const getBreadcrumbCategoryId = categories => {
    // Exit if there are no categories for this product.
    if (!categories || !categories.length) {
        return;
    }
    const breadcrumbSet = new Set();
    categories.forEach(({ breadcrumbs }) => {
        // breadcrumbs can be `null`...
        (breadcrumbs || []).forEach(({ category_id }) =>
            breadcrumbSet.add(category_id)
        );
    });

    // Until we can get the single canonical breadcrumb path to a product we
    // will just return the first category id of the potential leaf categories.
    const leafCategory = categories.find(
        category => !breadcrumbSet.has(category.id)
    );

    // If we couldn't find a leaf category then just use the first category
    // in the list for this product.
    return leafCategory.id || categories[0].id;
};

const getConfigPrice = (product, optionCodes, optionSelections) => {
    let value;

    const isConfigurable = isProductConfigurable(product);

    const optionsSelected = product.options &&
        Array.from(optionSelections.values()).filter(value => !!value).length >
        0;

    if (!isConfigurable || !optionsSelected) {
        value = product.price.regularPrice.amount;
    } else {
        const item = Array.from(optionSelections.values()).filter(value => typeof (value) === 'number')
        value = Number(item[0])? {
            ...product.price.regularPrice.amount,
            value: product.price.regularPrice.amount.value + item[0]
            }: product.price.regularPrice.amount
    }

    return value;
};

const SUPPORTED_PRODUCT_TYPES = ['SimpleProduct', 'ConfigurableProduct', 'DownloadableProduct'];

/**
 * @param {GraphQLQuery} props.addDownloadableProductToCartMutation - downloadable product mutation
 * @param {GraphQLQuery} props.addConfigurableProductToCartMutation - configurable product mutation
 * @param {GraphQLQuery} props.addSimpleProductToCartMutation - configurable product mutation
 * @param {Object} props.product - the product, see RootComponents/Product
 *
 * @returns {{
 *  breadcrumbCategoryId: string|undefined,
 *  errorMessage: string|undefined,
 *  handleAddToCart: func,
 *  handleSelectionChange: func,
 *  handleSetQuantity: func,
 *  isAddToCartDisabled: boolean,
 *  mediaGalleryEntries: array,
 *  productDetails: object,
 *  quantity: number
 * }}
 */
export const useProductFullDetail = props => {
    const {
        addDownloadableProductToCartMutation,
        addConfigurableProductToCartMutation,
        addSimpleProductToCartMutation,
        product
    } = props;

    const productType = product.__typename;

    const isSupportedProductType = SUPPORTED_PRODUCT_TYPES.includes(
        productType
    );

    const [{ cartId }] = useCartContext();

    const [
        addDownloadableProductToCart,
        { error: errorAddingDownloadableProduct, loading: isAddDownloadableLoading }
    ] = useMutation(addDownloadableProductToCartMutation);

    const [
        addConfigurableProductToCart,
        {
            error: errorAddingConfigurableProduct,
            loading: isAddConfigurableLoading
        }
    ] = useMutation(addConfigurableProductToCartMutation);

    const [
        addSimpleProductToCart,
        { error: errorAddingSimpleProduct, loading: isAddSimpleLoading }
    ] = useMutation(addSimpleProductToCartMutation);

    const [quantity, setQuantity] = useState(INITIAL_QUANTITY);

    const breadcrumbCategoryId = useMemo(
        () => getBreadcrumbCategoryId(product.categories),
        [product.categories]
    );

    const derivedOptionSelections = product.options && useMemo(
        () => deriveOptionSelectionsFromProduct(product),
        [product]
    );

    const [optionSelections, setOptionSelections] = useState(
        derivedOptionSelections
    );

    const derivedOptionCodes = product.options && useMemo(
        () => deriveOptionCodesFromProduct(product),
        [product]
    );
    const [optionCodes] = useState(derivedOptionCodes);

    const isMissingOptions = product.options && useMemo(
        () => getIsMissingOptions(product, optionSelections),
        [product, optionSelections]
    );
    const mediaGalleryEntries = useMemo(
        () => getMediaGalleryEntries(product, optionCodes, optionSelections),
        [product, optionCodes, optionSelections]
    );

    const handleAddToCart = useCallback(async () => {
        const payload = {
            item: { ...product, price: {
                regular_price:{
                ...product.price.regularPrice,
                    amount: productPrice
                }
            }} ,
            productType,
            quantity
        };

        if (isProductConfigurable(product)) {
            appendOptionsToPayload(payload, optionSelections, optionCodes);
        }

        if (isSupportedProductType) {
            const variables = {
                cartId,
                parentSku: payload.parentSku,
                product: payload.item,
                quantity: payload.quantity,
                sku: payload.item.sku
            };
            // Use the proper mutation for the type.
            if (productType === 'SimpleProduct') {
                try {
                    await addSimpleProductToCart({
                        variables
                    });
                } catch {
                    return;
                }
            } else if (productType === 'ConfigurableProduct') {
                try {
                    await addConfigurableProductToCart({
                        variables
                    });
                } catch {
                    return;
                }
            } else if (productType === 'DownloadableProduct') {
                try {
                    let customizableOptions =  payload.options
                    await addDownloadableProductToCart({
                        ...variables,customizableOptions
                    });
                } catch {
                    return;
                }
            }
        } else {
            console.error('Unsupported product type. Cannot add to cart.');
        }
    }, [
        addDownloadableProductToCart,
        addConfigurableProductToCart,
        addSimpleProductToCart,
        cartId,
        isSupportedProductType,
        optionCodes,
        optionSelections,
        product,
        productType,
        quantity
    ]);

    const handleSelectionChange = useCallback(
        (optionId, selection) => {
            // We must create a new Map here so that React knows that the value
            // of optionSelections has changed.
            const nextOptionSelections = new Map([...optionSelections]);
            nextOptionSelections.set(optionId, selection);
            setOptionSelections(nextOptionSelections);
        },
        [optionSelections]
    );

    const handleSetQuantity = useCallback(
        value => {
            setQuantity(value);
        },
        [setQuantity]
    );

    const productPrice = useMemo(
        () => getConfigPrice(product, optionCodes, optionSelections),
        [product, optionCodes, optionSelections]
    );

    // Normalization object for product details we need for rendering.
    const productDetails = {
        description: product.description,
        name: product.name,
        price: productPrice,
        sku: product.sku
    };

    const derivedErrorMessage = useMemo(() => {
        const errorTarget =
            errorAddingSimpleProduct || errorAddingConfigurableProduct;
        if (!errorTarget) return;
        if (errorTarget.graphQLErrors && errorTarget.graphQLErrors.length) {
            // Apollo prepends "GraphQL Error:" onto the message,
            // which we don't want to show to an end user.
            // Build up the error message manually without the prepended text.
            return errorTarget.graphQLErrors
                .map(({ message }) => message)
                .join(', ');
        }
        return errorTarget.message;
    }, [errorAddingConfigurableProduct, errorAddingSimpleProduct]);

    return {
        breadcrumbCategoryId,
        errorMessage: derivedErrorMessage,
        handleAddToCart,
        handleSelectionChange,
        handleSetQuantity,
        isAddToCartDisabled:
            !isSupportedProductType ||
            isMissingOptions ||
            isAddConfigurableLoading ||
            isAddSimpleLoading,
        mediaGalleryEntries,
        productDetails,
        quantity
    };
};
