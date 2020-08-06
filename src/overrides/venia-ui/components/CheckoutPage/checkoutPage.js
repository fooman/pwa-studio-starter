import React, { useEffect } from 'react';
import { AlertCircle as AlertCircleIcon } from 'react-feather';

import { useWindowSize, useToasts } from '@magento/peregrine';
import {
    CHECKOUT_STEP,
    useCheckoutPage
} from '@magento/peregrine/lib/talons/CheckoutPage/useCheckoutPage';

import { Title } from '@magento/venia-ui/lib/components/Head';
import Button from '@magento/venia-ui/lib/components/Button';
import Icon from '@magento/venia-ui/lib/components/Icon';
import { fullPageLoadingIndicator } from '@magento/venia-ui/lib/components/LoadingIndicator';
import AddressBook from '@magento/venia-ui/lib/components/CheckoutPage/AddressBook';
import OrderSummary from '@magento/venia-ui/lib/components/CheckoutPage/OrderSummary';
import PaymentInformation from '@magento/venia-ui/lib/components/CheckoutPage/PaymentInformation';
import PriceAdjustments from '../CartPage/PriceAdjustments/priceAdjustments';
import ShippingMethod from '@magento/venia-ui/lib/components/CheckoutPage/ShippingMethod';
import ShippingInformation from '@magento/venia-ui/lib/components/CheckoutPage/ShippingInformation';
import OrderConfirmationPage from '@magento/venia-ui/lib/components/CheckoutPage/OrderConfirmationPage';
import ItemsReview from '@magento/venia-ui/lib/components/CheckoutPage/ItemsReview';

import CheckoutPageOperations from '@magento/venia-ui/lib/components/CheckoutPage/checkoutPage.gql.js';
import {GET_CART_DETAILS} from '@magento/venia-ui/lib/components/CartPage/cartPage.gql';

import { mergeClasses } from '@magento/venia-ui/lib/classify';

import defaultClasses from '@magento/venia-ui/lib/components/CheckoutPage/checkoutPage.css';
import LinkButton from '@magento/venia-ui/lib/components/LinkButton';

const errorIcon = <Icon src={AlertCircleIcon} size={20} />;

