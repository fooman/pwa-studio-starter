import React from "react";
import defaultClasses from './review.css'
import  { StarRatingComponent } from '../../../../components/StarRatingComponent/starRatingComponent';
import {mergeClasses} from "@magento/venia-ui/lib/classify";
import {shape, string} from "prop-types";

const Review = props => {

    const { review} = props;
    const { nickname, average_rating, summary, text } = review;
    const classes = mergeClasses(defaultClasses);

    return (
        <div className={classes.root}>
            <StarRatingComponent
                className ={classes.starRating}
                size = {'1x'}
                value={Math.round( average_rating/20 )}
            />
            <div className={classes.reviewSummary}>
                {summary}
            </div>
            <div className={classes.reviewText}>
                {text}
            </div>
            <div className={classes.reviewBy}>{`Review by ${nickname}`}</div>
        </div>
    );
}

Review.propTypes = {
    classes: shape({
        reviewBy: string,
        starRating: string,
        reviewSummary: string,
        reviewText: string
    })
};

export default Review;
