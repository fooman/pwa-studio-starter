import React from 'react';
import { func } from 'prop-types';
import { useSearchField } from '@magento/peregrine/lib/talons/SearchBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch ,faTimes } from '@fortawesome/pro-light-svg-icons';
import TextInput from '@magento/venia-ui/lib/components/TextInput';
import Trigger from '@magento/venia-ui/lib/components/Trigger';

const clearIcon = <FontAwesomeIcon icon={faTimes} color='black' size='lg'/>;
const searchIcon =  <FontAwesomeIcon icon={faSearch} color='black' size='lg'/>;

const SearchField = props => {
    const { onChange, onFocus } = props;
    const { inputRef, resetForm, value } = useSearchField();

    const resetButton = value ? (
        <Trigger action={resetForm}>{clearIcon}</Trigger>
    ) : null;

    return (
        <TextInput
            after={resetButton}
            before={searchIcon}
            field="search_query"
            onFocus={onFocus}
            onValueChange={onChange}
            forwardedRef={inputRef}
        />
    );
};

export default SearchField;

SearchField.propTypes = {
    onChange: func,
    onFocus: func
};
