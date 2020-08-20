import {useCallback, useState} from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';


export const useAddReviewComponent = prop => {

    const { productReviewRatingsMetadataQuery, addProductRatingMutation } = prop;

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
        ratingValue !== value ? setRatingValue(value) : null;
    }, []);

    const handleSubmit = useCallback(
        async formValues => {
            try {
                await createProductReview({
                    variables: {
                        sku: "FM0024_OMAN",
                        summary: "works well",
                        text: "awesome pdfs for our customers",
                        nickname: "Customer Name",
                        ratings: [{
                                id: "MQ==",
                                value_id: "NQ=="
                        }]
                    }
                });
            } catch(e) {
                return;
            }
            closeDialog();
        },
        []);

    const starRating = ratingValue;
    return {
        handleAddReviewClick,
        isOpen,
        closeDialog,
        isLoadingReviewRating,
        ReviewRatingData,
        onStarClickHandler,
        starRating,
        handleSubmit
    };

}
