import { useCallback, useEffect, useMemo, useState, useRef } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import { useAppContext } from '@magento/peregrine/lib/context/app';
import { useCartContext } from '@magento/peregrine/lib/context/cart';
import { useUserContext } from '@magento/peregrine/lib/context/user';
import { MOCKED_ADDRESS } from '@magento/peregrine/lib/talons/CartPage/PriceAdjustments/ShippingMethods/useShippingForm';

export const useShippingInformation = props => {
    const {
        mutations: { setDefaultAddressOnCartMutation },
        onSave,
        queries: { getDefaultShippingQuery, getShippingInformationQuery },
        toggleActiveContent,
        getAddress,
        getGuestBillingAddress,
        selectedAddressId
    } = props;

    const [, { toggleDrawer }] = useAppContext();
    const [{ cartId }] = useCartContext();
    const [{ isSignedIn }] = useUserContext();

    const [hasUpdate, setHasUpdate] = useState(false);
    const hasLoadedData = useRef(false);

    const {
        data: shippingInformationData,
        loading: getShippingInformationLoading
    } = useQuery(getShippingInformationQuery, {
        skip: !cartId,
        variables: {
            cartId
        }
    });

    const {
        data: defaultShippingData,
        loading: getDefaultShippingLoading
    } = useQuery(getDefaultShippingQuery, { skip: !isSignedIn });

    const {
        data: guestBillingAddress,
        loading: guestBillingLoading,
    } = useQuery(getGuestBillingAddress, {
        skip: !cartId,
        variables: {
            cartId
        }
    });

    const {
        data: customerAddressesData,
        error: customerAddressesError,
        loading: customerAddressesLoading
    } = useQuery(getAddress, { skip: !isSignedIn });

    const [
        setDefaultAddressOnCart,
        { loading: setDefaultAddressLoading }
    ] = useMutation(setDefaultAddressOnCartMutation);

    const isLoading =
        getShippingInformationLoading ||
        getDefaultShippingLoading ||
        setDefaultAddressLoading;

    const shippingData = useMemo(() => {
        let filteredData;

        if (customerAddressesData) {

            let defaultBillingAddress = [];
            const { customer } = customerAddressesData;
            const { email, addresses: billingAddresses } = customer;

            if (billingAddresses.length) {
                defaultBillingAddress = selectedAddressId?
                    billingAddresses.filter((singleAddress) => singleAddress.id === selectedAddressId)
                    :
                    billingAddresses.filter((singleAddress) => singleAddress.default_billing);
            }
            if (defaultBillingAddress.length) {
                const primaryAddress = { ...defaultBillingAddress[0] };
                for (const field in MOCKED_ADDRESS) {
                    if (primaryAddress[field] === MOCKED_ADDRESS[field]) {
                        primaryAddress[field] = '';
                    }

                    if (
                        field === 'street' &&
                        primaryAddress[field][0] === MOCKED_ADDRESS[field][0]
                    ) {
                        primaryAddress[field] = [''];
                    }
                }

                filteredData = {
                    email,
                    ...primaryAddress,
                    country: { label : primaryAddress.country_code},
                    region: { label : primaryAddress.region.region}
                };
            }
        }
        else if (!isSignedIn && !guestBillingLoading && guestBillingAddress && guestBillingAddress.cart) {
            const { billingAddress, email } = guestBillingAddress.cart;
            if ( billingAddress ) {

                filteredData = {...billingAddress,
                    firstname: billingAddress.firstName,
                    lastname: billingAddress.lastName,
                    email: email,
                    postcode: billingAddress.postalCode,
                    telephone: billingAddress.phoneNumber,
                    country: {label: billingAddress.country.code},
                    region: {label: billingAddress.region.code}
                }
            }
        }
        return filteredData;
    }, [customerAddressesData, selectedAddressId, guestBillingAddress]);

    // Simple heuristic to check shipping data existed prior to this render.
    // On first submission, when we have data, we should tell the checkout page
    // so that we set the next step correctly.
    const doneEditing = !!shippingData && !!shippingData.city;

    useEffect(() => {

        if (doneEditing) {

            onSave();
        }
    }, [doneEditing, onSave]);

    useEffect(() => {
        let updateTimer;
        if (shippingData !== undefined) {
            if (hasLoadedData.current) {
                setHasUpdate(true);
                updateTimer = setTimeout(() => {
                    setHasUpdate(false);
                }, 2000);
            } else {
                hasLoadedData.current = true;
            }
        }

        return () => {
            if (updateTimer) {
                clearTimeout(updateTimer);
            }
        };
    }, [hasLoadedData, shippingData]);

    const handleEditShipping = useCallback(() => {
        if (isSignedIn) {
            toggleActiveContent();
        } else {
            toggleDrawer('shippingInformation.edit');
        }
    }, [isSignedIn, toggleActiveContent, toggleDrawer]);

    return {
        doneEditing,
        handleEditShipping,
        hasUpdate,
        isLoading,
        isSignedIn,
        shippingData
    };
};
