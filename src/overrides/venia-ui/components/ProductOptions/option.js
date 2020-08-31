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
import { ProductOptionsRadio } from "../../../../components/ProductOptions/productOptionsRadio";
import { ProductOptionText } from "../../../../components/ProductOptions/productOptionText";


// TODO: get an explicit field from the API
// that identifies an attribute as a swatch

const Option = props => {
    const {
        option_id,
        title,
        onSelectionChange,
        selectedValue,
        fieldErrorObj
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
        values && values.length && [...values].unshift({
            option_type_id: 0,
            price: 'none',
            title: 'None'
        })
    }, [values])

    const ValueList = props.__typename === 'CustomizableFieldOption' ?
        <ProductOptionText
            {...props}
            classes={defaultClasses}
            handleTextChange={handleTextChange}
        />
         : props.__typename === 'CustomizableMultipleOption' ? null :
            <ProductOptionsRadio
                {...props}
                classes={ {
                    ...defaultClasses,
                    root: defaultClasses.radioRoot
                }}
                initialSelection={initialSelection}
                handleSelectionChange={handleSelectionChange}
            />
    const classes = mergeClasses(defaultClasses, props.classes);
    return (
        <div className={classes.root}>
            {ValueList}
        </div>
    );
};

Option.propTypes = {
    attribute_code: string,
    attribute_id: string,
    classes: shape({
        root: string,
        title: string
    }),
    label: string,
    onSelectionChange: func,
    selectedValue: oneOfType([number, string]),
    values: arrayOf(object)
};

export default Option;
