import gql from 'graphql-tag';

import { CartPageFragment } from '@magento/venia-ui/lib/components/CartPage/cartPageFragments.gql';

export const ADD_DOWNLOADABLE_MUTATION = gql`
    mutation addDownloadableProductToCart(
        $cartId: String!
        $quantity: Float!
        $sku: String!
        $customizableOptions: [CustomizableOptionInput]
    ) {
        addDownloadableProductsToCart(
            input: {
                cart_id: $cartId
                cart_items: [{ data: { quantity: $quantity, sku: $sku },
                 customizable_options: $customizableOptions
                 }]
            }
        ) @connection(key: "addDownloadableProductsToCart") {
            cart {
                id
                ...CartPageFragment
            }
        }
    }
    ${CartPageFragment}
`;
