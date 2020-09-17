import React from 'react';
import { func, shape, string } from 'prop-types';
import { useRegion } from '@magento/peregrine/lib/talons/Region/useRegion';

import { mergeClasses } from '@magento/venia-ui/lib/classify';
import Field from '@magento/venia-ui/lib/components/Field';
import Select from '@magento/venia-ui/lib/components/Select';
import TextInput from '@magento/venia-ui/lib/components/TextInput';
import defaultClasses from '@magento/venia-ui/lib/components/Region/region.css';
import { GET_REGIONS_QUERY } from '@magento/venia-ui/lib/components/Region/region.gql';

/**
 * Form component for Region that is seeded with backend data.
 *
 * @param {string} props.optionValueKey - Key to use for returned option values. In a future release, this will be removed and hard-coded to use "id" once GraphQL has resolved MC-30886.
 */
const Region= props => {
    const {
        classes: propClasses,
        fieldInput,
        fieldSelect,
        label,
        optionValueKey,
        ...inputProps
    } = props;

    const talonProps = useRegion({
        fieldInput,
        fieldSelect,
        optionValueKey,
        queries: { getRegionsQuery: GET_REGIONS_QUERY }
    });
    const { loading, regions } = talonProps;

    const classes = mergeClasses(defaultClasses, propClasses);
    const regionProps = {
        classes,
        disabled: loading,
        ...inputProps
    };
    const { validate, ...propsWithoutValidate } = regionProps;

    const regionField =
        regions.length || loading ? (
            <Select {...regionProps} field={fieldSelect} items={regions} />
        ) : (
            <TextInput {...propsWithoutValidate} field={fieldInput} optional={true} />
        );

    const fieldId = regions.length ? fieldSelect : fieldInput;

    return (
        <Field id={fieldId} label={label} classes={{ root: classes.root }}>
            {regionField}
        </Field>
    );
};

export default Region;

Region.defaultProps = {
    fieldInput: 'region',
    fieldSelect: 'region',
    label: 'State',
    optionValueKey: 'code'
};

Region.propTypes = {
    classes: shape({
        root: string
    }),
    fieldInput: string,
    fieldSelect: string,
    label: string,
    optionValueKey: string,
    validate: func,
    initialValue: string
};
