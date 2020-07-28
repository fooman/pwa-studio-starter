import TextInput from "@magento/venia-ui/lib/components/TextInput";
import Field from "@magento/venia-ui/lib/components/Field";
import React from "react";
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import defaultClasses from './productOptionText.css';
import {shape, string} from "prop-types";

export const ProductOptionText = props => {
    const cssClasses = mergeClasses(defaultClasses);
    const { handleTextChange, fieldValue, title, classes, option_id, fieldErrorObj  } = props
    return <Field id="options" label={title} classes={{label: classes.textLabel }}>
        <TextInput
            field="options"
            onValueChange={handleTextChange}
            validate={fieldValue}
        />
        {fieldErrorObj[option_id] ? (<span className={cssClasses.spanSection}>{fieldErrorObj[option_id]}</span>) : false}
    </Field>
}

ProductOptionText.propTypes = {
    cssClasses: shape({
        spanSection: string
    })
};
