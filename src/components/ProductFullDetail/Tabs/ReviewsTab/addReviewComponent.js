import React from "react";
import defaultClasses from './addReviewComponent.css'
import {mergeClasses} from "@magento/venia-ui/lib/classify";
import {shape, string} from "prop-types";
import Button from '@magento/venia-ui/lib/components/Button';

const AddReview = () => {

    const classes = mergeClasses(defaultClasses);

    return (
        <div className={classes.addReviewRoot}>
            <h1 className={classes.heading}>{`Add your Review`}</h1>
            <div className={classes.wrapBtnNotice}>
                <div className={classes.notice}>{`Only registered users can write reviews. Please`}</div>
                <Button
                    priority="low"
                >
                    {"Log In"}
                </Button>
            </div>
        </div>
    );
}

AddReview.propTypes = {
    classes: shape({
        addReviewRoot: string,
        heading: string,
        notice: string,
    })
}

export default AddReview;
