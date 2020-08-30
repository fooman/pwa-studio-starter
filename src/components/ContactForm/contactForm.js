import React from "react";
import Field from "@magento/venia-ui/lib/components/Field";
import TextInput from "@magento/venia-ui/lib/components/TextInput";
import {isRequired} from "@magento/venia-ui/lib/util/formValidators";
import TextArea from "@magento/venia-ui/lib/components/TextArea";
import {shape, string} from "prop-types";
import defaultClasses from './contactForm.css'
import {mergeClasses} from "@magento/venia-ui/lib/classify";

const ContactForm = () => {

    const classes = mergeClasses(defaultClasses);

    return (
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
    );
}

ContactForm.propTypes = {
    classes: shape({
        formRoot: string,
        name: string,
        email: string,
        message: string
    })
}

export default ContactForm;
