import React from "react";
import defaultClasses from './reviewsTab.css'
import  { StarRatingComponent } from '../../../../components/StarRatingComponent/starRatingComponent';
import {mergeClasses} from "@magento/venia-ui/lib/classify";
import {shape, string} from "prop-types";

const ReviewsTab = props => {

    const { reviews } = props;

    const classes = mergeClasses( defaultClasses );

    const mapReviews = () => {
        if (reviews && reviews.items) {
            return reviews.items.map(( singleItems , index ) => {
                const { nickname, average_rating, summary, text } = singleItems;
                return (
                    <div key={index}>
                        <div className={classes.reviewBy}>{`Review by ${nickname}`}</div>
                        <div className={classes.wrapRateSummary}>
                            <div className={classes.starRating}>
                                <StarRatingComponent
                                    size = {'1x'}
                                    value={Math.round( average_rating/20 )}
                                />
                            </div>
                            <strong className={classes.reviewSummary}>
                                {summary}
                            </strong>
                            <div className={classes.reviewText}>
                                {text}
                            </div>
                        </div>
                    </div>
                );
            });
        }
        return (<div>{'There is no any reviews'}</div>)
    }

    return (
        <div>
            <strong className={classes.itemsCount}>
                {reviews.items.length ? (<div>{`${reviews.items.length} Item(s)`}</div>) : null}
            </strong>
            <div>
                {mapReviews()}
            </div>
            <strong className={classes.itemsCount}>
                {reviews.items.length ? (<div>{`${reviews.items.length} Item(s)`}</div>) : null}
            </strong>
        </div>
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
