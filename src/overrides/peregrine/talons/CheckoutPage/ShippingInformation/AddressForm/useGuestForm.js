import { useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { useCartContext } from '@magento/peregrine/lib/context/cart';

export const useGuestForm = props => {
    const {
        afterSubmit,
        mutations: { setGuestShippingMutation },
        SetBillingAddressMutation,
        setGuestEmailMutation,
        onCancel,
        shippingData,
        onSubmitBillingAddress
    } = props;

    const [{ cartId }] = useCartContext();

    /*set guest shipping*/
    const [setGuestShipping] = useMutation(
        setGuestShippingMutation
    );

    /*set billing address mutation*/
    const [setBillingAddress, { error, loading }] = useMutation(
        SetBillingAddressMutation
    );

    /*set guest email on cart*/
    const [setGuestEmailOnCart, {
            error: guestEmailError,
            loading: guestEmailLoading
        }
    ] = useMutation(setGuestEmailMutation);

    const { country, region } = shippingData;
    const { code: countryCode } = country;
    const { code: regionCode } = region;

    const initialValues = {
        ...shippingData,
        country: countryCode,
        region: regionCode
    };

    // Simple heuristic to indicate form was submitted prior to this render
    const isUpdate = !!shippingData.city;

    const handleSubmit = useCallback(
        async formValues => {
            const { country, email, firstname, lastname, street, city, postcode, region, telephone } = formValues;

            try {

                await setGuestEmailOnCart({
                    variables: {
                        cartId,
                        email
                    }
                });

                 await setBillingAddress({
                    variables: {
                        cartId: cartId,
                        firstName: firstname,
                        lastName: lastname,
                        country: country,
                        street1: street[0],
                        street2: street.length > 1 ? street[1] : '',
                        city: city,
                        state: region,
                        postalCode : postcode,
                        phoneNumber: telephone,
                        sameAsShipping: false
                    }
                })
            } catch(e) {
                return;
            }

            onSubmitBillingAddress();
            if (afterSubmit) {
                afterSubmit();
            }
        },
        [afterSubmit, cartId, setBillingAddress]
    );

    const handleCancel = useCallback(() => {
        onCancel();
    }, [onCancel]);

    return {
        formErrors: [error],
        handleCancel,
        handleSubmit,
        initialValues,
        isSaving: loading,
        isUpdate
    };
};
