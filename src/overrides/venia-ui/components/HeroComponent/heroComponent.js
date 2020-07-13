import React from "react";
import {shape, string} from "prop-types";
import { mergeClasses } from '@magento/venia-ui/lib/classify';

import defaultClasses from './heroComponent.css';

const HeroComponent = () => {

    const classes = mergeClasses(defaultClasses);

    return (
        <div>
            <div className={classes.HeroImg}></div>
        </div>
    );
}

HeroComponent.propTypes = {
    classes: shape({
        HeroImg: string
    })
};

export default HeroComponent;
