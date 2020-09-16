import React, { useEffect } from 'react';
import { object, shape, string } from 'prop-types';
import { useOrderConfirmationPage } from '@magento/peregrine/lib/talons/CheckoutPage/OrderConfirmationPage/useOrderConfirmationPage';

import { mergeClasses } from '@magento/venia-ui/lib/classify';
import { Title } from '@magento/venia-ui/lib/components/Head';
import CreateAccount from '@magento/venia-ui/lib/components/CheckoutPage/OrderConfirmationPage/createAccount';
import ItemsReview from '@magento/venia-ui/lib/components/CheckoutPage/ItemsReview';
import defaultClasses from '@magento/venia-ui/lib/components/CheckoutPage/OrderConfirmationPage/orderConfirmationPage.css';

const OrderConfirmationPage = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const { data, orderNumber } = props;

    const talonProps = useOrderConfirmationPage({
        data
    });

    const { flatData, isSignedIn } = talonProps;

    const {
        city,
        country,
        email,
        firstname,
        lastname,
        postcode,
        region,
        shippingMethod,
        street
    } = flatData;

    const streetRows = street.map((row, index) => {
        return (
            <span key={index} className={classes.addressStreet}>
                {row}
            </span>
        );
    });

    useEffect(() => {
        window.scrollTo({
            left: 0,
            top: 0,
            behavior: 'smooth'
        });
    }, []);

    const createAccountForm = !isSignedIn ? (
        <CreateAccount
            firstname={firstname}
            lastname={lastname}
            email={email}
        />
    ) : null;

    return (
        <div className={classes.root}>
            <Title>{`Receipt - ${STORE_NAME}`}</Title>
            <div className={classes.mainContainer}>
                <h2 className={classes.heading}>
                    {'Thank you for your order!'}
                </h2>
                <div
                    className={classes.orderNumber}
                >{`Order Number: ${orderNumber}`}</div>
                <div className={classes.shippingInfoHeading}>
                    Billing Information
                </div>
                <div className={classes.shippingInfo} data-testid="orderConfirmation-billingInfo">
                    <span className={classes.email}>{email}</span>
                    <span
                        className={classes.name}
                    >{`${firstname} ${lastname}`}</span>
                    {streetRows}
                    <span
                        className={classes.addressAdditional}
                    >{`${city}, ${region} ${postcode} ${country}`}</span>
                </div>
                <div className={classes.itemsReview}>
                    <ItemsReview data={data} />
                </div>
            </div>
            <div className={classes.sidebarContainer}>{createAccountForm}</div>
        </div>
    );
};

export default OrderConfirmationPage;

OrderConfirmationPage.propTypes = {
    classes: shape({
        addressStreet: string,
        mainContainer: string,
        heading: string,
        orderNumber: string,
        shippingInfoHeading: string,
        shippingInfo: string,
        email: string,
        name: string,
        addressAdditional: string,
        shippingMethodHeading: string,
        shippingMethod: string,
        itemsReview: string,
        additionalText: string,
        sidebarContainer: string
    }),
    data: object.isRequired,
    orderNumber: string
};
