import React from "react";

import {shape, string} from "prop-types";
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import defaultClasses from "./readyToSave.css";

const ReadyToSave = () => {
    const classes = mergeClasses(defaultClasses);

    return (
        <div className={classes.readyToSaveRoot}>
        </div>
    );
}

ReadyToSave.propTypes = {
    classes: shape({
        readyToSaveRoot: string
    })
};

export default ReadyToSave;
