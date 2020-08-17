import React, {Fragment} from "react";
import defaultClasses from './reviewsTab.css'
import Review from './review';
import {mergeClasses} from "@magento/venia-ui/lib/classify";
import {shape, string} from "prop-types";

const ReviewsTab = props => {

    const { reviews } = props;

    const classes = mergeClasses(defaultClasses);

    const mapReviews = () => {
        if (reviews && reviews.items) {
            return reviews.items.map(( singleItems , index ) => {
                return (
                    <Review review={singleItems} key={index} />
                );
            });
        }
        return (<div>{'There are no reviews yet'}</div>)
    }

    return (
        <Fragment>
            {mapReviews()}
        </Fragment>
    );
}

ReviewsTab.propTypes = {
    classes: shape({
        reviewBy: string,
        starRating: string,
        reviewSummary: string,
        reviewText: string,
        itemsCount: string,
        wrapRateSummary: string
    })
};

export default ReviewsTab;
