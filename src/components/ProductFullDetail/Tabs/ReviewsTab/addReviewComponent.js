import React from "react";
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

const AddReview = props => {

    const { productSku } = props;

    const talonProps = useAddReviewComponent({
        productReviewRatingsMetadataQuery,
        addProductRatingMutation,
        productSku
    });

    const {
            handleAddReviewClick,
            isOpen,
            closeDialog,
            isLoadingReviewRating,
            ReviewRatingData,
            onStarClickHandler,
            ratingValue,
            handleSubmit,
            isSignedIn
    } = talonProps;

    const classes = mergeClasses(defaultClasses);

    if (isLoadingReviewRating) {
        return <LoadingIndicator/>
    }

    let starRatingComponent = (
        <StarRatingComponent
            size = {'1x'}
            editing = {true}
            value = {ratingValue}
            onStarClick={onStarClickHandler}
        />
    )

    const dialogComponent = (
        <Dialog
            isOpen={isOpen}
            title={'Add Review'}
            onConfirm={handleSubmit}
            onCancel={closeDialog}
        >
            <div className={classes.formRoot}>
                <div className={classes.nickname}>
                    <Field id="nickname" label="Name">
                        <TextInput field="nickname" validate={isRequired} />
                    </Field>
                </div>

            <div className={classes.text}>
                <Field id="summary" label="Summary">
                    <TextInput field="summary" validate={isRequired} />
                </Field>
            </div>

                <div className={classes.summary}>
                    <Field id="text" label="Text">
                        <TextArea field="text" validate={isRequired} />
                    </Field>
                </div>

                <div className={classes.rating}>
                    <Field id="review" label="Review">
                        {starRatingComponent}
                    </Field>
                </div>
            </div>
        </Dialog>
    );

    return (
        <div className={classes.addReviewRoot}>
            <div>
                { isSignedIn? (
                    <Button
                        priority="low"
                        onClick={handleAddReviewClick}
                    >
                        {"Add your Review"}
                    </Button>
                ) : null
                }
            </div>
            <div>
                {dialogComponent}
            </div>
        </div>
    );
}

AddReview.propTypes = {
    classes: shape({
        addReviewRoot: string,
        formRoot: string,
        nickname: string,
        text: string,
        summary: string,
        rating: string
    })
}

export default AddReview;
