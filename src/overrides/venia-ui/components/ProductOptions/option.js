import React, { useMemo } from 'react';
import {
    arrayOf,
    func,
    number,
    object,
    oneOfType,
    shape,
    string
} from 'prop-types';

import { mergeClasses } from '@magento/venia-ui/lib/classify';
import defaultClasses from './option.css';
import { useOption } from '../../../peregrine/talons/ProductOptions/useOption';
import RadioGroup from "@magento/venia-ui/lib/components/RadioGroup";
import TextInput from "@magento/venia-ui/lib/components/TextInput";

const getItemKey = ({ value_index }) => value_index;

// TODO: get an explicit field from the API
// that identifies an attribute as a swatch
const getListComponent = (props) => {

    return props.__typename === 'CustomizableFieldOption' ? TextInput : RadioGroup;
};

const Option = props => {
    const {
        option_id,
        title,
        onSelectionChange,
        selectedValue,

    } = props;
    let values = props.fieldValue ? props.fieldValue : props.radioValue
    const talonProps = useOption({
        option_id,
        title,
        onSelectionChange,
        selectedValue,
        values
    });

    const {
        handleSelectionChange,
        initialSelection,
        selectedValueLabel,
        selectedValueDescription
    } = talonProps;
    const ValueList = useMemo(() => getListComponent(props), [
        props
    ]);

    if(values.length && values[0].title !== 'None')
    values.unshift({
        title: 'None',
        option_type_id: 0,
        price: 0
    })

    const classes = mergeClasses(defaultClasses, props.classes);
    return (
        <div className={classes.root}>
            <h3 className={classes.title}>
                <span>{title}</span>
            </h3>
            <ValueList
                getItemKey={getItemKey}
                selectedValue={initialSelection}
                items={values}
                disabled={true}
                field="email"
                classes={ {
                    root: classes.radioRoot
                }}
                fieldState={ {value: 'value' }}
                onSelectionChange={handleSelectionChange}
            />
        </div>
    );
};

Option.propTypes = {
    attribute_code: string.isRequired,
    attribute_id: string,
    classes: shape({
        root: string,
        title: string
    }),
    label: string.isRequired,
    onSelectionChange: func,
    selectedValue: oneOfType([number, string]),
    values: arrayOf(object).isRequired
};

export default Option;
