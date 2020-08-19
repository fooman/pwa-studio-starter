import React, {Fragment, useEffect, useState, useCallback} from "react";
import Button from "@magento/venia-ui/lib/components/Button";
import {mergeClasses} from "@magento/venia-ui/lib/classify";
import {shape, string} from "prop-types";
import {useReviewsTab} from './useReviewsTab';
import { productReviews } from './getAllProductReviews.graphql'
import defaultClasses from './reviewsTab.css'
import Review from './review';
import LoadingIndicator from "@magento/venia-ui/lib/components/LoadingIndicator";

const ReviewsTab = props => {

    const { reviews, review_count, url_key } = props;
    const [reviewsItem, setReviewsItem] = useState([]);
    const [ currentPage, setCurrentPage] = useState(1);
    const reviewLimit = 20;
    const talonProps = useReviewsTab({
        productReviews,
        urlKey: url_key,
        review_count
    });

    const { allReviewsItem, allReviewLoading, viewAllReviews } = talonProps;

    const classes = mergeClasses(defaultClasses);

    const viewNextReviews = () => {
        viewAllReviews();
    }

    useEffect(() => {

        if (reviews && reviews.items && reviews.items.length) {

            setReviewsItem(reviews.items);
        }
    }, [reviews]);

    if(allReviewLoading) {
        return <LoadingIndicator/>
    }

    if(allReviewsItem.length) {
        if (allReviewsItem.length !== reviewsItem.length) {

            setReviewsItem([...reviewsItem, ...allReviewsItem]);
        }
    }

    const mapReviews = () => {
        if (reviewsItem.length) {

            return reviewsItem.map(( singleItems , index ) => {
                return (
                    <Review review={singleItems} key={index} />
                );
            });
        }
        return (<div>{'There are no reviews yet'}</div>)
    }

    return (
        <Fragment>
            <div>
                {mapReviews()}
            </div>
            <div>
                {review_count > reviewLimit ?
                    (
                        <Button
                            priority="high"
                            onClick={() => viewNextReviews()}
                        >
                            {"Show more"}
                        </Button>
                    )
                : null}

            </div>
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
