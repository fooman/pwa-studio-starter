import {useCallback, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import {useUserContext} from "@magento/peregrine/lib/context/user";

export const useContact = prop => {

    const { submitContactUsMutation } = prop;

    const history = useHistory();

    const [{ isSignedIn }] = useUserContext();

    const [
        callSubmitContactUsMutation,
        {
            data: contactUsRespData,
            loading: contactUsLoading
        }
    ] = useMutation( submitContactUsMutation );

    useEffect(() => {
        if (isSignedIn) {
            history.push('/');
        }
    }, [history, isSignedIn]);

    const handleSubmit = useCallback(
        async formValues => {
            try {
                const { name, email, message } = formValues;
                await callSubmitContactUsMutation({
                    variables: {}
                });

            } catch(e) {
                return;
            }
        },
        []);

    return {
        handleSubmit,
        isSignedIn
    };
}
