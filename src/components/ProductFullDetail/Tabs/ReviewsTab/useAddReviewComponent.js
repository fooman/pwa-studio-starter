import {useCallback, useState} from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {useUserContext} from "@magento/peregrine/lib/context/user";


export const useAddReviewComponent = prop => {

    const { productReviewRatingsMetadataQuery, addProductRatingMutation, productSku } = prop;

    const [{ isSignedIn }] = useUserContext();

    const [ isOpen, setIsOpen] = useState(false);

    const [ ratingValue, setRatingValue ] = useState(0);

    const {
        loading: isLoadingReviewRating,
        data: ReviewRatingData
    } = useQuery( productReviewRatingsMetadataQuery );

    const [
        createProductReview,
        {
            data: productReviewData,
            loading: productReviewLoading
        }
    ] = useMutation( addProductRatingMutation );

    const handleAddReviewClick = useCallback(() => {
        setIsOpen(true);
    }, []);

    const closeDialog = useCallback(() => {
        setIsOpen(false);
    }, []);

    const onStarClickHandler = useCallback((value) => {
        ratingValue !== value ? setRatingValue(value) : setRatingValue(0);
    }, [ratingValue]);

    const handleSubmit = useCallback(
        async formValues => {
            try {
                const { productReviewRatingsMetadata: {items} } = ReviewRatingData;
                const { id , values } = items[0];
                const selectedRatingResult = values.filter(singleValueObj => singleValueObj.value === (ratingValue).toString());
                const { nickname, text, summary } = formValues;

                await createProductReview({
                    variables: {
                        sku: productSku,
                        summary: summary,
                        text: text,
                        nickname: nickname,
                        ratings: [{
                                id: id,
                                value_id: selectedRatingResult[0].value_id
                        }]
                    }
                });
            } catch(e) {
                return;
            }
            closeDialog();
        },
        [ratingValue]);

    /*Remove rating value on close dialog*/
    !isOpen? ratingValue? setRatingValue(0) : null : null;

    return {
        handleAddReviewClick,
        isOpen,
        closeDialog,
        isLoadingReviewRating,
        ReviewRatingData,
        onStarClickHandler,
        ratingValue,
        handleSubmit,
        isSignedIn
    };

}
