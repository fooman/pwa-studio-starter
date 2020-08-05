import gql from 'graphql-tag';
import { ItemsReviewFragment } from '@magento/venia-ui/lib/components/CheckoutPage/ItemsReview/itemsReviewFragments.gql';

export const OrderConfirmationPageFragment = gql`
    fragment OrderConfirmationPageFragment on Cart {
        id
        email
        total_quantity
        is_virtual
        billing_address {
            firstname
            lastname
            street
            city
            region {
                label
            }
            postcode
            country {
                label
            }
        }
        ...ItemsReviewFragment
    }
    ${ItemsReviewFragment}
`;
