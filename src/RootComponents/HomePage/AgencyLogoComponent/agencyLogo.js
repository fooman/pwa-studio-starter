import React, {useEffect, useState, useRef} from "react";
import ItemsCarousel from 'react-items-carousel';
import range from 'lodash/range';
import { useQuery } from '@apollo/react-hooks';
import agencyLogosQuery from '../../../queries/testimonialsLogo.graphql';
import Button from "@magento/venia-ui/lib/components/Button";
import {shape, string} from "prop-types";
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import defaultClasses from "./agencyLogo.css";

const AgencyLogo = () => {
    const { data  } = useQuery(agencyLogosQuery);
    let interval;
    const noOfItems = (data.testimonials && data.testimonials.items && data.testimonials.items.length) || 0;
    const noOfCards = 4;
    const autoPlayDelay = 3000;
    const chevronWidth = 40;

    const imgArray = (data.testimonials && data.testimonials.items) || [] ;

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
                <img className={classes.imgCls} src={imgArray[index].logo_image}/>
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
