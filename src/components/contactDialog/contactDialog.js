import React from 'react';
import Dialog from '@magento/venia-ui/lib/components/Dialog';
import ContactForm from '../ContactForm/contactForm';
import { useContactDialog } from './useContactDialog';
import {
    sendSupportMessage
} from './contactSupport.graphql';
import {shape, string} from "prop-types";
import defaultClasses from './contactDialog.css'
import {mergeClasses} from "@magento/venia-ui/lib/classify";
import FormError from "@magento/venia-ui/lib/components/FormError";

const ContactDialog = (prop) => {
    const { onContactSupportClicked, closeContactDialogHandler } = prop;

    const talonProps = useContactDialog({
        sendSupportMessage,
        onContactSupportClicked,
        closeContactDialogHandler
    });

    const {
        isOpen,
        closeDialog,
        handleSubmit,
        isSignedIn,
        currentUser,
        errors
    } = talonProps;

    let initialValues = {};

    isSignedIn? initialValues = {...initialValues,
            name: `${currentUser.firstname} ${currentUser.lastname}`,
            email: currentUser.email
        } :
        initialValues = {...initialValues, name: '', email: '' , message: ''};
    let formProps = { initialValues }

    const classes = mergeClasses(defaultClasses);

    const dialogComponent = (
        <Dialog
            title={'Contact Form'}
            formProps={formProps}
            isOpen={ isOpen }
            onConfirm={handleSubmit}
            onCancel={closeDialog}
            confirmText = {'Make Contact'}
        >
            <FormError errors={Array.from(errors.values())} />
            <ContactForm></ContactForm>
        </Dialog>
    );

    return (
        <div className={classes.wrapContactForm}>
            <div>
                {dialogComponent}
            </div>
        </div>
    );
};

ContactDialog.propTypes = {
    classes: shape({
        formRoot: string,
        wrapContactForm: string,
        name: string,
        email: string,
        message: string
    })
}


export default ContactDialog;
