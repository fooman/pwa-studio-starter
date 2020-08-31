import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';

import { useUserContext } from '@magento/peregrine/lib/context/user';

export const useMyExtensions = prop => {

    const { useCustomerPurchasedExtensionsQuery } = prop;
    const history = useHistory();
    const [{ isSignedIn }] = useUserContext();

    const [
        customerPurchasedExtensionQuery,
        { loading: isDownloadableLoading, data: customerPurchasedExtensions, error }
    ] = useLazyQuery(useCustomerPurchasedExtensionsQuery, { fetchPolicy: 'network-only', skip: !isSignedIn });

    // If the user is no longer signed in, redirect to the home page.
    useEffect(() => {
        if (!isSignedIn) {
            history.push('/');
        }
        customerPurchasedExtensionQuery();
    }, [history, isSignedIn]);

    return {
        data: customerPurchasedExtensions,
        isLoading: isDownloadableLoading,
        error
    };

}
