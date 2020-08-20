import React, {useCallback, useMemo} from "react";
import defaultClasses from './addReviewComponent.css'
import {mergeClasses} from "@magento/venia-ui/lib/classify";
import {shape, string} from "prop-types";
import Button from '@magento/venia-ui/lib/components/Button';
import Dialog from '@magento/venia-ui/lib/components/Dialog';
import { useAddReviewComponent } from './useAddReviewComponent';
import Field from "@magento/venia-ui/lib/components/Field";
import TextInput from "@magento/venia-ui/lib/components/TextInput";
import {isRequired} from "@magento/venia-ui/lib/util/formValidators";
import TextArea from "@magento/venia-ui/lib/components/TextArea";
import {StarRatingComponent} from "../../../StarRatingComponent/starRatingComponent";
import productReviewRatingsMetadataQuery from './productReviewRatingsMetadata.graphql';
import addProductRatingMutation from './addProductReviewMutation.graphql';
import LoadingIndicator from "@magento/venia-ui/lib/components/LoadingIndicator";

const AddReview = () => {

    const talonProps = useAddReviewComponent({
        productReviewRatingsMetadataQuery,
        addProductRatingMutation
    });

    const {
            handleAddReviewClick,
            isOpen,
            closeDialog,
            isLoadingReviewRating,
            ReviewRatingData,
            onStarClickHandler,
            starRating,
            handleSubmit
    } = talonProps;

    const classes = mergeClasses(defaultClasses);

    if (isLoadingReviewRating) {
        return <LoadingIndicator/>
    }

    const starRatingComponent = useMemo(() => {

        return (
            <StarRatingComponent
                className ={classes.starRating}
                size = {'1x'}
                editing = {true}
                value = {Number(starRating)}
                onStarClick={onStarClickHandler}
            />
        )
    }, [starRating, onStarClickHandler])

    const dialogComponent = (
        <Dialog
            isOpen={isOpen}
            title={'Add Review'}
            onConfirm={handleSubmit}
            onCancel={closeDialog}
        >
                <div className={classes.name}>
                    <Field id="name" label="Name">
                        <TextInput field="name" validate={isRequired} />
                    </Field>
                </div>

                <div className={classes.summary}>
                    <Field id="summary" label="Summary">
                        <TextArea field="summary" validate={isRequired} />
                    </Field>
                </div>

                <div>
                    <Field id="review" label="Review">
                        {starRatingComponent}
                        <TextInput type="hidden" field="rating" validation={isRequired} />
                    </Field>
                </div>
        </Dialog>
    );

    return (
        <div className={classes.addReviewRoot}>
            <div>
                <Button
                    priority="low"
                    onClick={handleAddReviewClick}
                >
                {"Add your Review"}
                </Button>
            </div>
            <div>
                {dialogComponent}
            </div>
        </div>
    );
}

AddReview.propTypes = {
    classes: shape({
        addReviewRoot: string
    })
}

export default AddReview;
