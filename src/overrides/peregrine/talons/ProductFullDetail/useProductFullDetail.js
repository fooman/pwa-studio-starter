import { useCallback, useState, useMemo } from 'react';
import { useMutation } from '@apollo/client';
import { useCartContext } from '@magento/peregrine/lib/context/cart';

import { appendOptionsToPayload } from '@magento/peregrine/lib/util/appendOptionsToPayload';
import { findMatchingVariant } from '@magento/peregrine/lib/util/findMatchingProductVariant';
import { isProductConfigurable } from '@magento/peregrine/lib/util/isProductConfigurable';
import { deriveErrorMessage } from '@magento/peregrine/lib/util/deriveErrorMessage';
import {fal} from "@fortawesome/pro-light-svg-icons";

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

            initialOptionSelections.set(option_id, '0');
        }
    }
    else {
        for (const {attribute_id} of product.configurable_options) {

            initialOptionSelections.set(attribute_id, '0');
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
        let customizableMultipleOptions = product.options.filter(singleObj => singleObj.__typename === 'CustomizableMultipleOption')[0];
        if (customizableMultipleOptions && Object.keys(customizableMultipleOptions).length) {
            return product.price.regularPrice.amount;
        }
        let customizableOptions = product.options.filter(singleObj => singleObj.__typename === 'CustomizableRadioOption')[0];
        let customizableRadioValue = customizableOptions.radioValue;

        let item = [];
        for( let [k, v] of optionSelections) {
            if (k === customizableOptions.option_id) {
                item.push(v);
            }
        }

        value = Number(item[0])? {

            ...product.price.regularPrice.amount,
            // value: product.price.regularPrice.amount.value + item[0]
            value: product.price.regularPrice.amount.value + customizableRadioValue.filter(singleRadioObj => singleRadioObj.option_type_id.toString() === item[0])[0].price
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

    let initialState = {};
    const [fieldErrorObj, setFieldErrorObj] = useState(initialState);

    const [tabIndex, setTabIndex] = useState(0);

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

    const isRequiredFieldEntered = ( optionSelections , product) => {
        let errorObj = {...fieldErrorObj};
        let requiredField =  product.options && product.options.filter(optionObj => {
            return optionObj.required
        });
        requiredField && requiredField.forEach(fieldObj => {
            for( let [ k, v] of optionSelections) {
                if (k === fieldObj.option_id) {
                    if (fieldObj.title === 'URL of main store') {
                        let isValid = urlValidation( k, v );
                        !isValid ? errorObj[k] = 'Please enter a valid URL. For example "example.com" or "www.example.com".' : delete errorObj[k];
                    }
                    else {
                        v === '0' ? errorObj[k] = 'This field is required!' : delete errorObj[k];
                    }
                }
            }
        });
        setFieldErrorObj(errorObj);
        return !!Object.keys(errorObj).length;
    }

    const urlValidation = ( optionId, selection ) => {
        const re =  new RegExp('^(https?:\\/\\/)?'+
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+
            '((\\d{1,3}\\.){3}\\d{1,3}))'+
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
            '(\\?[;&a-z\\d%_.~+=-]*)?'+
            '(\\#[-a-z\\d_]*)?$','i');
        return re.test(selection);
    }

    const setValidationError = (optionId, selection ) => {
        let errorObj = {...fieldErrorObj};
        let optionTitle = product.options[product.options.findIndex(singleObj => singleObj.option_id === optionId)].title;
        if (optionTitle === 'URL of main store') {
            let isValid = urlValidation( optionId, selection);
            !isValid ? errorObj[optionId] = 'Please enter a valid URL. For example "example.com" or "www.example.com".' : delete errorObj[optionId];
            setFieldErrorObj(errorObj);
        }
    }
    const mediaGalleryEntries = useMemo(
        () => getMediaGalleryEntries(product, optionCodes, optionSelections),
        [product, optionCodes, optionSelections]
    );

    const onReviewsClick = () => {
        setTabIndex(1);
        window.scrollTo({
            left: 0,
            top: 715,
            behavior: 'smooth'
        });
    }

    const setTabIndexFun = (selectedTab) => {
        setTabIndex(selectedTab);
    }

    const handleAddToCart = useCallback(async () => {

        let isError =  isRequiredFieldEntered(optionSelections, product);

        if (isError) return false;

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
                sku: payload.item.sku,
                customizableOptions: payload.options
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
                } catch{
                    return;
                }
            } else if (productType === 'DownloadableProduct') {
                try {

                    await addDownloadableProductToCart({
                        variables
                    });

                } catch{
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
            selection = selection === undefined ? '0' : selection;
            // We must create a new Map here so that React knows that the value
            // of optionSelections has changed.
            const nextOptionSelections = new Map([...optionSelections]);
            nextOptionSelections.set(optionId, selection);
            setOptionSelections(nextOptionSelections);
            setValidationError(optionId, selection);
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

    const derivedErrorMessage = useMemo(
        () =>
            deriveErrorMessage([
                errorAddingSimpleProduct,
                errorAddingConfigurableProduct
            ]),
        [errorAddingConfigurableProduct, errorAddingSimpleProduct]
    );

    return {
        breadcrumbCategoryId,
        errorMessage: derivedErrorMessage,
        handleAddToCart,
        handleSelectionChange,
        handleSetQuantity,
        fieldErrorObj : fieldErrorObj,
        isAddToCartDisabled:
            !isSupportedProductType ||
            isMissingOptions ||
            isAddConfigurableLoading ||
            isAddSimpleLoading,
        mediaGalleryEntries,
        productDetails,
        quantity,
        onReviewsClick,
        tabIndex,
        setTabIndexFun
    };
};
