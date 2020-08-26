import React from 'react';
import TextInput from "@magento/venia-ui/lib/components/TextInput";
import Dialog from '@magento/venia-ui/lib/components/Dialog';
import Field from "@magento/venia-ui/lib/components/Field";
import Button from "@magento/venia-ui/lib/components/Button";
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
        handleToOpenForm,
        handleSubmit,
        isSignedIn,
        sendMessageLoading,
        sendSupportMessageData,
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
            title={'Make contact'}
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
        <div className={classes.wrapContactForm}>
            <h1 className={classes.heading}>{'Contact Support'}</h1>
            <div className={classes.contactFormBtn}>
                <Button
                    priority="high"
                    onClick={handleToOpenForm}
                >
                    Contact Form
                </Button>
            </div>
            <div>
                {dialogComponent}
            </div>
        </div>
    );
};

ContactPage.propTypes = {
    classes: shape({
        formRoot: string,
        contactFormBtn: string,
        wrapContactForm: string,
        name: string,
        email: string,
        message: string
    })
}


export default ContactPage;
