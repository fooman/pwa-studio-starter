import React, {useEffect, useState, useRef} from "react";
import ItemsCarousel from 'react-items-carousel';
import range from 'lodash/range';
import { useQuery } from '@apollo/react-hooks';
import agencyLogosQuery from '../../../queries/testimonialsLogo.graphql';
import Button from "@magento/venia-ui/lib/components/Button";
import {shape, string} from "prop-types";
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import Image from "@magento/venia-ui/lib/components/Image";
import defaultClasses from "./agencyLogo.css";
import {fullPageLoadingIndicator} from "@magento/venia-ui/lib/components/LoadingIndicator";

const AgencyLogo = () => {
    const { loading, error, data } = useQuery(agencyLogosQuery);
    const classes = mergeClasses(defaultClasses);
    const [activeItemIndex, setActiveItemIndex] = useState(0);
    if (error) {
        if (process.env.NODE_ENV !== 'production') {
            console.error(error);
        }
        return <div>Page Fetch Error</div>;
    }
    if (loading) {
        return fullPageLoadingIndicator;
    }
    let interval;
    const noOfItems = (data.testimonials && data.testimonials.items && data.testimonials.items.length) || 0;
    const noOfCards = 4;
    const autoPlayDelay = 3000;
    const chevronWidth = 40;

    const imgArray = (data.testimonials && data.testimonials.items) || [] ;

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
        <div key={index} className={classes.imgDiv}>
            <Image
                alt="agency-logo"
                classes={{
                    root: classes.imgDiv,
                    image: classes.imgCls,
                    loaded: classes.imgWidth,
                }}
                src={imgArray[index].logo_image}
            />
        </div>
    ));

    if(data){
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
    return null;
}

AgencyLogo.propTypes = {
    classes: shape({
        root: string,
        btnDiv: string,
        btnCls: string,
        imgDiv: string,
        imgCls: string,
        slider: string,
        imgWidth :string
    })
};

export default AgencyLogo;
