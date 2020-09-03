import {useCallback, useEffect, useState, useMemo} from 'react';
import { useMutation, useLazyQuery} from '@apollo/client';

import { useCartContext } from '@magento/peregrine/lib/context/cart';

export const useGuestForm = props => {
    const {
        afterSubmit,
        mutations: { setGuestShippingMutation },
        SetBillingAddressMutation,
        setGuestEmailMutation,
        checkEmailIsExist,
        onCancel,
        shippingData,
        onSubmitBillingAddress
    } = props;

    /*state to store form data*/
    const [formData, setFormData] = useState(null);
    const [existEmailError, setExistEmail] = useState(null);

    const [{ cartId }] = useCartContext();

    /*set guest shipping*/
    const [setGuestShipping] = useMutation(
        setGuestShippingMutation
    );

    /*set billing address mutation*/
    const [setBillingAddress, {
        error: setBillingAddressError,
        loading
        }
        ] = useMutation(
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

    const [ checkEmail, { loading: isEmailLoading, data: isEmailData, error: isEmailError }] = useLazyQuery(checkEmailIsExist,{fetchPolicy: 'network-only'});

    const onSubmitOperation = async() => {
        const { country, email, firstname, lastname, street, city, postcode, region, telephone } = formData;
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
            });

            if (afterSubmit) {
                afterSubmit();
            }

            await onSubmitBillingAddress();

            setExistEmail(null);
        }
        catch(e) {
            return;
        }
    }

    useEffect(() => {
        if (!isEmailLoading && isEmailData) {
            const { isEmailAvailable: {is_email_available} } = isEmailData;
            if (!is_email_available) {
                window.scrollTo({
                    left: 0,
                    top: 0,
                    behavior: 'smooth'
                });
                let emailExistError = 'Entered email is already exist..';
                setExistEmail(emailExistError);
            }
            else onSubmitOperation();
        }
    }, [
        isEmailLoading,
        isEmailData
    ]);

    const handleSubmit = useCallback(
        async formValues => {
            try {
                setFormData(formValues);

                 await checkEmail({
                    variables: {
                        email: formValues.email
                    }
                });

            } catch(e) {
                return;
            }
        },
        [afterSubmit, cartId, setBillingAddress]
    );

    const handleCancel = useCallback(() => {
        onCancel();
    }, [onCancel]);

    const errors = useMemo(
        () =>
            new Map([
                ['checkEmailQuery', isEmailError ],
                ['setGuestEmailOnCartMutation', guestEmailError],
                ['setBillingAddressMutation', setBillingAddressError]
            ]),
        [ isEmailError, guestEmailError, setBillingAddressError ]
    );

    return {
        errors,
        handleCancel,
        handleSubmit,
        initialValues,
        isSaving: loading,
        isUpdate,
        existEmailError
    };
};
