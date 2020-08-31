import { useCallback } from 'react';
import {
    useLazyQuery
} from '@apollo/client';

export const useReviewsTab = prop => {

    const { productReviews, urlKey, review_count } = prop;
    const currentPage = 1;
    const [
        getAllProductReviews,
        { data: allReviewData, loading: allReviewLoading }
    ] = useLazyQuery(productReviews, {
        fetchPolicy: 'network-only'
    });
    const allReviewsItem = allReviewData? allReviewData.productReviews.items[0].reviews.items : [];
    const viewAllReviews = useCallback(async () => {
        await getAllProductReviews({
            variables: {
                urlKey,
                currentPage,
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
