import React from 'react';
import TextInput from "@magento/venia-ui/lib/components/TextInput";
import Dialog from '@magento/venia-ui/lib/components/Dialog';
import Field from "@magento/venia-ui/lib/components/Field";
import {isRequired} from "@magento/venia-ui/lib/util/formValidators";
import TextArea from "@magento/venia-ui/lib/components/TextArea";
import { useContact } from './useContact';
import {
    sendSupportMessage
} from '../../queries/submitContactUsMutation.graphql';
import {shape, string} from "prop-types";
import defaultClasses from './contact.css'
import {mergeClasses} from "@magento/venia-ui/lib/classify";

const ContactPage = props => {

    const talonProps = useContact({
        sendSupportMessage
    });

    const {
        isOpen,
        closeDialog,
        handleSubmit,
        isSignedIn,
        sendMessageLoading,
        sendSupportMessageData,
        currentUser
    } = talonProps;

    let initialValues = { name: '', email: '' };

    isSignedIn? initialValues = {
        name: `${currentUser.firstname} ${currentUser.lastname}`,
        email: currentUser.email
    } :
        null;
    let formProps = { initialValues }
    const classes = mergeClasses(defaultClasses);

    const dialogComponent = (
        <Dialog
            title={'Contact Form'}
            formProps={formProps}
            isOpen={isOpen}
            onConfirm={handleSubmit}
            onCancel={closeDialog}
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
        <div>
            {dialogComponent}
        </div>
    );
};

ContactPage.propTypes = {
    classes: shape({
        formRoot: string,
        name: string,
        email: string,
        message: string
    })
}


export default ContactPage;
