import React from "react";

import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { useProductImageCarousel } from "@magento/peregrine/lib/talons/ProductImageCarousel/useProductImageCarousel";
import defaultClasses from './ProductGallery.css';
import { generateUrl } from "@magento/venia-ui/lib/util/images";
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import { shape, string } from "prop-types";


const IMAGE_WIDTH = 1200;

const type =  'image-product';


const ProductGallery = props => {

    const classes = mergeClasses(defaultClasses);

    const state = {
        showBullets: true,
        showPlayButton: true,
        showGalleryPlayButton: true
    };

    const { images } = props;

    const talonProps = useProductImageCarousel({
        images,
        imageWidth: IMAGE_WIDTH
    });

    const {
        sortedImages
    } = talonProps;

    let imagesContent = [];
    let singleImg = {};

    const ImageData = () => {
        sortedImages.forEach((item) => {
            const src= generateUrl(item.file, type)(
                IMAGE_WIDTH,
                IMAGE_WIDTH
            );
            singleImg = {};

            singleImg["original"] = src;
            singleImg["thumbnail"] = src;
            singleImg["originalClass"] = classes.originalClass;
            singleImg["thumbnailClass"] = classes.thumbnailClass;

            imagesContent.push(singleImg);
        })
    };

    ImageData();

    return <ImageGallery
        items={imagesContent}
        showBullets={state.showBullets}
        additionalClass = {classes.appImageGallery}
    />
}

ProductGallery.propTypes = {
    classes: shape({
        appImageGallery: string,
        originalClass: string,
        thumbnailClass: string
    })
};

export default ProductGallery;
