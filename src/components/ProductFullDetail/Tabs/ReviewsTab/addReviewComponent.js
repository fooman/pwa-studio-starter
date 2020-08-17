import React from "react";
import defaultClasses from './addReviewComponent.css'
import {mergeClasses} from "@magento/venia-ui/lib/classify";
import {shape, string} from "prop-types";
import Button from '@magento/venia-ui/lib/components/Button';

const AddReview = () => {

    const classes = mergeClasses(defaultClasses);

    return (
        <div className={classes.addReviewRoot}>
            <Button
                priority="low"
            >
                {"Add your Review"}
            </Button>
        </div>
    );
}

AddReview.propTypes = {
    classes: shape({
        addReviewRoot: string
    })
}

export default AddReview;
