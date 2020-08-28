import React from 'react';
import TextInput from "@magento/venia-ui/lib/components/TextInput";
import Dialog from '@magento/venia-ui/lib/components/Dialog';
import Field from "@magento/venia-ui/lib/components/Field";
import {isRequired} from "@magento/venia-ui/lib/util/formValidators";
import TextArea from "@magento/venia-ui/lib/components/TextArea";
import { useContactDialog } from './useContactDialog';
import {
    sendSupportMessage
} from './contactSupport.graphql';
import {shape, string} from "prop-types";
import defaultClasses from './contactDialog.css'
import {mergeClasses} from "@magento/venia-ui/lib/classify";

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
        currentUser
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
            <div className={classes.formRoot}>
                <div className={classes.name}>
                    <Field id="name" label="Name">
                        <TextInput field="name" validate={isRequired} />
                    </Field>
                </div>

                <div className={classes.email}>
                    <Field id="email" label="Email">
                        <TextInput field="email" validate={isRequired} />
                    </Field>
                </div>

                <div className={classes.message}>
                    <Field id="message" label="Message">
                        <TextArea field="message" validate={isRequired} />
                    </Field>
                </div>

            </div>
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
