import React from 'react';
import { func, shape, string } from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { Link } from '@magento/venia-drivers';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import { useAccountMenuItems } from '@magento/peregrine/lib/talons/AccountMenu/useAccountMenuItems';

import defaultClasses from '@magento/venia-ui/lib/components/AccountMenu/accountMenuItems.css';

const MENU_ITEMS = [
    { name: 'Order History', url: '/order-history' },
    { name: 'Store Credit & Gift Cards', url: '' },
    { name: 'Favorites Lists', url: '/wishlist' },
    { name: 'Address Book', url: '/address-book' },
    { name: 'Saved Payments', url: '' },
    { name: 'Communications', url: '/communications' },
    { name: 'Account Information', url: '' },
    { name: 'My Downloads', url: '/my-downloads' },
    { name: 'My Subscriptions', url: '/my-subscriptions' },
    { name: 'My Extensions', url: '/my-extensions' },
    { name: 'Serial Numbers', url: '/serial-numbers' }
];

const AccountMenuItems = props => {
    const { onSignOut } = props;

    const talonProps = useAccountMenuItems({ onSignOut });
    const { handleSignOut, menuItems } = talonProps;

    const classes = mergeClasses(defaultClasses, props.classes);

    const menu = menuItems.map(item => {
        return (
            <Link className={classes.link} key={item.name} to={item.url}>
                <FormattedMessage id={item.id} />
            </Link>
        );
    });

    return (
        <div className={classes.root}>
            {menu}
            <button
                className={classes.signOut}
                onClick={handleSignOut}
                type="button"
            >
                <FormattedMessage id={`Sign Out`} />
            </button>
        </div>
    );
};

export default AccountMenuItems;

AccountMenuItems.propTypes = {
    classes: shape({
        link: string,
        signOut: string
    }),
    onSignOut: func
};
