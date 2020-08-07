import React, { Fragment, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock , faExclamationCircle } from '@fortawesome/pro-light-svg-icons';
import { bool, shape, string } from 'prop-types';

import { useScrollLock, Price, useToasts } from '@magento/peregrine';
import { useMiniCart } from '@magento/peregrine/lib/talons/MiniCart/useMiniCart';
import { mergeClasses } from '@magento/venia-ui/lib/classify';

import Button from '@magento/venia-ui/lib/components/Button';
import ProductList from '@magento/venia-ui/lib/components/MiniCart/ProductList';

import MiniCartOperations from '@magento/venia-ui/lib/components/MiniCart/miniCart.gql';

import defaultClasses from '@magento/venia-ui/lib/components/MiniCart/miniCart.css';

const errorIcon = <FontAwesomeIcon icon={faExclamationCircle} color='black' size='lg'/>

/**
 * The MiniCart component shows a limited view of the user's cart.
 *
 * @param {Boolean} props.isOpen - Whether or not the MiniCart should be displayed.
 */
const MiniCart = React.forwardRef((props, ref) => {
    const { isOpen, setIsOpen } = props;

    // Prevent the page from scrolling in the background
    // when the MiniCart is open.
    useScrollLock(isOpen);

    const talonProps = useMiniCart({
        setIsOpen,
        ...MiniCartOperations
    });

    const {
        productList,
        loading,
        errors,
        totalQuantity,
        subTotal,
        handleRemoveItem,
        handleEditCart,
        handleProceedToCheckout,
        closeMiniCart
    } = talonProps;

    const classes = mergeClasses(defaultClasses, props.classes);
    const rootClass = isOpen ? classes.root_open : classes.root;
    const contentsClass = isOpen ? classes.contents_open : classes.contents;
    const quantityClassName = loading
        ? classes.quantity_loading
        : classes.quantity;
    const priceClassName = loading ? classes.price_loading : classes.price;

    const isCartEmpty = !(productList && productList.length);

    const [, { addToast }] = useToasts();

    useEffect(() => {
        if (errors && errors.length) {
            const message = errors.join(', ');

            addToast({
                type: 'error',
                icon: errorIcon,
                message,
                dismissable: true,
                timeout: 7000
            });

            if (process.env.NODE_ENV !== 'production') {
                console.error(message);
            }
        }
    }, [addToast, errors]);

    const header = subTotal ? (
        <Fragment>
            <span
                className={quantityClassName}
            >{`${totalQuantity} Items`}</span>
            <span className={priceClassName}>
                <span>{'Subtotal: '}</span>
                <Price
                    currencyCode={subTotal.currency}
                    value={subTotal.value}
                />
            </span>
        </Fragment>
    ) : null;

    const contents = isCartEmpty ? (
        <div className={classes.emptyCart}>
            <div className={classes.emptyMessage}>
                There are no items in your cart.
            </div>
        </div>
    ) : (
        <Fragment>
            <div className={classes.body}>
                <ProductList
                    items={productList}
                    loading={loading}
                    handleRemoveItem={handleRemoveItem}
                    closeMiniCart={closeMiniCart}
                />
            </div>
            <div className={classes.footer}>
                <Button
                    onClick={handleProceedToCheckout}
                    priority="high"
                    className={classes.checkoutButton}
                    disabled={loading || isCartEmpty}
                >
                    <FontAwesomeIcon icon={faLock} color='white' size='1x' className={classes.checkoutIcon}/>
                    {'Checkout'}
                </Button>
                <Button
                    onClick={handleEditCart}
                    priority="high"
                    className={classes.editCartButton}
                    disabled={loading || isCartEmpty}
                >
                    {'Edit Cart'}
                </Button>
            </div>
        </Fragment>
    );

    return (
        <aside className={rootClass}>
            <div ref={ref} className={contentsClass}>
                {contents}
            </div>
        </aside>
    );
});

export default MiniCart;

MiniCart.propTypes = {
    classes: shape({
        root: string,
        root_open: string,
        contents: string,
        contents_open: string,
        header: string,
        body: string,
        footer: string,
        checkoutButton: string,
        editCartButton: string,
        emptyCart: string,
        emptyMessage: string
    }),
    isOpen: bool
};
