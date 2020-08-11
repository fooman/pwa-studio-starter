import React, { Fragment } from 'react';
import { func, shape, string } from 'prop-types';

import { useDropdown } from '@magento/peregrine/lib/hooks/useDropdown';

import { Link } from '@magento/venia-drivers';
import { mergeClasses } from '@magento/venia-ui/lib/classify';

import defaultClasses from '@magento/venia-ui/lib/components/AccountMenu/accountMenuItems.css';

const MENU_ITEMS = [
    { name: 'Order History', url: '' },
    { name: 'Store Credit & Gift Cards', url: '' },
    { name: 'Favorites Lists', url: '' },
    { name: 'Address Book', url: '' },
    { name: 'Saved Payments', url: '' },
    { name: 'Communications', url: '' },
    { name: 'Account Information', url: '' },
    { name: 'My Downloads', url: '/my-downloads' },
    { name: 'My Subscriptions', url: '/my-subscriptions' },
    { name: 'My Extensions', url: '/my-extensions' },
];

const AccountMenuItems = props => {
    const { handleSignOut } = props;

    const classes = mergeClasses(defaultClasses, props.classes);

    const {
        expanded: accountMenuIsOpen,
        setExpanded: setAccountMenuIsOpen
    } = useDropdown();

    const handleAccountMenu = () => {
        accountMenuIsOpen(false);
    }

    const menuItems = MENU_ITEMS.map(item => {
        return (
            <Link className={classes.link} to={item.url} key={item.name} onClick={() => handleAccountMenu()}>
                {item.name}
            </Link>
        );
    });

    return (
        <Fragment>
            {menuItems}
            <button
                className={classes.signOut}
                onClick={handleSignOut}
                type="button"
            >{`Sign Out`}</button>
        </Fragment>
    );
};

export default AccountMenuItems;

AccountMenuItems.propTypes = {
    classes: shape({
        link: string,
        signOut: string
    }),
    handleSignOut: func
};
