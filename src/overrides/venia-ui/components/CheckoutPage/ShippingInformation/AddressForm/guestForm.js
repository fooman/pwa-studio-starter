import React, { Fragment } from 'react';
import { Form } from 'informed';
import { func, shape, string, arrayOf } from 'prop-types';
import { useGuestForm } from '@magento/peregrine/lib/talons/CheckoutPage/ShippingInformation/AddressForm/useGuestForm';

import { mergeClasses } from '@magento/venia-ui/lib/classify';
import { isRequired } from '@magento/venia-ui/lib/util/formValidators';
import Button from '@magento/venia-ui/lib/components/Button';
import Country from '@magento/venia-ui/lib/components/Country';
import Field, { Message } from '@magento/venia-ui/lib/components/Field';
import FormError from '@magento/venia-ui/lib/components/FormError';
import Region from '@magento/venia-ui/lib/components/Region';
import TextInput from '@magento/venia-ui/lib/components/TextInput';
import defaultClasses from './guestForm.css';
import GuestFormOperations from '@magento/venia-ui/lib/components/CheckoutPage/ShippingInformation/AddressForm/guestForm.gql';
import checkEmailExist from '../../../../../venia-ui/components/CheckoutPage/ShippingInformation/AddressForm/checkEmailIsAvailable.graphql';
import {SET_BILLING_ADDRESS} from '@magento/venia-ui/lib/components/CheckoutPage/PaymentInformation/creditCard.gql';
import {SET_GUEST_EMAIL} from '../../setGuestEmailMutation.gql';
import {useCartContext} from '@magento/peregrine/lib/context/cart';

const GuestForm = props => {
    const { afterSubmit, classes: propClasses, onCancel, shippingData, onSubmitBillingAddress } = props;
    const talonProps = useGuestForm({
        afterSubmit,
        ...GuestFormOperations,
        SetBillingAddressMutation: SET_BILLING_ADDRESS,
        setGuestEmailMutation: SET_GUEST_EMAIL,
        checkEmailIsExist: checkEmailExist,
        onCancel,
        shippingData,
        onSubmitBillingAddress
    });
    const {
        formErrors,
        handleCancel,
        handleSubmit,
        initialValues,
        isSaving,
        isUpdate,
        existEmailError,
    } = talonProps;

    const classes = mergeClasses(defaultClasses, propClasses);

    const [cartState] = useCartContext();

    const cartIsVirtual = () => {
        if (cartState && cartState.isVirtual) {
            return true;
        }
        return false;
    }

    const guestEmailMessage = !isUpdate ? (
        <Message>
            {
                'Set a password at the end of guest checkout to create an account in one easy step.'
            }
        </Message>
    ) : null;

    const cancelButton = isUpdate ? (
        <Button disabled={isSaving} onClick={handleCancel} priority="low">
            {'Cancel'}
        </Button>
    ) : null;

    const submitButtonText = isUpdate
        ? 'Update'
        : 'Continue to Payment Information';

    const submitButtonProps = {
        disabled: isSaving,
        priority: isUpdate ? 'high' : 'normal',
        type: 'submit'
    };

    return (
        <Fragment>
            <FormError errors={formErrors} />
            {existEmailError ? (<span className={classes.error}>{existEmailError}</span>) : null}
            <Form
                className={classes.root}
                initialValues={initialValues}
                onSubmit={handleSubmit}
            >
                {!cartIsVirtual ? (
                    <div className={classes.email}>
                        <Field id="email" label="Email">
                            <TextInput field="email" validate={isRequired} />
                            {guestEmailMessage}
                        </Field>
                    </div>
                    ) : null
                }

                <div className={classes.firstname}>
                    <Field id="firstname" label="First Name">
                        <TextInput field="firstname" validate={isRequired} />
                    </Field>
                </div>
                <div className={classes.lastname}>
                    <Field id="lastname" label="Last Name">
                        <TextInput field="lastname" validate={isRequired} />
                    </Field>
                </div>
                {cartIsVirtual ? (
                    <div className={classes.email}>
                        <Field id="email" label="Email">
                            <TextInput field="email" validate={isRequired} />
                        </Field>
                    </div>
                    ) : null
                }
                <div className={classes.country}>
                    <Country validate={isRequired} />
                </div>
                <div className={classes.street0}>
                    <Field id="street0" label="Street Address">
                        <TextInput field="street[0]" validate={isRequired} />
                    </Field>
                </div>
                <div className={classes.street1}>
                    <Field
                        id="street1"
                        label="Street Address 2"
                        optional={true}
                    >
                        <TextInput field="street[1]" />
                    </Field>
                </div>
                <div className={classes.city}>
                    <Field id="city" label="City">
                        <TextInput field="city" validate={isRequired} />
                    </Field>
                </div>
                <div className={classes.region}>
                    <Region validate={isRequired} />
                </div>
                <div className={classes.postcode}>
                    <Field id="postcode" label="ZIP / Postal Code">
                        <TextInput field="postcode" validate={isRequired} />
                    </Field>
                </div>
                <div className={classes.telephone}>
                    <Field id="telephone" label="Phone Number">
                        <TextInput field="telephone" validate={isRequired} />
                    </Field>
                </div>
                <div className={classes.buttons}>
                    {cancelButton}
                    <Button {...submitButtonProps}>{submitButtonText}</Button>
                </div>
            </Form>
        </Fragment>
    );
};

export default GuestForm;

GuestForm.defaultProps = {
    shippingData: {
        country: {
            code: 'US'
        },
        region: {
            code: ''
        }
    }
};

GuestForm.propTypes = {
    afterSubmit: func,
    classes: shape({
        root: string,
        field: string,
        email: string,
        firstname: string,
        lastname: string,
        country: string,
        street0: string,
        street1: string,
        city: string,
        region: string,
        postcode: string,
        telephone: string,
        buttons: string,
        submit: string,
        submit_update: string,
        error: string,

    }),
    onCancel: func,
    shippingData: shape({
        city: string,
        country: shape({
            code: string.isRequired
        }).isRequired,
        email: string,
        firstname: string,
        lastname: string,
        postcode: string,
        region: shape({
            code: string.isRequired
        }).isRequired,
        street: arrayOf(string),
        telephone: string
    })
};
