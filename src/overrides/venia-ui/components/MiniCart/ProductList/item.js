import React, { useMemo } from 'react';
import { string, number, shape, func, arrayOf } from 'prop-types';
import { Trash2 as DeleteIcon } from 'react-feather';

import { Price } from '@magento/peregrine';
import { Link, resourceUrl } from '@magento/venia-drivers';
import { useItem } from '@magento/peregrine/lib/talons/MiniCart/useItem';

import ProductOptions from '@magento/venia-ui/lib/components/LegacyMiniCart/productOptions';
import Image from '@magento/venia-ui/lib/components/Image';
import Icon from '@magento/venia-ui/lib/components/Icon';
import { mergeClasses } from '@magento/venia-ui/lib/classify';

import defaultClasses from './item.css';

const Item = props => {
    const {
        classes: propClasses,
        product,
        id,
        quantity,
        configurable_options,
        handleRemoveItem,
        prices,
        closeMiniCart
    } = props;

    const classes = mergeClasses(defaultClasses, propClasses);
    const itemLink = useMemo(
        () => resourceUrl(`/${product.url_key}${product.url_suffix}`),
        [product.url_key, product.url_suffix]
    );

    const { isDeleting, removeItem } = useItem({
        id,
        handleRemoveItem
    });

    const rootClass = isDeleting ? classes.root_disabled : classes.root;

    return (
        <div className={rootClass}>
            <Link
                className={classes.thumbnailContainer}
                to={itemLink}
                onClick={closeMiniCart}
            >
                <Image
                    alt={product.name}
                    classes={{ root: classes.thumbnail }}
                    width={100}
                    resource={product.thumbnail.url}
                />
            </Link>
            <Link
                className={classes.name}
                to={itemLink}
                onClick={closeMiniCart}
            >
                {product.name}
            </Link>
            <ProductOptions
                options={configurable_options}
                classes={{
                    options: classes.options
                }}
            />
            <span className={classes.quantity}>{`Qty : ${quantity}`}</span>
            <span className={classes.price}>
                <Price
                    currencyCode={prices.row_total_including_tax.currency}
                    value={prices.row_total_including_tax.value}
                />
            </span>
            <button
                onClick={removeItem}
                type="button"
                className={classes.deleteButton}
                disabled={isDeleting}
            >
                <Icon
                    size={16}
                    src={DeleteIcon}
                    classes={{ icon: classes.editIcon }}
                />
            </button>
        </div>
    );
};

export default Item;

Item.propTypes = {
    classes: shape({
        root: string,
        thumbnail: string,
        name: string,
        options: string,
        quantity: string,
        price: string,
        editButton: string,
        editIcon: string
    }),
    product: shape({
        name: string,
        thumbnail: shape({
            url: string
        })
    }),
    id: string,
    quantity: number,
    configurable_options: arrayOf(
        shape({
            label: string,
            value: string
        })
    ),
    handleRemoveItem: func,
    prices: shape({
        price: shape({
            value: number,
            currency: string
        })
    })
};
