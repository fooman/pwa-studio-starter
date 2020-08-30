import React from "react";
import defaultClasses from './review.css'
import  { StarRatingComponent } from '../../../../components/StarRatingComponent/starRatingComponent';
import {mergeClasses} from "@magento/venia-ui/lib/classify";
import {shape, string} from "prop-types";

const Review = props => {

    const classes = mergeClasses(defaultClasses);
    const { review} = props;
    const { nickname, average_rating, summary, text } = review;

    let averageRate = Math.round( average_rating/20 );

    return (
        <div className={averageRate ? classes.rootWithRating : classes.rootWithoutRating}>
            { averageRate ? (
                <StarRatingComponent
                    className ={classes.starRating}
                    size = {'1x'}
                    value={averageRate}
                />
            ) : null }
            { averageRate ? (
                <div className={classes.reviewSummary}>
                    {summary}
                </div>
            ) : null }
            <div className={classes.reviewText}>
                {text}
            </div>
            <div className={nickname === 'FOOMAN' ? classes.reviewByFooman : classes.reviewBy}>
                {nickname === 'FOOMAN' ? `Response from Fooman` : `Review by ${nickname}`}
            </div>
        </div>
    );
}

Review.propTypes = {
    classes: shape({
        rootWithRating: string,
        rootWithoutRating: string,
        reviewBy: string,
        reviewByFooman: string,
        starRating: string,
        reviewSummary: string,
        reviewText: string
    })
};

export default Review;
