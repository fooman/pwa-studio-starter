import React from 'react';
import { node, shape, string } from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/pro-light-svg-icons';

import { mergeClasses } from '@magento/venia-ui/lib/classify';
import defaultClasses from '@magento/venia-ui/lib/components/Header/navTrigger.css';
import { useNavigationTrigger } from '@magento/peregrine/lib/talons/Header/useNavigationTrigger';

/**
 * A component that toggles the navigation menu.
 */
const NavigationTrigger = props => {
    const { handleOpenNavigation } = useNavigationTrigger();

    const classes = mergeClasses(defaultClasses, props.classes);
    return (
        <button
            className={classes.root}
            aria-label="Toggle navigation panel"
            onClick={handleOpenNavigation}
        >
            <FontAwesomeIcon icon={faBars} color='black' size='lg'/>
        </button>
    );
};

NavigationTrigger.propTypes = {
    children: node,
    classes: shape({
        root: string
    })
};

export default NavigationTrigger;
