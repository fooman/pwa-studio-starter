import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleRight} from "@fortawesome/free-solid-svg-icons";
import {shape, string} from "prop-types";
import defaultClasses from './addReviewComponent.css'
import {mergeClasses} from "@magento/venia-ui/lib/classify";
import { Link, resourceUrl } from '@magento/venia-drivers';
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
import FormError from "@magento/venia-ui/lib/components/FormError";

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
            isSignedIn,
            errors
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
            <FormError errors={Array.from(errors.values())} />
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

    const requestForLogin = (
        <div className={classes.requestLoginRoot}>
            <h1 className={classes.requestHeading}>{`Add your Review`}</h1>
            <div className={classes.requestDescription}>{`Please login to share your review of this Fooman extension`}</div>
            <Link className={classes.wrapBtn} to={resourceUrl('/login')}>
                <Button
                    priority="high"
                >
                    {'sign in'}
                </Button>
            </Link>
        </div>
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
                ) : requestForLogin
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
        requestLoginRoot: string,
        requestHeading: string,
        requestDescription: string,
        wrapBtn: string,
        requestLogin: string,
        icon: string,
        formRoot: string,
        nickname: string,
        text: string,
        summary: string,
        rating: string
    })
}

export default AddReview;
