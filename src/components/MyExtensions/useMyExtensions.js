import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import { useUserContext } from '@magento/peregrine/lib/context/user';

export const useMyExtensions = prop => {

    const { useCustomerPurchasedExtensionsQuery } = prop;
    const history = useHistory();
    const [{ isSignedIn }] = useUserContext();

    // If the user is no longer signed in, redirect to the home page.
    useEffect(() => {
        if (!isSignedIn) {
            history.push('/');
        }
    }, [history, isSignedIn]);

    const {
        loading: isDownloadableLoading,
        data: customerPurchasedExtensions,
        error
    } = useQuery(useCustomerPurchasedExtensionsQuery, { skip: !isSignedIn });

    return {
        data: customerPurchasedExtensions,
        isLoading: isDownloadableLoading,
        error
    };

}
