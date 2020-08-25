import {useCallback, useState} from 'react';
import { useMutation } from '@apollo/react-hooks';
import {useUserContext} from "@magento/peregrine/lib/context/user";


export const useContact = prop => {

    const { sendSupportMessage } = prop;

    const [{ currentUser, isSignedIn }] = useUserContext();

    const [ isOpen, setIsOpen] = useState(true);

    const [
        supportMessageMutation,
        {
            data: sendSupportMessageData,
            loading: sendMessageLoading
        }
    ] = useMutation( sendSupportMessage );


    const closeDialog = useCallback(() => {
        setIsOpen(false);
    }, []);

    const handleSubmit = useCallback(
        async formValues => {
            try {
                const { name, message, email } = formValues;

                await supportMessageMutation({
                    variables: {
                        name: name,
                        message: message,
                        email: email
                    }
                });
            } catch(e) {
                return;
            }
            closeDialog();
        },
        []);

    return {
        isOpen,
        closeDialog,
        handleSubmit,
        isSignedIn,
        sendMessageLoading,
        sendSupportMessageData,
        currentUser
    };
}
