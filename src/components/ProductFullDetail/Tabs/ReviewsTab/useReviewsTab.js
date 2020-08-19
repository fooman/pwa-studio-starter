import {useCallback, useEffect, useState} from 'react';
import {
    useLazyQuery
} from '@apollo/react-hooks';;

export const useReviewsTab = prop => {

    const { productReviews, urlKey, review_count } = prop;

    const [
        getAllProductReviews,
        { data: allReviewData, loading: allReviewLoading, error: allReviewError }
    ] = useLazyQuery(productReviews, {
        fetchPolicy: 'network-only'
    });
    const allReviewsItem = allReviewData? allReviewData.productReviews.items[0].reviews.items : [];
    const viewAllReviews = useCallback(async () => {
        await getAllProductReviews({
            variables: {
                urlKey,
                currentPage: 1,
                pageSize: review_count
            }
        });
    },[]);

    return {
        allReviewsItem,
        allReviewLoading,
        viewAllReviews
    };

}
