import React from "react";

import {shape, string} from "prop-types";
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import defaultClasses from "./backedByEveryThing.css";

const BackedByEveryThing = () => {
    const classes = mergeClasses(defaultClasses);

    return (
        <div className = {classes.backedByRoot}>
        </div>
    );
}

BackedByEveryThing.propTypes = {
    classes: shape({
        backedByRoot: string
    })
};

export default BackedByEveryThing;
