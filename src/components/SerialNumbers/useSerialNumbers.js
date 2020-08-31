import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import {useUserContext} from "@magento/peregrine/lib/context/user";

export const useSerialNumbers = prop => {

    const { useSerialNumbersQuery } = prop;
    const history = useHistory();
    const [{ isSignedIn }] = useUserContext();

    const [
        serialNumbersQuery,
        { loading: isSerialNumbersLoading, data: serialNumbers, error }
    ] = useLazyQuery(useSerialNumbersQuery, { fetchPolicy: 'network-only', skip: !isSignedIn });

    // If the user is no longer signed in, redirect to the home page.
    useEffect(() => {
        if (!isSignedIn) {
            history.push('/');
        }
        serialNumbersQuery();
    }, [history, isSignedIn]);

    return {
        data: serialNumbers,
        isLoading: isSerialNumbersLoading,
        error
    };
}
