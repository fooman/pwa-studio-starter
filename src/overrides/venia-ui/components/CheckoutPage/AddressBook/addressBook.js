import React, { Fragment, useEffect, useMemo } from 'react';
import { shape, string, func } from 'prop-types';
import { PlusSquare, AlertCircle as AlertCircleIcon } from 'react-feather';
import { useToasts } from '@magento/peregrine';
import { useAddressBook } from '@magento/peregrine/lib/talons/CheckoutPage/AddressBook/useAddressBook';
import {SET_BILLING_ADDRESS_WITH_ADDRESS_ID} from 'src/overrides/venia-ui/components/CheckoutPage/PaymentInformation/creditCard.gql';

import { mergeClasses } from '@magento/venia-ui/lib/classify';
import Button from '@magento/venia-ui/lib/components/Button';
import defaultClasses from '@magento/venia-ui/lib/components/CheckoutPage/AddressBook/addressBook.css';
import AddressBookOperations from '@magento/venia-ui/lib/components/CheckoutPage/AddressBook/addressBook.gql';
import EditModal from '@magento/venia-ui/lib/components/CheckoutPage/ShippingInformation/editModal';
import AddressCard from '@magento/venia-ui/lib/components/CheckoutPage/AddressBook/addressCard';
import Icon from '@magento/venia-ui/lib/components/Icon';
import LinkButton from '@magento/venia-ui/lib/components/LinkButton';

const errorIcon = <Icon src={AlertCircleIcon} attrs={{ width: 18 }} />;

const AddressBook = props => {

    const { activeContent, classes: propClasses, toggleActiveContent, selectedAddressCallBack } = props;

    const talonProps = useAddressBook({
        ...AddressBookOperations,
        toggleActiveContent,
        SetBillingAddressWithAddressId: SET_BILLING_ADDRESS_WITH_ADDRESS_ID,
        selectedAddressCallBack
    });

    const {
        activeAddress,
        customerAddresses,
        errorMessage,
        handleAddAddress,
        handleApplyAddress,
        handleCancel,
        handleEditAddress,
        handleSelectAddress,
        isLoading,
        selectedAddress
    } = talonProps;
    const classes = mergeClasses(defaultClasses, propClasses);

    const [, { addToast }] = useToasts();

    useEffect(() => {
        if (errorMessage) {
            addToast({
                type: 'error',
                icon: errorIcon,
                message: errorMessage,
                dismissable: true,
                timeout: 10000
            });
        }
    }, [addToast, errorMessage]);

    const rootClass =
        activeContent === 'addressBook' ? classes.root_active : classes.root;

    const addAddressButton = (
        <LinkButton
            className={classes.addButton}
            key="addAddressButton"
            onClick={handleAddAddress}
        >
            <Icon
                size={24}
                src={PlusSquare}
                classes={{ icon: classes.addIcon }}
            />
            <span className={classes.addText}>{'Add New Address'}</span>
        </LinkButton>
    );

    const addressElements = useMemo(() => {
        let defaultIndex;
        const addresses = customerAddresses.map((address, index) => {
            const isSelected = selectedAddress === address.id;

            if (address.default_shipping) {
                defaultIndex = index;
            }

            return (
                <AddressCard
                    address={address}
                    isSelected={isSelected}
                    key={address.id}
                    onSelection={handleSelectAddress}
                    onEdit={handleEditAddress}
                />
            );
        });

        // Position the default address first in the elements list
        if (defaultIndex) {
            [addresses[0], addresses[defaultIndex]] = [
                addresses[defaultIndex],
                addresses[0]
            ];
        }

        return [...addresses, addAddressButton];
    }, [
        addAddressButton,
        customerAddresses,
        handleEditAddress,
        handleSelectAddress,
        selectedAddress
    ]);

    return (
        <Fragment>
            <div className={rootClass}>
                <h1 className={classes.headerText}>
                    Change Shipping Information
                </h1>
                <div className={classes.buttonContainer}>
                    <Button
                        disabled={isLoading}
                        onClick={handleCancel}
                        priority="low"
                    >
                        {'Cancel'}
                    </Button>
                    <Button
                        disabled={isLoading}
                        onClick={handleApplyAddress}
                        priority="high"
                    >
                        {'Apply'}
                    </Button>
                </div>

                <div className={classes.content}>{addressElements}</div>
            </div>
            <EditModal shippingData={activeAddress} />
        </Fragment>
    );
};

export default AddressBook;

AddressBook.propTypes = {
    activeContent: string.isRequired,
    classes: shape({
        root: string,
        root_active: string,
        headerText: string,
        buttonContainer: string,
        content: string,
        addButton: string,
        addIcon: string,
        addText: string
    }),
    toggleActiveContent: func.isRequired,
    selectedAddressCallBack: func
};
