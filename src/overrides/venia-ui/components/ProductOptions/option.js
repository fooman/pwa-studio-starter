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

const getItemKey = ({ value_index }) => value_index;

// TODO: get an explicit field from the API
// that identifies an attribute as a swatch
const getListComponent = (props) => {
    const optionType = props.__typename === 'CustomizableFieldOption' ? RadioGroup : RadioGroup;
    return optionType
};

const Option = props => {
    const {
        option_id,
        title,
        onSelectionChange,
        selectedValue,

    } = props;
    const values = props.fieldValue ? props.fieldValue : props.radioValue
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
                message={title}
                onSelectionChange={handleSelectionChange}
            />
            <dl className={classes.selection}>
                <dt className={classes.selectionLabel}>{selectedValueLabel}</dt>
                <dd>{selectedValueDescription}</dd>
            </dl>
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