const CheckoutPage = props => {
    const { classes: propClasses } = props;
    const talonProps = useCheckoutPage({
        ...CheckoutPageOperations,
        getCategoryDetailQueries: {
            getCartDetails: GET_CART_DETAILS
        }
    });

    const {
        /**
         * Enum, one of:
         * SHIPPING_ADDRESS, SHIPPING_METHOD, PAYMENT, REVIEW
         */
        activeContent,
        checkoutStep,
        customer,
        error,
        handleSignIn,
        handlePlaceOrder,
        hasError,
        isCartEmpty,
        isGuestCheckout,
        isLoading,
        isUpdating,
        orderDetailsData,
        orderDetailsLoading,
        orderNumber,
        placeOrderLoading,
        setCheckoutStep,
        setIsUpdating,
        setShippingInformationDone,
        setShippingMethodDone,
        setPaymentInformationDone,
        resetReviewOrderButtonClicked,
        handleReviewOrder,
        reviewOrderButtonClicked,
        toggleActiveContent,
        cart,
        loading
    } = talonProps;

    const [, { addToast }] = useToasts();

    useEffect(() => {
        if (hasError) {
            const message =
                error && error.message
                    ? error.message
                    : 'Oops! An error occurred while submitting. Please try again.';

            addToast({
                type: 'error',
                icon: errorIcon,
                message,
                dismissable: true,
                timeout: 7000
            });

            if (process.env.NODE_ENV !== 'production') {
                console.error(error);
            }
        }
    }, [addToast, error, hasError]);

    const classes = mergeClasses(defaultClasses, propClasses);

    const windowSize = useWindowSize();
    const isMobile = windowSize.innerWidth <= 960;

    let checkoutContent;

    if (orderNumber) {
        return (
            <OrderConfirmationPage
                data={orderDetailsData}
                orderNumber={orderNumber}
            />
        );
    } else if (loading || isLoading) {
        return fullPageLoadingIndicator;
    } else if (isCartEmpty) {
        checkoutContent = (
            <div className={classes.empty_cart_container}>
                <div className={classes.heading_container}>
                    <h1 className={classes.heading}>
                        {isGuestCheckout ? 'Guest Checkout' : 'Checkout'}
                    </h1>
                </div>
                <h3>{'There are no items in your cart.'}</h3>
            </div>
        );
    } else {
        const loginButton = isGuestCheckout ? (
            <div className={classes.signin_container}>
                <LinkButton className={classes.sign_in} onClick={handleSignIn}>
                    {'Login and Checkout Faster'}
                </LinkButton>
            </div>
        ) : null;

        const shippingMethodSection =
            checkoutStep >= CHECKOUT_STEP.SHIPPING_METHOD ? (
                <ShippingMethod
                    pageIsUpdating={isUpdating}
                    onSave={setShippingMethodDone}
                    setPageIsUpdating={setIsUpdating}
                />
            ) : (
                <h3 className={classes.shipping_method_heading}>
                    {'2. Shipping Method'}
                </h3>
            );

        const paymentInformationSection =
            checkoutStep >= CHECKOUT_STEP.PAYMENT ? (
                <div>
                    <h3 className={classes.payment_information_heading}>
                        {'2. Payment Information'}
                    </h3>
                    <PaymentInformation
                        onSave={setPaymentInformationDone}
                        checkoutError={error}
                        resetShouldSubmit={resetReviewOrderButtonClicked}
                        setCheckoutStep={setCheckoutStep}
                        shouldSubmit={reviewOrderButtonClicked}
                    />
                </div>
            ) : (
                <h3 className={classes.payment_information_heading}>
                    {'2. Payment Information'}
                </h3>
            );

        const priceAdjustmentsSection =
            checkoutStep === CHECKOUT_STEP.PAYMENT ? (
                <div className={classes.price_adjustments_container}>
                    <PriceAdjustments setPageIsUpdating={setIsUpdating} />
                </div>
            ) : null;

        const reviewOrderButton =
            checkoutStep === CHECKOUT_STEP.PAYMENT ? (
                <Button
                    onClick={handleReviewOrder}
                    priority="high"
                    className={classes.review_order_button}
                    disabled={reviewOrderButtonClicked || isUpdating}
                >
                    {'Review Order'}
                </Button>
            ) : null;

        const itemsReview =
            checkoutStep === CHECKOUT_STEP.REVIEW ? (
                <div className={classes.items_review_container}>
                    <ItemsReview />
                </div>
            ) : null;

        const placeOrderButton =
            checkoutStep === CHECKOUT_STEP.REVIEW ? (
                <Button
                    onClick={handlePlaceOrder}
                    priority="high"
                    className={classes.place_order_button}
                    disabled={
                        isUpdating || placeOrderLoading || orderDetailsLoading
                    }
                >
                    {'Place Order'}
                </Button>
            ) : null;

        // If we're on mobile we should only render price summary in/after review.
        const shouldRenderPriceSummary = !(
            isMobile && checkoutStep < CHECKOUT_STEP.REVIEW
        );

        const orderSummary = shouldRenderPriceSummary ? (
            <div className={classes.summaryContainer}>
                <OrderSummary isUpdating={isUpdating} />
            </div>
        ) : null;

        const guestCheckoutHeaderText = isGuestCheckout
            ? 'Guest Checkout'
            : customer.default_shipping
                ? 'Review and Place Order'
                : `Welcome ${customer.firstname}!`;

        const checkoutContentClass =
            activeContent === 'checkout'
                ? classes.checkoutContent
                : classes.checkoutContent_hidden;

        checkoutContent = (
            <div className={checkoutContentClass}>
                {loginButton}
                <div className={classes.heading_container}>
                    <h1 className={classes.heading}>
                        {guestCheckoutHeaderText}
                    </h1>
                </div>
                <div className={classes.shipping_information_container}>
                    {checkoutStep === CHECKOUT_STEP.SHIPPING_ADDRESS ? (
                        <ShippingInformation
                            onSave={setShippingInformationDone}
                            toggleActiveContent={toggleActiveContent}
                        />
                        ) :null
                    }
                </div>
                {!cart.is_virtual ? (
                        <div className={classes.shipping_method_container}>
                            {shippingMethodSection}
                        </div>
                    ) : null
                }

                <div className={classes.payment_information_container}>
                    {paymentInformationSection}
                </div>
                {priceAdjustmentsSection}
                {reviewOrderButton}
                {itemsReview}
                {orderSummary}
                {placeOrderButton}
            </div>
        );
    }

    const addressBookElement = !isGuestCheckout ? (
        <AddressBook
            activeContent={activeContent}
            toggleActiveContent={toggleActiveContent}
        />
    ) : null;

    return (
        <div className={classes.root}>
            <Title>{`Checkout - ${STORE_NAME}`}</Title>
            {checkoutContent}
            {addressBookElement}
        </div>
    );
};

export default CheckoutPage;
