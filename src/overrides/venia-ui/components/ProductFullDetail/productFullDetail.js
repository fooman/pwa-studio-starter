import React, { Fragment, Suspense } from 'react';
import { arrayOf, bool, number, shape, string } from 'prop-types';
import { Form } from 'informed';
import { Helmet } from 'react-helmet-async';
import  { StarRatingComponent } from '../../../../components/StarRatingComponent/starRatingComponent';
import { resourceUrl } from '@magento/venia-drivers';

import { Price } from '@magento/peregrine';
import { useProductFullDetail } from '@magento/peregrine/lib/talons/ProductFullDetail/useProductFullDetail';
import { isProductConfigurable } from '@magento/peregrine/lib/util/isProductConfigurable';

import { mergeClasses } from '@magento/venia-ui/lib/classify';
import Breadcrumbs from '@magento/venia-ui/lib/components/Breadcrumbs';
import Button from '@magento/venia-ui/lib/components/Button';
import Carousel from '@magento/venia-ui/lib/components/ProductImageCarousel';
import { fullPageLoadingIndicator } from '@magento/venia-ui/lib/components/LoadingIndicator';
import Quantity from '@magento/venia-ui/lib/components/ProductQuantity';
import ProductStaticArea from './staticComponent/productDetailStaticArea';
import AnyQuestion from './staticComponent/anyQuestion';
import RichText from '@magento/venia-ui/lib/components/RichText';
import CREATE_CART_MUTATION from '@magento/venia-ui/lib/queries/createCart.graphql';
import GET_CART_DETAILS_QUERY from '@magento/venia-ui/lib/queries/getCartDetails.graphql';
import defaultClasses from '@magento/venia-ui/lib/components/ProductFullDetail/productFullDetail.css';
import {
    ADD_CONFIGURABLE_MUTATION,
    ADD_SIMPLE_MUTATION
} from '@magento/venia-ui/lib/components/ProductFullDetail/productFullDetail.gql';
import {
    ADD_DOWNLOADABLE_MUTATION
} from './downloadableProduct.gql';

const Options = React.lazy(() => import('@magento/venia-ui/lib/components/ProductOptions'));
const PRODUCT_URL_SUFFIX = '.html';

const ProductFullDetail = props => {
    const { product } = props;

    const demoUrl = "http://speedster.demo.fooman.co.nz/admin";

    const talonProps = useProductFullDetail({
        addDownloadableProductToCartMutation: ADD_DOWNLOADABLE_MUTATION,
        addConfigurableProductToCartMutation: ADD_CONFIGURABLE_MUTATION,
        addSimpleProductToCartMutation: ADD_SIMPLE_MUTATION,
        createCartMutation: CREATE_CART_MUTATION,
        getCartDetailsQuery: GET_CART_DETAILS_QUERY,
        product
    });

    const {
        breadcrumbCategoryId,
        handleAddToCart,
        handleSelectionChange,
        handleSetQuantity,
        isAddToCartDisabled,
        mediaGalleryEntries,
        productDetails,
        quantity
    } = talonProps;

    const classes = mergeClasses(defaultClasses, props.classes);

    const options = isProductConfigurable(product) ? (
        <Suspense fallback={fullPageLoadingIndicator}>
            <Options
                onSelectionChange={handleSelectionChange}
                options={product.configurable_options}
            />
        </Suspense>
    ) : null;

    const breadcrumbs = breadcrumbCategoryId ? (
        <Breadcrumbs
            categoryId={breadcrumbCategoryId}
            currentProduct={productDetails.name}
        />
    ) : null;

    //TODO add reviews
    //TODO image from media gallery or small thumbnail
    const productUrl = "https://fooman.com" + resourceUrl(`/${product.url_key}${PRODUCT_URL_SUFFIX}`);
    const structuredData = JSON.stringify({
        "@context": "https://schema.org",
        "@type":"Product",
        "name":productDetails.name,
        "description":product.short_description.html.replace(/<\s*\/?br\s*[\/]?>/gi, ''),
        "offers":{
            "@type":"Offer",
            "availability": "https://schema.org/InStock",
            "price": productDetails.price.value,
            "priceCurrency": productDetails.price.currency,
            "seller":{
                "@type":"Organization",
                "name":"Fooman"
            }
        },
        "brand": {
            "@type": "Brand",
            "name": "Fooman"
        },
        "url": productUrl,
        "sku": productDetails.sku,
        "aggregateRating": {
            "@type":"AggregateRating",
            "ratingValue": product.review_summary.rating_summary,
            "bestRating":"100",
            "reviewCount": product.review_summary.review_count
        }
    });
    return (
        <Fragment>
            <Helmet>
                <script key="structured-data" type="application/ld+json">{structuredData}</script>
                <link rel="canonical" href={productUrl}/>
            </Helmet>
            {breadcrumbs}
            <StarRatingComponent
                value={Math.round(product.review_summary.rating_summary/20)}
            />
            <Form className={classes.root}>
                <section className={classes.title}>
                    <h1 className={classes.productName}>
                        {productDetails.name}
                    </h1>
                    <p className={classes.productPrice}>
                        <Price
                            currencyCode={productDetails.price.currency}
                            value={productDetails.price.value}
                        />
                    </p>
                </section>
                <section className={classes.imageCarousel}>
                    <Carousel images={mediaGalleryEntries} />
                </section>
                <section className={classes.options}>{options}</section>
                <section className={classes.quantity}>
                    <h2 className={classes.quantityTitle}>Quantity</h2>
                    <Quantity
                        initialValue={quantity}
                        onValueChange={handleSetQuantity}
                    />
                </section>
                <section className={classes.cartActions}>
                    <Button
                        priority="high"
                        onClick={handleAddToCart}
                        disabled={isAddToCartDisabled}
                    >
                        Add to Cart
                    </Button>
                </section>
                <section className={classes.description}>
                    <h2 className={classes.descriptionTitle}>
                        Product Description
                    </h2>
                    <RichText content={productDetails.description} />
                </section>
            </Form>
            <ProductStaticArea/>
            <AnyQuestion
                demoUrl = {demoUrl}
            />
        </Fragment>
    );
};

ProductFullDetail.propTypes = {
    classes: shape({
        cartActions: string,
        description: string,
        descriptionTitle: string,
        details: string,
        detailsTitle: string,
        imageCarousel: string,
        options: string,
        productName: string,
        productPrice: string,
        quantity: string,
        quantityTitle: string,
        root: string,
        title: string
    }),
    product: shape({
        __typename: string,
        id: number,
        sku: string.isRequired,
        price: shape({
            regularPrice: shape({
                amount: shape({
                    currency: string.isRequired,
                    value: number.isRequired
                })
            }).isRequired
        }).isRequired,
        media_gallery_entries: arrayOf(
            shape({
                label: string,
                position: number,
                disabled: bool,
                file: string.isRequired
            })
        ),
        description: string
    }).isRequired
};

export default ProductFullDetail;
