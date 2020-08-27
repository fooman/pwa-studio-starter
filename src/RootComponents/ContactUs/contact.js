import React, { Fragment } from 'react';
import { Form } from 'informed';
import TextInput from "@magento/venia-ui/lib/components/TextInput";
import Button from "@magento/venia-ui/lib/components/Button";
import Field from "@magento/venia-ui/lib/components/Field";
import {isRequired} from "@magento/venia-ui/lib/util/formValidators";
import TextArea from "@magento/venia-ui/lib/components/TextArea";
import { useMutation } from '@apollo/react-hooks';
import {
    submitContactUsMutation
} from '../../queries/submitContactUsMutation.graphql';


const ContactPage = props => {
    const [handleSubmit] = useMutation(
        submitContactUsMutation
    );
    return (
        <Fragment>
            <Form>
                <Field label="Name">
                    <TextInput
                        id='name'
                        field="lastname"
                        validate={isRequired}
                    />
                </Field>
                <Field label="Email">
                    <TextInput
                        id='email'
                        field="lastname"
                        validate={isRequired}
                    />
                </Field>
                <Field label="Message">
                    <TextArea
                        id="message"
                        field="message"
                        placeholder="Enter your message here"
                        validate={isRequired}
                    />
                </Field>
                <Button
                    priority="high"
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
            </Form>
        </Fragment>
    );
};


export default ContactPage;
