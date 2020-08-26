import React, { Fragment } from 'react';
import { func, string, shape } from 'prop-types';
import { Edit2 as EditIcon } from 'react-feather';
import { useShippingInformation } from '@magento/peregrine/lib/talons/CheckoutPage/ShippingInformation/useShippingInformation';

import { mergeClasses } from '@magento/venia-ui/lib/classify';
import Icon from '@magento/venia-ui/lib/components/Icon';
import LoadingIndicator from '@magento/venia-ui/lib/components/LoadingIndicator';
import AddressForm from '@magento/venia-ui/lib/components/CheckoutPage/ShippingInformation/AddressForm';
import Card from '@magento/venia-ui/lib/components/CheckoutPage/ShippingInformation/card';
import EditModal from '@magento/venia-ui/lib/components/CheckoutPage/ShippingInformation/editModal';
import defaultClasses from '@magento/venia-ui/lib/components/CheckoutPage/ShippingInformation/shippingInformation.css';
import ShippingInformationOperations from '@magento/venia-ui/lib/components/CheckoutPage/ShippingInformation/shippingInformation.gql';
import LinkButton from '@magento/venia-ui/lib/components/LinkButton';
import AddressBookOperation from '@magento/venia-ui/lib/components/CheckoutPage/AddressBook/addressBook.gql';

const ShippingInformation = props => {
    const { classes: propClasses, onSave, toggleActiveContent, selectedAddressId } = props;
    const talonProps = useShippingInformation({
        onSave,
        toggleActiveContent,
        ...ShippingInformationOperations,
        getAddress: AddressBookOperation.queries.getCustomerAddressesQuery,
        selectedAddressId
    });
    const {
        doneEditing,
        handleEditShipping,
        hasUpdate,
        isSignedIn,
        isLoading,
        shippingData
    } = talonProps;

    const classes = mergeClasses(defaultClasses, propClasses);

    const rootClassName = !doneEditing
        ? classes.root_editMode
        : hasUpdate
            ? classes.root_updated
            : classes.root;

    if (isLoading) {
        return (
            <LoadingIndicator classes={{ root: classes.loading }}>
                Fetching Shipping Information...
            </LoadingIndicator>
        );
    }

    const editModal = !isSignedIn ? (
        <EditModal shippingData={shippingData} />
    ) : null;

    const shippingInformation = doneEditing ? (
        <Fragment>
            <div className={classes.cardHeader}>
                <h5 className={classes.cardTitle}>{'Billing Information'}</h5>
                <LinkButton
                    onClick={handleEditShipping}
                    className={classes.editButton}
                >
                    <Icon
                        size={16}
                        src={EditIcon}
                        classes={{ icon: classes.editIcon }}
                    />
                    <span className={classes.editText}>{'Edit'}</span>
                </LinkButton>
            </div>
            <Card shippingData={shippingData} />
            {editModal}
        </Fragment>
    ) : (
        <Fragment>
            <h3 className={classes.editTitle}>{'1. Billing Information'}</h3>
            <div className={classes.editWrapper}>
                <AddressForm shippingData={shippingData} onSubmitBillingAddress = {onSave}  />
            </div>
        </Fragment>
    );

    return <div className={rootClassName}>{shippingInformation}</div>;
};

export default ShippingInformation;

ShippingInformation.propTypes = {
    classes: shape({
        root: string,
        root_editMode: string,
        cardHeader: string,
        cartTitle: string,
        editWrapper: string,
        editTitle: string,
        editButton: string,
        editIcon: string,
        editText: string
    }),
    onSave: func.isRequired,
    toggleActiveContent: func.isRequired
};
