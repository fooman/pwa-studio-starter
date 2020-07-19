import gql from 'graphql-tag';

import { CartTriggerFragment } from '@magento/venia-ui/lib/components/Header/cartTriggerFragments.gql';
import { MiniCartFragment } from '@magento/venia-ui/lib/components/MiniCart/miniCart.gql';

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
                cart_items: [
                    {
                        data: {
                            quantity: $quantity,
                            sku: $sku
                        },
                        customizable_options: $customizableOptions
                    }
                ]
            }
        ) @connection(key: "addDownloadableProductsToCart") {
            cart {
                id
                # Update the cart trigger when adding an item.
                ...CartTriggerFragment
                # Update the mini cart when adding an item.
                ...MiniCartFragment
            }
        }
    }
    ${CartTriggerFragment}
    ${MiniCartFragment}
`;
