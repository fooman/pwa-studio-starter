import React from 'react';
import { shape, string } from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/pro-light-svg-icons';
import { FormattedMessage, useIntl } from 'react-intl';

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
    const { formatMessage } = useIntl();

    return (
        <button
            className={searchClass}
            aria-label={formatMessage({ id: 'Search' })}
            onClick={handleClick}
        >
            <FontAwesomeIcon icon={faSearch} color='black' size='lg'/>
            <span className={classes.label}>
                <FormattedMessage id={'Search'} />
            </span>
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
