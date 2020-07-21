import React from "react";

import {shape, string} from "prop-types";
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import defaultClasses from "./readyToSave.css";

const ReadyToSave = () => {
    const classes = mergeClasses(defaultClasses);

    return (
        <div className={classes.root}>
            <div className = {classes.heading}>
                <h2>{"Ready to save time and money managing your Magento store?"}</h2>
                <div className = {classes.line}>
                    <div className = {classes.unit}>
                    </div>
                    <div className = {classes.unit}>
                        <button className = {classes.btnMagentoLocation}>
                            <span>
                                <span>{"View Magento 1 Extensions"}</span>
                            </span>
                        </button>
                    </div>
                    <div className = {classes.unit}>
                        <button className = {classes.btnMagentoLocation}>
                            <span>
                                <span>{"View Magento 2 Extensions"}</span>
                            </span>
                        </button>
                    </div>
                    <div className = {classes.unit}>
                    </div>
                </div>
            </div>
        </div>
    );
}

ReadyToSave.propTypes = {
    classes: shape({
        root: string,
        heading: string,
        line: string,
        unit: string,
        btnMagentoLocation: string
    })
};

export default ReadyToSave;
