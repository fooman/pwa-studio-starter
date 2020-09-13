import React from "react";
import {mergeClasses} from "@magento/venia-ui/lib/classify";
import defaultClasses from './merchantLogo.css';
import {shape, string} from "prop-types";
import Image from "@magento/venia-ui/lib/components/Image";
import bodyShop from './images/bodyshop.png';
import nespresso from './images/nespresso.png';
import ricoh from './images/ricoh.png';
import BGC from './images/BGC.png';
import LesMills from './images/LesMills.png';
import Afterpay from './images/Afterpay.png';
import Nautica from './images/Nautica.png';
import HoweTools from './images/Howe Tools.png';

const MerchantLogo = () => {

    const classes = mergeClasses(defaultClasses);

    const imgArray = [
                        {img: bodyShop, alt: 'BodyShop'},
                        {img: nespresso, alt: 'Nespresso'},
                        {img: ricoh, alt: 'Ricoh'},
                        {img: BGC, alt: 'BGC'},
                        {img: LesMills, alt: 'LesMills'},
                        {img: Afterpay, alt: 'Afterpay'},
                        {img: Nautica, alt: 'Nautica'},
                        {img: HoweTools, alt: 'HoweTools'}
                        ];

    const gridImages = imgArray.map((singleImg, index) => {
        const { img, alt } = singleImg;
        return (
            <div key={index} className={classes.imgDiv}>
                <Image
                    alt={alt}
                    classes={{
                        root: classes.imgDiv,
                        image: classes.imgCls,
                        loaded: classes.imgWidth,
                    }}
                    src={img}
                />
            </div>
        );
    })

    return (
        <div className={classes.merchantRoot}>
            <h2 className={classes.h2}>{`Trusted by Global Brands`}</h2>
            <div className={classes.wrapper}>
                { gridImages }
            </div>
        </div>
    )
}

MerchantLogo.propTypes = {
    classes: shape({
        merchantRoot: string,
        h2: string,
        wrapper: string,
        imgDiv: string,
        imgCls: string,
        imgWidth: string
    })
};

export default MerchantLogo;
