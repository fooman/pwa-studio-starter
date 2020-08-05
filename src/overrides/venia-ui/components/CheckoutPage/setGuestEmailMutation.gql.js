import gql from 'graphql-tag';

export const SET_GUEST_EMAIL = gql`
    mutation setGuestEmailOnCart(
    $cartId: String!
    $email: String!
    ) {
        setGuestEmailOnCart(
            input: {
                cart_id: $cartId
                email: $email
            }
        ) @connection(key: "setGuestEmailOnCart") {
            cart {
                email
            }
        }
    }
`;
