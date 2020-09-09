import { useCallback } from 'react';

/**
 * @param {Object}      props
 * @param {Function}    props.onSignOut - A function to call when sign out occurs.
 *
 * @returns {Object}    result
 * @returns {Function}  result.handleSignOut - The function to handle sign out actions.
 */
export const useAccountMenuItems = props => {
    const { onSignOut } = props;

    const handleSignOut = useCallback(() => {
        onSignOut();
    }, [onSignOut]);

    const MENU_ITEMS = [
        {
            name: 'Order History',
            id: 'accountMenu.orderHistoryLink',
            url: '/order-history'
        },
        {
            name: 'Store Credit & Gift Cards',
            id: 'accountMenu.storeCreditLink',
            url: ''
        },
        {
            name: 'Favorites Lists',
            id: 'accountMenu.favoritesListsLink',
            url: '/wishlist'
        },
        {
            name: 'Address Book',
            id: 'accountMenu.addressBookLink',
            url: '/address-book'
        },
        {
            name: 'Saved Payments',
            id: 'accountMenu.savedPaymentsLink',
            url: ''
        },
        {
            name: 'Communications',
            id: 'accountMenu.communicationsLink',
            url: '/communications'
        },
        {
            name: 'Account Information',
            id: 'accountMenu.accountInfoLink',
            url: ''
        },
        {
            name: 'My Downloads',
            id: 'accountMenu.accountInfoDownloads',
            url: '/my-downloads'
        },
        {
            name: 'My Subscriptions',
            id: 'accountMenu.accountInfoSubscriptions',
            url: '/my-subscriptions'
        },
        {
            name: 'My Extensions',
            id: 'accountMenu.accountInfoExtensions',
            url: '/my-extensions'
        },
        {
            name: 'My Serial Numbers',
            id: 'accountMenu.accountInfoSerialNumbers',
            url: '/my-serial-numbers'
        }
    ];

    return {
        handleSignOut,
        menuItems: MENU_ITEMS
    };
};
