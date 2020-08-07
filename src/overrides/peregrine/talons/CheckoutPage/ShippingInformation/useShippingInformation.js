import { useCallback, useEffect, useMemo, useState, useRef } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';

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
        getAddress
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
                defaultBillingAddress = billingAddresses.filter((singleAddress) => singleAddress.default_billing);
            }
            if (defaultBillingAddress.length) {
                const primaryAddress = defaultBillingAddress[0];
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
                    ...primaryAddress
                };
            }
        }
        return filteredData;
    }, [customerAddressesData]);

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
