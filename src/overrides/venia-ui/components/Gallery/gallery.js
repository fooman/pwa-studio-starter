import React, { useMemo } from 'react';
import { string, shape, array } from 'prop-types';

import { mergeClasses } from '@magento/venia-ui/lib/classify';
import GalleryItem from './item';
import defaultClasses from './gallery.css';

const mapGalleryItem = item => {
    const { small_image } = item;
    return {
        ...item,
        small_image:
            typeof small_image === 'object' ? small_image.url : small_image
    };
};

const Gallery = props => {
    const classes = mergeClasses(defaultClasses, props.classes);

    const { items } = props;

    const galleryItems = useMemo(
        () =>
            items.map((item, index) => {
                if (item === null) {
                    return <GalleryItem key={index} />;
                }
                return <GalleryItem key={index} item={mapGalleryItem(item)} />;
            }),
        [items]
    );
    return (
        <div className={classes.root}>
            <div className={classes.items}>
                <div className={classes.galleryItemsWrap}> {galleryItems}</div>
            </div>
        </div>
    );
};

Gallery.propTypes = {
    classes: shape({
        filters: string,
        items: string,
        pagination: string,
        root: string,
        galleryItemsWrap: string
    }),
    items: array.isRequired
};

export default Gallery;
