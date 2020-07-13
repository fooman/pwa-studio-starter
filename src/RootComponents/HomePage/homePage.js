import React from "react";
import defaultClasses from './homePage.css'
import { shape, string} from "prop-types";
import {mergeClasses} from "@magento/venia-ui/lib/classify";

const HomePage = () => {
    const classes = mergeClasses(defaultClasses);
    return (
        <div>
            <div className={classes.HeroImg}></div>
        </div>
    );
}

HomePage.propTypes = {
    classes: shape({
        HeroImg: string
    })
};

export default HomePage;
