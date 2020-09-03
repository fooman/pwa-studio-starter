import {useCallback, useMemo, useState} from 'react';
import { useMutation } from '@apollo/client';
import {useUserContext} from "@magento/peregrine/lib/context/user";

export const useContactDialog = prop => {

    const { sendSupportMessage, onContactSupportClicked, closeContactDialogHandler } = prop;

    const [{ currentUser, isSignedIn }] = useUserContext();

    const [ isOpen, setIsOpen ] = useState(false);

    const [
        supportMessageMutation,
        {
            data: sendSupportMessageData,
            loading: sendMessageLoading,
            error: supportMessageError
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

    const errors = useMemo(
        () =>
            new Map([
                ['supportMessageMutation', supportMessageError ]
            ]),
        [ supportMessageError ]
    );

    return {
        isOpen,
        closeDialog,
        handleSubmit,
        isSignedIn,
        currentUser,
        errors
    };
}
