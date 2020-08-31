import { gql } from '@apollo/client';

import { SET_CUSTOMER_ADDRESS_ON_CART } from '@magento/venia-ui/lib/components/CheckoutPage/ShippingInformation/shippingInformation.gql';
import { CustomerAddressFragment } from '../../../../../queries/customerCheckoutAddressFragment.gql';
import { ShippingInformationFragment } from '@magento/venia-ui/lib/components/CheckoutPage/ShippingInformation/shippingInformationFragments.gql';

export const GET_CUSTOMER_ADDRESSES = gql`
    query GetCustomerAddresses {
        customer {
            id
            email
            addresses {
                id
                ...CustomerAddressFragment
            }
        }
    }
    ${CustomerAddressFragment}
`;

export const GET_CUSTOMER_CART_ADDRESS = gql`
    query GetCustomerCartAddress {
        customerCart {
            id
            ...ShippingInformationFragment
        }
    }
    ${ShippingInformationFragment}
`;

export default {
    mutations: {
        setCustomerAddressOnCartMutation: SET_CUSTOMER_ADDRESS_ON_CART
    },
    queries: {
        getCustomerAddressesQuery: GET_CUSTOMER_ADDRESSES,
        getCustomerCartAddressQuery: GET_CUSTOMER_CART_ADDRESS
    }
};
