import React from 'react';
import { array, func } from 'prop-types';

import Option from './option';
import { useOptions } from '@magento/peregrine/lib/talons/ProductOptions/useOptions';

const Options = props => {
    const { classes, onSelectionChange, options, selectedValues = [], price, fieldErrorObj } = props;
    const talonProps = useOptions({
        onSelectionChange,
        selectedValues
    });
    const { handleSelectionChange, selectedValueMap } = talonProps;
    // Render a list of options passing in any pre-selected values.
    return options.map(option => (
        <Option
            {...option}
            classes={classes}
            price={price}
            key={option.option_id}
            onSelectionChange={handleSelectionChange}
            selectedValue={selectedValueMap.get(option.title)}
            fieldErrorObj={fieldErrorObj}
        />
    ));
};

Options.propTypes = {
    onSelectionChange: func,
    options: array.isRequired,
    selectedValues: array
};

export default Options;
