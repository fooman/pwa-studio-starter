import React from 'react';
import { shape, string } from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/pro-light-svg-icons';

import { mergeClasses } from '@magento/venia-ui/lib/classify';
import defaultClasses from '@magento/venia-ui/lib/components/Header/searchTrigger.css';
import { useSearchTrigger } from '@magento/peregrine/lib/talons/Header/useSearchTrigger';

const SearchTrigger = props => {
    const { active, onClick } = props;
    const talonProps = useSearchTrigger({
        onClick
    });
    const { handleClick } = talonProps;
    const classes = mergeClasses(defaultClasses, props.classes);
    const searchClass = active ? classes.open : classes.root;

    return (
        <button
            className={searchClass}
            aria-label={'Search'}
            onClick={handleClick}
        >
            <FontAwesomeIcon icon={faSearch} color='black' size='lg'/>
            <span className={classes.label}>{'Search'}</span>
        </button>
    );
};

SearchTrigger.propTypes = {
    classes: shape({
        root: string,
        open: string
    })
};

export default SearchTrigger;
