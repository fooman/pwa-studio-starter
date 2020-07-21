import React from "react";

import {shape, string} from "prop-types";
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import defaultClasses from "./agencyLogo.css";

const AgencyLogo = () => {
    const classes = mergeClasses(defaultClasses);

    return (
        <div className={classes.root}>

        </div>
    );
}

AgencyLogo.propTypes = {
    classes: shape({
        root: string
    })
};

export default AgencyLogo;
