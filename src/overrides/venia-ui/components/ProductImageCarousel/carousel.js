import React, { useMemo, useState } from 'react';
import { arrayOf, bool, number, shape, string } from 'prop-types';
import {
    ChevronLeft as ChevronLeftIcon,
    ChevronRight as ChevronRightIcon
} from 'react-feather';

    import { transparentPlaceholder } from '@magento/peregrine/lib/util/images';
import { useProductImageCarousel } from '@magento/peregrine/lib/talons/ProductImageCarousel/useProductImageCarousel';

    import { mergeClasses } from '@magento/venia-ui/lib/classify';
import Icon from '@magento/venia-ui/lib/components/Icon';
import Image from '@magento/venia-ui/lib/components/Image';
import defaultClasses from './carousel.css';
import Thumbnail from '@magento/venia-ui/lib/components/ProductImageCarousel/thumbnail';

    const IMAGE_WIDTH = 640;

    const ProductImageCarousel = props => {
        const { images } = props;
        const thumbnailImgLength = 4;
        const [thumbnailIndex, setThumbnailIndex] = useState(0);
        let thumbnailSlider;
            const talonProps = useProductImageCarousel({
                images,
                imageWidth: IMAGE_WIDTH
        });

            const {
            currentImage,
                activeItemIndex,
                altText,
                handleNext,
                handlePrevious,
                handleThumbnailClick,
            sortedImages
        } = talonProps;

            const thumbnails = useMemo(
                () =>
                sortedImages.map((item, index) => (
                        <Thumbnail
                            key={`${item.file}--${item.label}`}
                            item={item}
                            itemIndex={index}
                            isActive={activeItemIndex === index}
                            onClickHandler={handleThumbnailClick}
                        />
                )),
            [activeItemIndex, handleThumbnailClick, sortedImages]
        );

            const classes = mergeClasses(defaultClasses, props.classes);

            let image;
        if (currentImage.file) {
                image = (
                        <Image
                            alt={altText}
                            classes={{
                                image: classes.currentImage1,
                                root: classes.imageContainer
                            }}
                            resource={currentImage.file}
                            width={IMAGE_WIDTH}
                        />
                );
            } else {
                image = (
                        <Image
                            alt={altText}
                            classes={{
                                image: classes.currentImage,
                                root: classes.imageContainer
                            }}
                            src={transparentPlaceholder}
                        />
                );
            }

            thumbnailSlider = thumbnails.slice(thumbnailIndex, thumbnailIndex + thumbnailImgLength);

            const thumbnailPrev = () => {
                const imgFirstIndex = (thumbnailIndex - 1);
                imgFirstIndex >= 0 ? setThumbnailIndex(thumbnailIndex - 1) :
                    activeItemIndex === thumbnails.length ? setThumbnailIndex(thumbnails.length -4 ) :
                        null;
                handlePrevious();
            }

            const thumbnailNext = () => {
                const imgLastIndex = (thumbnailIndex + 1) + thumbnailImgLength;
                imgLastIndex <= thumbnails.length ? setThumbnailIndex(thumbnailIndex + 1) :
                    null;
                activeItemIndex === thumbnails.length ? setThumbnailIndex(0) : null;
                handleNext();
            }

            return (
                <div className={classes.mainCarousel}>
                    <div className={classes.root}>
                        <div className={classes.carouselContainer}>
                            <button
                                className={classes.previousButton}
                                onClick={handlePrevious}
                            >
                                <Icon src={ChevronLeftIcon} size={40} />
                            </button>
                            {image}
                            <button className={classes.nextButton}
                                    onClick={handleNext}>
                                <Icon src={ChevronRightIcon} size={40} />
                            </button>
                        </div>
                        <div className={`${classes.thumbnailList} ${classes.thumbnailWebList}`}>{thumbnailSlider}</div>
                        <div className={`${classes.thumbnailList} ${classes.thumbnailMobileList}`}>{thumbnails}</div>
                    </div>
                    <button className={classes.btnPrev}
                        priority="high"
                        onClick={thumbnailPrev}
                    >
                        <Icon src={ChevronLeftIcon} size={40} />
                    </button>
                    <button className={classes.btnNext}
                        priority="high"
                        onClick={thumbnailNext}
                    >
                        <Icon src={ChevronRightIcon} size={40} />
                    </button>
        </div>
    );
};

ProductImageCarousel.propTypes = {
    classes: shape({
        carouselContainer: string,
        currentImage1: string,
        currentImage_placeholder: string,
        imageContainer: string,
        nextButton: string,
        previousButton: string,
        root: string,
        btnPrev: string,
        btnNext: string,
        mainCarousel: string
    }),
    images: arrayOf(
        shape({
            label: string,
            position: number,
            disabled: bool,
            file: string.isRequired
        })
    ).isRequired
};

export default ProductImageCarousel;
