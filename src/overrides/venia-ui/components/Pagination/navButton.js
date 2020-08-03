import React from 'react';
import { shape, string } from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faForward, faBackward, faChevronRight, faChevronLeft } from '@fortawesome/pro-light-svg-icons'

import { mergeClasses } from '@magento/venia-ui/lib/classify';
import defaultClasses from '@magento/venia-ui/lib/components/Pagination/navButton.css';

const icons = new Map()
    .set('ChevronLeft', faChevronLeft)
    .set('ChevronRight', faChevronRight)
    .set('FastForward', faForward)
    .set('Rewind', faBackward);

const NavButton = props => {
    const { active, buttonLabel, name, onClick } = props;
    const iconSrc = icons.get(name);
    const classes = mergeClasses(defaultClasses, props.classes);

    const iconClass = active ? classes.icon : classes.icon_disabled;

    return (
        <button
            aria-label={buttonLabel}
            className={classes.root}
            disabled={!active}
            onClick={onClick}
        >
            <FontAwesomeIcon icon={iconSrc} className={iconClass} size={'2x'}/>
        </button>
    );
};

export default NavButton;

NavButton.propTypes = {
    classes: shape({
        icon: string,
        icon_disabled: string,
        root: string
    })
};

NavButton.defaultProps = {
    buttonLabel: 'move to another page'
};
