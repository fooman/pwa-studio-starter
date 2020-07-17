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
import { Form } from 'informed';
import defaultClasses from './option.css';
import { useOption } from '../../../peregrine/talons/ProductOptions/useOption';
import { ProductOptionsRadio } from "./productOptionsRadio";
import {ProductOptionText} from "./productOptionText";


// TODO: get an explicit field from the API
// that identifies an attribute as a swatch

const Option = props => {
    const {
        option_id,
        title,
        onSelectionChange,
        selectedValue
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
        handleTextChange,
        initialSelection,
    } = talonProps;

    useMemo(() => {
        values.length && values.unshift({
            option_type_id: 0,
            price: 'none',
            title: 'None'
        })
    }, [values])

    const ValueList = props.__typename === 'CustomizableFieldOption' ?
        <ProductOptionText
            {...props}
            handleTextChange={handleTextChange}/>
         :
            <Form>
            <ProductOptionsRadio
                {...props}
                classes={ {
                    root: defaultClasses.radioRoot
                }}
                initialSelection={initialSelection}
                handleSelectionChange={handleSelectionChange}
            />
            </Form>
    const classes = mergeClasses(defaultClasses, props.classes);
    return (
        <div className={classes.root}>
            <h3 className={classes.title}>
                <span>{title}</span>
            </h3>
            {ValueList}
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
