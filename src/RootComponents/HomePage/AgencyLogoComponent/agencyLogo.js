import React, {useEffect, useState, useRef} from "react";
import ItemsCarousel from 'react-items-carousel';
import range from 'lodash/range';

import { Link, resourceUrl } from '@magento/venia-drivers';
import Button from "@magento/venia-ui/lib/components/Button";
import {shape, string} from "prop-types";
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import classic from './images/524b430d94340.png';
import meanBee from './images/524b42dadff25.png';
import amazing from './images/524b43888b6e0.png';
import younify from './images/524b422510cf4.png';
import bestResp from './images/58c88efcee1be.png';
import purPointDesign from './images/56f065a3e4800.png';
import defaultClasses from "./agencyLogo.css";

const AgencyLogo = () => {

    let interval;
    const noOfItems = 6;
    const noOfCards = 4;
    const autoPlayDelay = 3000;
    const chevronWidth = 40;

    const imgArray = [
            {img: classic, link: 'https://www.classyllama.com'},
            {img: meanBee, link: 'http://www.meanbee.com/'},
            {img: younify, link: 'https://www.younify.nl/'},
            {img: amazing, link: 'http://amazing.nl/'},
            {img: purPointDesign, link: 'https://www.pinpointdesigns.co.uk/'},
            {img: bestResp, link: 'https://www.bestresponsemedia.co.uk/'}
        ];

    const classes = mergeClasses(defaultClasses);
    const [activeItemIndex, setActiveItemIndex] = useState(0);

    useEffect(() => {
            interval = setInterval(tick, autoPlayDelay)

            return () => {
                clearInterval(interval);
            }

        }
        ,[activeItemIndex]);

    const tick = () => setActiveItemIndex(
        (activeItemIndex + 1) % (noOfItems-noOfCards + 1)
    );

    const onChangeValue = value => {
        setActiveItemIndex( value );
    }

    const imgHandleClick = imgLink => {
        window.open(imgLink, '_blank');
    }

    const carouselItems = range(noOfItems).map(index => (
        <div className={classes.imgDiv} key={index}>
                <img className={classes.imgCls} src={imgArray[index].img} onClick={() => imgHandleClick(imgArray[index].link)}/>
        </div>
    ));

    return (
        <div className = {classes.root}>
            <div className = {classes.slider}>
            <ItemsCarousel
                gutter={12}
                numberOfCards={noOfCards}
                activeItemIndex={activeItemIndex}
                requestToChangeActive={onChangeValue}
                chevronWidth={chevronWidth}
                outsideChevron
            >
                    {carouselItems}
            </ItemsCarousel>
            </div>

        <div className = {classes.btnDiv}>
            <Button className={classes.btnCls}
                priority="normal"
            >
                {"Read Client Stories"}
            </Button>
        </div>
        </div>
    );
}

AgencyLogo.propTypes = {
    classes: shape({
        root: string,
        btnDiv: string,
        btnCls: string,
        imgDiv: string,
        imgCls: string,
        slider: string
    })
};

export default AgencyLogo;
