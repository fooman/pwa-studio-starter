import React from 'react';
import defaultClasses from "./ProductFeatureComponent.css";
import { mergeClasses } from "@magento/venia-ui/lib/classify";

const classes = mergeClasses(defaultClasses);

const ProductFeatureComponent = props => {
    return <div className={classes.feature}>{props.content}</div>
}

export default ProductFeatureComponent;
