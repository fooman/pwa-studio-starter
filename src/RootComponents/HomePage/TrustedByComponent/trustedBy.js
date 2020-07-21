import React from "react";

import {shape, string} from "prop-types";
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import defaultClasses from "./trustedBy.css";
import trusted1 from './images/trusted1.png';
import trusted2 from './images/trusted2.png';
import trusted3 from './images/trusted3.png';

const TrustedBy = () => {
    const classes = mergeClasses(defaultClasses);

    return (
        <div className = {classes.root}>
            <div className = {classes.heading}>
                <h2 className = {classes.h2}>... that are trusted by developers and merchants...</h2>
                <div className = {classes.line}>
                    <div className = {classes.unit}>
                        <div className={classes.icon}>
                            <img src = {trusted1}/>
                        </div>
                        <div className = {classes.mText}>
                            <h3 className = {classes.h3}>{"DEVELOPER FRIENDLY CODE"}</h3>
                        </div>
                        <div className = {classes.rText}>
                            <p className = {classes.pTag}>{"Developer friendly, best practice Magento code that’s easy to modify to suit your needs"}</p>
                        </div>
                    </div>
                    <div className = {classes.unit}>
                        <div className={classes.icon}>
                            <img src = {trusted2}/>
                        </div>
                        <div className = {classes.mText}>
                            <h3 className = {classes.h3}>{"LOVED BY MERCHANTS"}</h3>
                        </div>
                        <div className = {classes.rText}>
                            <p className = {classes.pTag}>{"Reliable extensions with easy instructions, backed by friendly support from Kristof and Michael"}</p>
                        </div>
                    </div>
                    <div className = {classes.unit}>
                        <div className={classes.icon}>
                            <img src = {trusted3}/>
                        </div>
                        <div className = {classes.mText}>
                            <h3 className = {classes.h3}>{"WIDELY RECOMMENDED"}</h3>
                        </div>
                        <div className = {classes.rText}>
                            <p className = {classes.pTag}>{"More than 97% of customers are 'very satisfied' with Fooman extensions"}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

TrustedBy.propTypes = {
    classes: shape({
        root: string,
        heading: string,
        h2: string,
        line: string,
        unit: string,
        icon: string,
        mText: string,
        rText: string,
        pTag: string
    })
};

export default TrustedBy;
