import React from "react";
import {shape, string} from "prop-types";
import { Link, resourceUrl } from '@magento/venia-drivers';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import defaultClasses from "./readyToSave.css";
import Button from "@magento/venia-ui/lib/components/Button";

const ReadyToSave = () => {
    const classes = mergeClasses(defaultClasses);

    return (
        <div className={classes.root}>
            <div className = {classes.heading}>
                <h2 className = {classes.h2}>{"Ready to save time and money managing your Magento store?"}</h2>
                <div className = {classes.line}>
                    <div className = {classes.unit}>
                    </div>
                    <div className = {classes.unit}>
                        <Link className={classes.link} to={resourceUrl('/extensions')}>
                         <Button
                                priority="high"
                         >
                            <span>
                                <span>{"View Magento 1 Extensions"}</span>
                            </span>
                         </Button>
                        </Link>
                    </div>
                    <div className = {classes.unit}>
                        <Link className={classes.link} to={resourceUrl('/extensions/magento2')}>
                         <Button
                                priority="high"
                         >
                            <span>
                                <span>{"View Magento 2 Extensions"}</span>
                            </span>
                         </Button>
                        </Link>
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
        h2: string,
        line: string,
        unit: string,
        btnMagentoLocation: string
    })
};

export default ReadyToSave;
