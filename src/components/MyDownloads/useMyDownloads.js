import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useLazyQuery } from '@apollo/react-hooks';

import { useUserContext } from '@magento/peregrine/lib/context/user';

export const useMyDownloads = prop => {

    const {useCustomerDownloadableProductQuery} = prop;
    const history = useHistory();
    const [{ isSignedIn }] = useUserContext();

    const [
        customerDownloadableProductQuery,
        { loading: isDownloadableLoading, data: customerDownloadableProduct, error }
    ] = useLazyQuery(useCustomerDownloadableProductQuery, { fetchPolicy: 'network-only', skip: !isSignedIn });

    // If the user is no longer signed in, redirect to the home page.
    useEffect(() => {
        if (!isSignedIn) {
            history.push('/');
        }
        customerDownloadableProductQuery();
    }, [history, isSignedIn]);

    return {
        data: customerDownloadableProduct,
        isLoading: isDownloadableLoading,
        error
    };
}
