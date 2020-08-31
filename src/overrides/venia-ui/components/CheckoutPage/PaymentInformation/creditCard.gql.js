import { gql } from '@apollo/client';

import { PriceSummaryFragment } from '@magento/venia-ui/lib/components/CartPage/PriceSummary/priceSummaryFragments';
import { AvailablePaymentMethodsFragment } from '@magento/venia-ui/lib/components/CheckoutPage/PaymentInformation/paymentInformation.gql';

// We disable linting for local fields because there is no way to add them to
// the fetched schema. Additionally, since we don't want to make a network call
// for "id" we disable "required-fields"
// https://github.com/apollographql/eslint-plugin-graphql/issues/99
/* eslint-disable graphql/template-strings */
export const GET_IS_BILLING_ADDRESS_SAME = gql`
    query getIsBillingAddressSame($cartId: String!) {
        cart(cart_id: $cartId) @client {
            id
            isBillingAddressSame
        }
    }
`;

export const GET_PAYMENT_NONCE = gql`
    query getPaymentNonce($cartId: String!) {
        cart(cart_id: $cartId) @client {
            id
            paymentNonce
        }
    }
`;
/* eslint-enable graphql/template-strings */

export const GET_BILLING_ADDRESS = gql`
    query getBillingAddress($cartId: String!) {
        cart(cart_id: $cartId) {
            id
            billingAddress: billing_address {
                firstName: firstname
                lastName: lastname
                country {
                    code
                }
                street
                city
                region {
                    code
                }
                postalCode: postcode
                phoneNumber: telephone
            }
        }
    }
`;

export const GET_SHIPPING_ADDRESS = gql`
    query getSelectedShippingAddress($cartId: String!) {
        cart(cart_id: $cartId) {
            id
            shippingAddresses: shipping_addresses {
                firstName: firstname
                lastName: lastname
                country {
                    code
                }
                street
                city
                region {
                    code
                }
                postalCode: postcode
                phoneNumber: telephone
            }
        }
    }
`;

export const SET_BILLING_ADDRESS = gql`
    mutation setBillingAddress(
        $cartId: String!
        $firstName: String!
        $lastName: String!
        $street1: String!
        $street2: String
        $city: String!
        $state: String!
        $postalCode: String!
        $country: String!
        $phoneNumber: String!
    ) {
        setBillingAddressOnCart(
            input: {
                cart_id: $cartId
                billing_address: {
                    address: {
                        firstname: $firstName
                        lastname: $lastName
                        street: [$street1, $street2]
                        city: $city
                        region: $state
                        postcode: $postalCode
                        country_code: $country
                        telephone: $phoneNumber
                        save_in_address_book: false
                    }
                }
            }
        ) {
            cart {
                id
                billing_address {
                    firstname
                    lastname
                    country {
                        code
                    }
                    street
                    city
                    region {
                        code
                    }
                    postcode
                    telephone
                }
                ...PriceSummaryFragment
                ...AvailablePaymentMethodsFragment
            }
        }
    }
    ${PriceSummaryFragment}
    ${AvailablePaymentMethodsFragment}
`;

export const SET_BILLING_ADDRESS_WITH_ADDRESS_ID = gql`
    mutation setBillingAddress(
        $cartId: String!
        $addressId: Int!
    ) {
        setBillingAddressOnCart(
            input: {
                cart_id: $cartId
                billing_address: {
                    customer_address_id: $addressId
                }
            }
        ) {
            cart {
                id
                billing_address {
                    firstname
                    lastname
                    country {
                        code
                    }
                    street
                    city
                    region {
                        code
                    }
                    postcode
                    telephone
                }
                ...PriceSummaryFragment
                ...AvailablePaymentMethodsFragment
            }
        }
    }
    ${PriceSummaryFragment}
    ${AvailablePaymentMethodsFragment}
`;

export const SET_CC_DETAILS_ON_CART = gql`
    mutation setSelectedPaymentMethod(
        $cartId: String!
        $paymentNonce: String!
    ) {
        setPaymentMethodOnCart(
            input: {
                cart_id: $cartId
                payment_method: {
                    code: "braintree"
                    braintree: {
                        payment_method_nonce: $paymentNonce
                        is_active_payment_token_enabler: false
                    }
                }
            }
        ) {
            cart {
                id
                selected_payment_method {
                    code
                    title
                }
            }
        }
    }
`;

export default {
    queries: {
        getBillingAddressQuery: GET_BILLING_ADDRESS,
        getIsBillingAddressSameQuery: GET_IS_BILLING_ADDRESS_SAME,
        getPaymentNonceQuery: GET_PAYMENT_NONCE,
        getShippingAddressQuery: GET_SHIPPING_ADDRESS
    },
    mutations: {
        setBillingAddressMutation: SET_BILLING_ADDRESS,
        setBillingAddressWithAddressId: SET_BILLING_ADDRESS_WITH_ADDRESS_ID,
        setCreditCardDetailsOnCartMutation: SET_CC_DETAILS_ON_CART
    }
};
