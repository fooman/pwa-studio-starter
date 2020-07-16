import TextInput from "@magento/venia-ui/lib/components/TextInput";
import Field from "@magento/venia-ui/lib/components/Field";
import React from "react";

export const ProductOptionText = props => {
    const { handleTextChange, fieldValue  } = props
    return <Field id="options">
        <TextInput
            field="options"
            onValueChange={handleTextChange}
            validate={fieldValue.required}
        />
    </Field>
}
