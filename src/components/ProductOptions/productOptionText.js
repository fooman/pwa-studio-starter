import TextInput from "@magento/venia-ui/lib/components/TextInput";
import Field from "@magento/venia-ui/lib/components/Field";
import React from "react";

export const ProductOptionText = props => {
    const { handleTextChange, fieldValue, title, classes, option_id, fieldErrorObj  } = props
    return <Field id="options" label={title} classes={{label: classes.textLabel }}>
        <TextInput
            field="options"
            onValueChange={handleTextChange}
            validate={fieldValue}
        />
        {fieldErrorObj[option_id] ? (<span style={{color: "red" , paddingTop: '0.625rem'}}>{fieldErrorObj[option_id]}</span>) : false}
    </Field>
}
