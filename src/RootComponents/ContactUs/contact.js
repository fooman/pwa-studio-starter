import React, { Fragment } from 'react';
import { Form } from 'informed';
import Button from "@magento/venia-ui/lib/components/Button";
import {
    submitContactUsMutation
} from '../../queries/submitContactUsMutation.graphql';

import { useContact } from './useContact';
import ContactForm from "../../components/ContactForm/contactForm";
import {mergeClasses} from "@magento/venia-ui/lib/classify";
import defaultClasses from "./contact.css";
import {shape, string} from "prop-types";


const ContactPage = props => {

    const talonProps = useContact({
        submitContactUsMutation
    });

    const {
        handleSubmit
    } = talonProps;

    const classes = mergeClasses(defaultClasses);

    return (
        <Fragment>
            <Form className={classes.contactRoot}
                  onSubmit={handleSubmit}
            >
                <ContactForm></ContactForm>
                <div className={classes.actions}>
                    <Button
                        priority="high"
                        type='submit'
                    >
                        Submit
                    </Button>
                </div>
            </Form>
        </Fragment>
    );
};

ContactPage.propTypes = {
    classes: shape({
        contactRoot: string,
        actions: string
    })
}

export default ContactPage;
