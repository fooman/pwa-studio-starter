import {useCallback, useState} from 'react';
import { useMutation } from '@apollo/react-hooks';
import {useUserContext} from "@magento/peregrine/lib/context/user";

export const useContactDialog = prop => {

    const { sendSupportMessage, onContactSupportClicked, closeContactDialogHandler } = prop;

    const [{ currentUser, isSignedIn }] = useUserContext();

    const [ isOpen, setIsOpen ] = useState(false);

    const [
        supportMessageMutation,
        {
            data: sendSupportMessageData,
            loading: sendMessageLoading
        }
    ] = useMutation( sendSupportMessage );

    onContactSupportClicked? !isOpen? setIsOpen(true) : null : null;

    const closeDialog = useCallback(() => {
        setIsOpen(false);
        closeContactDialogHandler();
    }, []);

    const handleSubmit = useCallback(
        async formValues => {
            try {
                const { name, email, message } = formValues;

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
        currentUser
    };
}
