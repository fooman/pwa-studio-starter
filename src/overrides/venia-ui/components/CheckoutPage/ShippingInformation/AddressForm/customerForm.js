import React, { Fragment } from 'react';
import { Form, Text } from 'informed';
import { arrayOf, bool, func, number, shape, string } from 'prop-types';
import { useCustomerForm } from '@magento/peregrine/lib/talons/CheckoutPage/ShippingInformation/AddressForm/useCustomerForm';

import { mergeClasses } from '@magento/venia-ui/lib/classify';
import { isRequired } from '@magento/venia-ui/lib/util/formValidators';
import Button from '@magento/venia-ui/lib/components/Button';
import Checkbox from '@magento/venia-ui/lib/components/Checkbox';
import Country from '@magento/venia-ui/lib/components/Country';
import Field, { Message } from '@magento/venia-ui/lib/components/Field';
import FormError from '@magento/venia-ui/lib/components/FormError';
import Region from '@magento/venia-ui/lib/components/Region';
import TextInput from '@magento/venia-ui/lib/components/TextInput';
import defaultClasses from '@magento/venia-ui/lib/components/CheckoutPage/ShippingInformation/AddressForm/customerForm.css';
import CustomerFormOperations from '@magento/venia-ui/lib/components/CheckoutPage/ShippingInformation/AddressForm/customerForm.gql';
import LoadingIndicator from '@magento/venia-ui/lib/components/LoadingIndicator';

const CustomerForm = props => {
    const { afterSubmit, classes: propClasses, onCancel, shippingData, onSubmitBillingAddress } = props;

    const talonProps = useCustomerForm({
        afterSubmit,
        ...CustomerFormOperations,
        onCancel,
        shippingData,
        onSubmitBillingAddress
    });
    const {
        formErrors,
        handleCancel,
        handleSubmit,
        hasDefaultShipping,
        initialValues,
        isLoading,
        isSaving,
        isUpdate
    } = talonProps;

    if (isLoading) {
        return (
            <LoadingIndicator>Fetching Customer Details...</LoadingIndicator>
        );
    }

    const classes = mergeClasses(defaultClasses, propClasses);

    const cancelButton = isUpdate ? (
        <Button disabled={isSaving} onClick={handleCancel} priority="low">
            {'Cancel'}
        </Button>
    ) : null;

    const submitButtonText = !hasDefaultShipping
        ? 'Save and Continue'
        : isUpdate
            ? 'Update'
            : 'Add';

    const submitButtonProps = {
        disabled: isSaving,
        priority: !hasDefaultShipping ? 'normal' : 'high',
        type: 'submit'
    };

    const defaultShippingElement = hasDefaultShipping ? (
        <div className={classes.defaultShipping}>
            <Checkbox
                disabled={!!initialValues.default_shipping}
                id="default_shipping"
                field="default_shipping"
                label="Make this my default address"
            />
        </div>
    ) : (
        <Text type="hidden" field="default_shipping" initialValue={true} />
    );

    return (
        <Fragment>
            <FormError errors={formErrors} />
            <Form
                className={classes.root}
                initialValues={initialValues}
                onSubmit={handleSubmit}
            >
                <div className={classes.firstname}>
                    <Field id="firstname" label="First Name">
                        <TextInput
                            disabled={!hasDefaultShipping}
                            field="firstname"
                            validate={isRequired}
                        />
                    </Field>
                </div>
                <div className={classes.lastname}>
                    <Field id="lastname" label="Last Name">
                        <TextInput
                            disabled={!hasDefaultShipping}
                            field="lastname"
                            validate={isRequired}
                        />
                    </Field>
                </div>
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
                    <Region validate={isRequired} optionValueKey="id" />
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

export default CustomerForm;

CustomerForm.defaultProps = {
    shippingData: {
        country: {
            code: 'US'
        },
        region: {
            id: null
        }
    }
};

CustomerForm.propTypes = {
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
        formMessage: string,
        defaultShipping: string
    }),
    onCancel: func,
    shippingData: shape({
        city: string,
        country: shape({
            code: string.isRequired
        }).isRequired,
        default_shipping: bool,
        email: string,
        firstname: string,
        id: number,
        lastname: string,
        postcode: string,
        region: shape({
            id: number
        }).isRequired,
        street: arrayOf(string),
        telephone: string
    })
};
