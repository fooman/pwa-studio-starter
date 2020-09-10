import React, {Fragment, Suspense, useState} from 'react';
import { arrayOf, bool, number, shape, string } from 'prop-types';
import { Form } from 'informed';
import { Helmet } from 'react-helmet-async';
import  { StarRatingComponent } from '../../../../components/StarRatingComponent/starRatingComponent';
import { resourceUrl } from '@magento/venia-drivers';

import { Price } from '@magento/peregrine';
import { useProductFullDetail } from '../../../peregrine/talons/ProductFullDetail/useProductFullDetail'

import { mergeClasses } from '@magento/venia-ui/lib/classify';
import Breadcrumbs from '@magento/venia-ui/lib/components/Breadcrumbs';
import Button from '@magento/venia-ui/lib/components/Button';
import FormError from '@magento/venia-ui/lib/components/FormError';
import { fullPageLoadingIndicator } from '@magento/venia-ui/lib/components/LoadingIndicator';
import LoadingIndicator from '@magento/venia-ui/lib/components/LoadingIndicator';
import Quantity from '@magento/venia-ui/lib/components/ProductQuantity';
import ProductStaticArea from '../../../../components/ProductFullDetail/Static/productDetailStaticArea';
import AnyQuestion from '../../../../components/ProductFullDetail/Static/anyQuestion';
import ProductGallery from '../../../../components/ProductGallery/ProductGallery';
import CustomRichContent from '../../../../components/CustomRichContent/CustomRichContent';
import ReviewsTab from '../../../../components/ProductFullDetail/Tabs/ReviewsTab/reviewsTab';
import AddReview from '../../../../components/ProductFullDetail/Tabs/ReviewsTab/addReviewComponent';
import { HideAt, ShowAt } from 'react-with-breakpoints';

import defaultClasses from './productFullDetail.css';

import {
    ADD_CONFIGURABLE_MUTATION,
    ADD_SIMPLE_MUTATION
} from '@magento/venia-ui/lib/components/ProductFullDetail/productFullDetail.gql';
import {
    ADD_DOWNLOADABLE_MUTATION
} from '../../../../components/ProductFullDetail/downloadableProduct.gql';
import { isProductConfigurable, productOptionsType } from '../../../peregrine/util/isProductConfigurable';
import Options  from '@magento/venia-ui/lib/components/ProductOptions';
const PRODUCT_URL_SUFFIX = '.html';

// Correlate a GQL error message to a field. GQL could return a longer error
// string but it may contain contextual info such as product id. We can use
// parts of the string to check for which field to apply the error.
const ERROR_MESSAGE_TO_FIELD_MAPPING = {
    'The requested qty is not available': 'quantity',
    'Product that you are trying to add is not available.': 'quantity',
    "The product that was requested doesn't exist.": 'quantity'
};

// Field level error messages for rendering.
const ERROR_FIELD_TO_MESSAGE_MAPPING = {
    quantity: 'The requested quantity is not available.'
};

/*Lasy Loading Component*/
const ChangeLog = React.lazy(() => import('../../../../components/ProductFullDetail/Tabs/ChangeLog/changeLog'));

