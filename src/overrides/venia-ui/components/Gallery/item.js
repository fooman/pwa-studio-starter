import React from 'react';
import { string, number, shape } from 'prop-types';
import { Link, resourceUrl } from '@magento/venia-drivers';
import { Price } from '@magento/peregrine';
import { transparentPlaceholder } from '@magento/peregrine/lib/util/images';
import { UNCONSTRAINED_SIZE_KEY } from '@magento/peregrine/lib/talons/Image/useImage';

import { mergeClasses } from '@magento/venia-ui/lib/classify';
import Image from '@magento/venia-ui/lib/components/Image';
import { StarRatingComponent } from "../../../../components/StarRatingComponent/starRatingComponent";
import defaultClasses from './item.css';

// The placeholder image is 4:5, so we should make sure to size our product
// images appropriately.
const IMAGE_WIDTH = 300;
const IMAGE_HEIGHT = 375;

// Gallery switches from two columns to three at 640px.
const IMAGE_WIDTHS = new Map()
    .set(640, IMAGE_WIDTH)
    .set(UNCONSTRAINED_SIZE_KEY, 840);

// TODO: get productUrlSuffix from graphql when it is ready
const productUrlSuffix = '.html';

const ItemPlaceholder = ({ classes }) => (
    <div className={classes.root_pending}>
        <div className={classes.images_pending}>
            <Image
                alt="Placeholder for gallery item image"
                classes={{
                    image: classes.image_pending,
                    root: classes.imageContainer
                }}
                src={transparentPlaceholder}
            />
        </div>
        <div className={classes.name_pending} />
        <div className={classes.price_pending} />
    </div>
);

const GalleryItem = props => {
    const { item } = props;
    const classes = mergeClasses(defaultClasses, props.classes);

    if (!item) {
        return <ItemPlaceholder classes={classes} />;
    }
    const { name, price, small_image, url_key, review_count, rating_summary, short_description } = item;

    const productLink = resourceUrl(`/${url_key}${productUrlSuffix}`);
    const reviewSummary = review_count > 0 ? (
            <div className={classes.starRating}>
                    <div className={classes.ratReview}>
                        <StarRatingComponent
                            value={Math.round(rating_summary/20)}
                            size={'1x'}
                        />
                    </div>
                    <div className={classes.ratReview}>
                        <span className={classes.reviews}>{`${review_count} Reviews` }</span>
                    </div>
            </div>

            ) :
        <div className = {classes.noReview}></div>
    const productDescription = short_description.html.replace(/<\s*\/?br\s*[\/]?>/gi, '');

    return (
        <div className={classes.root}>
            <Link to={productLink} className={classes.images}>
                <Image
                    alt={name}
                    classes={{
                        image: classes.image,
                        root: classes.imageContainer
                    }}
                    height={IMAGE_HEIGHT}
                    resource={small_image}
                    widths={IMAGE_WIDTHS}
                />
            </Link>
            <div className={classes.productDetail}>
                <div className={classes.nameDiv}>
                    <Link to={productLink} className={classes.name}>
                        <span>{productDescription}</span>
                    </Link>
                </div>
                {reviewSummary}
                <div className={classes.price}>
                    <Price
                        value={price.regularPrice.amount.value}
                        currencyCode={price.regularPrice.amount.currency}
                    />
                </div>
            </div>
        </div>
    );
};

GalleryItem.propTypes = {
    classes: shape({
        image: string,
        imageContainer: string,
        imagePlaceholder: string,
        image_pending: string,
        images: string,
        images_pending: string,
        name: string,
        name_pending: string,
        price: string,
        price_pending: string,
        root: string,
        root_pending: string,
        productDetail: string,
        nameDiv: string,
        pName: string,
        starRating: string,
        noReview: string,
        ratReview: string,
        reviews: string
    }),
    item: shape({
        id: number.isRequired,
        name: string.isRequired,
        small_image: string.isRequired,
        url_key: string.isRequired,
        price: shape({
            regularPrice: shape({
                amount: shape({
                    value: number.isRequired,
                    currency: string.isRequired
                }).isRequired
            }).isRequired
        }).isRequired
    })
};

export default GalleryItem;
