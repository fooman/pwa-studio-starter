import React from "react";

import {shape, string} from "prop-types";
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import defaultClasses from "./experts.css";

const Experts = () => {
    const classes = mergeClasses(defaultClasses);

    return (
        <div className={classes.expertsRoot}>
        </div>
    );
}

Experts.propTypes = {
    classes: shape({
        expertsRoot: string
    })
};

export default Experts;