const ProductFullDetail = props => {
    const { product } = props;

    const demoUrl = "http://speedster.demo.fooman.co.nz/admin";
    const changeLogUrl = window.location.protocol + "//" +window.location.host + "/releases/Fooman_PdfCustomiser/feed.json";

    const talonProps = useProductFullDetail({
        addDownloadableProductToCartMutation: ADD_DOWNLOADABLE_MUTATION,
        addConfigurableProductToCartMutation: ADD_CONFIGURABLE_MUTATION,
        addSimpleProductToCartMutation: ADD_SIMPLE_MUTATION,
        product
    });

    const {
        breadcrumbCategoryId,
        errorMessage,
        handleAddToCart,
        handleSelectionChange,
        handleSetQuantity,
        isAddToCartDisabled,
        mediaGalleryEntries,
        productDetails,
        quantity,
        fieldErrorObj,
        onReviewsClick,
        tabIndex,
        setTabIndexFun
    } = talonProps;

    const classes = mergeClasses(defaultClasses, props.classes);
    const productOptions = productOptionsType(product);
    const options = product.options && isProductConfigurable(product) ? (
        <Suspense fallback={fullPageLoadingIndicator}>
            <Options
                onSelectionChange={handleSelectionChange}
                options={productOptions}
                price={product.price}
                fieldErrorObj = {fieldErrorObj}
            />
        </Suspense>
    ) : null;

    const breadcrumbs = breadcrumbCategoryId ? (
        <Breadcrumbs
            categoryId={breadcrumbCategoryId}
            currentProduct={productDetails.name}
        />
    ) : null;

    const changeLog = changeLogUrl? (
        <ChangeLog changeLogUrl = {changeLogUrl} />
    ) : null;

    //TODO image from media gallery or small thumbnail
    const mappedReviews = (product && product.reviews && product.reviews.items) ?
        product.reviews.items.map((singleReview) => {

            return {
                "@type": "Review",
                "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": Math.round(singleReview.average_rating / 20)
                },
                "author": {
                    "@type": "Person",
                    "name": singleReview.nickname
                },
                "reviewBody": singleReview.text,
                "abstract": singleReview.summary
            }
        }) : null;

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
            "ratingValue": product.rating_summary,
            "bestRating":"100",
            "reviewCount": product.review_count
        },
        "review": mappedReviews
    });

    // Fill a map with field/section -> error.
    const errors = new Map();
    if (errorMessage) {
        Object.keys(ERROR_MESSAGE_TO_FIELD_MAPPING).forEach(key => {
            if (errorMessage.includes(key)) {
                const target = ERROR_MESSAGE_TO_FIELD_MAPPING[key];
                const message = ERROR_FIELD_TO_MESSAGE_MAPPING[target];
                errors.set(target, message);
            }
        });

        // Handle cases where a user token is invalid or expired. Preferably
        // this would be handled elsewhere with an error code and not a string.
        if (errorMessage.includes('The current user cannot')) {
            errors.set('form', [
                new Error(
                    'There was a problem with your cart. Please sign in again and try adding the item once more.'
                )
            ]);
        }

        // Handle cases where a cart wasn't created properly.
        if (
            errorMessage.includes('Variable "$cartId" got invalid value null')
        ) {
            errors.set('form', [
                new Error(
                    'There was a problem with your cart. Please refresh the page and try adding the item once more.'
                )
            ]);
        }

        // An unknown error should still present a readable message.
        if (!errors.size) {
            errors.set('form', [
                new Error(
                    'Could not add item to cart. Please check required options and try again.'
                )
            ]);
        }
    }

    return (
        <Fragment>
        <div className={classes.productContainer}>
            <Helmet>
                <script key="structured-data" type="application/ld+json">{structuredData}</script>
                <link rel="canonical" href={productUrl}/>
            </Helmet>
            {breadcrumbs}
            <Form className={classes.root} data-testid="productFullDetail-addtocart-form">
                <div className={classes.formMainDiv}>
                    <section className={classes.imageCarousel}>
                        <div className={classes.productTitle}>
                            <h1>
                                {productDetails.name}
                            </h1>
                        </div>
                        <ProductGallery images={mediaGalleryEntries} />
                    </section>
                    <div className={classes.reviewDesc}>
                        {product.review_count? (
                            <div className={classes.reviewDiv}>
                                <StarRatingComponent
                                    size = {'1x'}
                                    value={Math.round(product.rating_summary/20)}
                                />
                                <div className={classes.reviewCounts}>
                                    <a onClick={onReviewsClick} href={'#'}>
                                        {`${product.review_count} Reviews`}
                                    </a>
                                </div>
                            </div>
                            ) :
                                null
                        }
                        <div className={classes.contentDes}>
                            <h2 className={classes.descriptionTitle}>
                                Product Description
                            </h2>
                            <span>
                               <CustomRichContent html={product.short_description.html}/>
                            </span>
                        </div>
                        <div>
                            <div className={`${classes.childButton}`}>
                                <Button
                                    priority="high"
                                >
                                    {"Try the Demo"}
                                </Button>
                            </div>
                            <div className={classes.childButton}>
                                <Button
                                    priority="low"
                                >
                                    {"User Manual"}
                                </Button>
                            </div>
                        </div>
                        <section className={classes.options}>
                            <p className={classes.productPrice}>
                                <Price
                                    currencyCode={productDetails.price.currency}
                                    value={productDetails.price.value}
                                />
                            </p>
                            {options}
                        </section>
                        <div className={classes.quantity}>
                            <h2 className={classes.quantityTitle}>Quantity</h2>
                            <Quantity
                                initialValue={quantity}
                                onValueChange={handleSetQuantity}
                                message={errors.get('quantity')}
                            />
                        </div>
                        <FormError
                            classes={{
                                root: classes.formErrors
                            }}
                            errors={errors.get('form') || []}
                        />
                        <div className={classes.cartActions}>
                            <Button
                                priority="high"
                                onClick={handleAddToCart}
                                disabled={isAddToCartDisabled}
                                data-testid="productFullDetail-addtocart-button"
                            >
                                Add to Cart
                            </Button>
                        </div>
                    </div>
                </div>
            </Form>


                <div>
                    <section className={classes.description}>
                        <a id="Features"><h2>Product Features</h2></a>
                        <CustomRichContent html={productDetails.description}/>
                    </section>
                </div>
                <div className={classes.reviews}>
                    <section className={classes.reviewSection}>
                        <a id="Reviews"><h2>Reviews</h2></a>
                        <div>
                            <ReviewsTab
                                reviews={product.reviews}
                                review_count={product.review_count}
                                url_key={product.url_key}
                            />
                        </div>
                        <div>
                            <AddReview productSku={productDetails.sku}/>
                        </div>
                    </section>
                    <section className={classes.changelog}>
                        <a id="Changelog"><h2>Changelog</h2></a>
                        <Suspense fallback={<LoadingIndicator/>}>
                            {changeLog}
                        </Suspense>
                    </section>
                </div>

            <ProductStaticArea/>
        </div>
            <AnyQuestion
                demoUrl = {demoUrl}
            />
        </Fragment>
    );
};

ProductFullDetail.propTypes = {
    classes: shape({
        productContainer: string,
        cartActions: string,
        description: string,
        reactTab: string,
        reviews: string,
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
        title: string,
        reviewDiv: string,
        reviewCounts: string,
        buttonDiv: string,
        childButton: string,
        productTitle: string,
        reviewDesc: string,
        contentDes: string,
        hr1:string,
        formMainDiv: string,
        reviewSection: string,
        changelog: string
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
