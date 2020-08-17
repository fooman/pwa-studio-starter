import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import defaultClasses from './addReviewComponent.css'
import {mergeClasses} from "@magento/venia-ui/lib/classify";
import {shape, string} from "prop-types";


const AddReview = () => {

    const classes = mergeClasses(defaultClasses);

    return (
        <div className={classes.addReviewRoot}>
            <h1 className={classes.heading}>{`Add your Review`}</h1>
            <div className={classes.wrapBtnNotice}>
                <div className={classes.notice}>{`Only registered users can write reviews. Please`}</div>
                <div className={classes.wrapLoginIcon}>
                    <button className={classes.logInBtn}>
                        {`Log In`}
                    </button>
                    <FontAwesomeIcon className={classes.fontIcon}  icon = {faAngleRight} size={'2x'}/>
                </div>
            </div>
        </div>
    );
}

AddReview.propTypes = {
    classes: shape({
        addReviewRoot: string,
        heading: string,
        notice: string,
        btnIconSection: string,
        wrapBtnNotice: string,
        logInBtn: string,
        wrapLoginIcon: string,
        fontIcon: string
    })
}

export default AddReview;
