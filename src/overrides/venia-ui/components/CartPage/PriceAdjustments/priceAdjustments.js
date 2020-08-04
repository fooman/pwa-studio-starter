import React from 'react';
import { func } from 'prop-types';

import { mergeClasses } from '@magento/venia-ui/lib/classify';
import { Accordion, Section } from '@magento/venia-ui/lib/components/Accordion';
import CouponCode from '@magento/venia-ui/lib/components/CartPage/PriceAdjustments/CouponCode';
import GiftCardSection from '@magento/venia-ui/lib/components/CartPage/PriceAdjustments/giftCardSection';
import GiftOptions from '@magento/venia-ui/lib/components/CartPage/PriceAdjustments/GiftOptions';
import ShippingMethods from '@magento/venia-ui/lib/components/CartPage/PriceAdjustments/ShippingMethods';

import defaultClasses from '@magento/venia-ui/lib/components/CartPage/PriceAdjustments/priceAdjustments.css';
import {useCartContext} from '@magento/peregrine/lib/context/cart';

const PriceAdjustments = props => {
    const classes = mergeClasses(defaultClasses, props.classes);

    const { setIsCartUpdating } = props;

    const [cartState] = useCartContext();

    const cartIsVirtual = () => {
        if (cartState && cartState.isVirtual) {
            return true;
        }
        return false;
    }

    return (
        <div className={classes.root}>
            <Accordion canOpenMultiple={true}>
                {!cartIsVirtual ? (
                    <Section
                        id={'shipping_method'}
                        title={'Estimate your Shipping'}
                    >
                        <ShippingMethods setIsCartUpdating={setIsCartUpdating} />
                    </Section>
                    ) : null
                }
                <Section id={'coupon_code'} title={'Enter Coupon Code'}>
                    <CouponCode setIsCartUpdating={setIsCartUpdating} />
                </Section>
                {!cartIsVirtual ? (
                    <div>
                        <GiftCardSection setIsCartUpdating={setIsCartUpdating} />
                        <Section id={'gift_options'} title={'See Gift Options'}>
                            <GiftOptions />
                        </Section>
                    </div>
                    ) : null
                }
            </Accordion>
        </div>
    );
};

export default PriceAdjustments;

PriceAdjustments.propTypes = {
    setIsCartUpdating: func
};
