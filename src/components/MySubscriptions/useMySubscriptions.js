import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { useUserContext } from '@magento/peregrine/lib/context/user';

export const useMySubscriptions = prop => {

    const { useCustomerSubscriptionsQuery } = prop;
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
        data: customerSubscriptions,
        error
    } = useQuery(useCustomerSubscriptionsQuery, { skip: !isSignedIn });

    return {
        data: customerSubscriptions,
        isLoading: isDownloadableLoading,
        error
    };

}
