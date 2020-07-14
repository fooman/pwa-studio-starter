import React from "react";
import {shape, string} from "prop-types";
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import img18 from './Images/master2018.png';
import img17 from './Images/master2017.png';
import img16 from './Images/master2016.png';

import defaultClasses from './heroComponent.css';
import Button from "@magento/venia-ui/lib/components/Button";

const HeroComponent = () => {

    const classes = mergeClasses(defaultClasses);

    return (
        <div>
            <div className={classes.HeroImg}></div>
            <div className={classes.MagentoImages}>
                <div className={classes.commonImg}>
                    <img src={img18}/>
                </div>
                <div className={classes.commonImg}>
                    <img src={img17}/>
                </div>
                <div className={classes.commonImg}>
                    <img src={img16}/>
                </div>
            </div>
            <div className={classes.Heading}>
                <p className={classes.separateHeading}>Hi! I'm Kristof <br/>Here at Fooman we create awesome Magento extensions ... </p>
            </div>
            <div className={classes.extensionButton}>
                <Button
                    priority='high'
                >
                    {'View Magento extensions'}
                </Button>
            </div>
        </div>
    );
}

HeroComponent.propTypes = {
    classes: shape({
        HeroImg: string,
        Heading: string,
        extensionButton: string,
        MagentoImages: string,
        commonImg: string,
        separateHeading: string
    })
};

export default HeroComponent;
