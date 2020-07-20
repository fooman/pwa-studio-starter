import React from "react";

import {shape, string} from "prop-types";
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import defaultClasses from "./trustedBy.css";

const TrustedBy = () => {
    const classes = mergeClasses(defaultClasses);

    return (
        <div className = {classes.trustedRoot}>
        </div>
    );
}

TrustedBy.propTypes = {
    classes: shape({
        trustedRoot: string
    })
};

export default TrustedBy;
