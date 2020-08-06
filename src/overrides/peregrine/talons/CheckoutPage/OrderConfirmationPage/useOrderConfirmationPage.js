import { useUserContext } from '@magento/peregrine/lib/context/user';

export const flatten = data => {
    const { cart } = data;
    const { billing_address } = cart;

    return {
        city: billing_address.city,
        country: billing_address.country.label,
        email: cart.email,
        firstname: billing_address.firstname,
        lastname: billing_address.lastname,
        postcode: billing_address.postcode,
        region: billing_address.region.label,
        street: billing_address.street,
        totalItemQuantity: cart.total_quantity
    };
};

export const useOrderConfirmationPage = props => {
    const { data } = props;
    const [{ isSignedIn }] = useUserContext();

    return {
        flatData: flatten(data),
        isSignedIn
    };
};
