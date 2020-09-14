import React from 'react';
import { shape, string } from 'prop-types';

import { mergeClasses } from '@magento/venia-ui/lib/classify';
import defaultClasses from '@magento/venia-ui/lib/components/Field/fieldIcons.css';
import LinkButton from "@magento/venia-ui/lib/components/LinkButton";

const FieldIcons = props => {
    const { after, before, children } = props;

    const classes = mergeClasses(defaultClasses, props.classes);

    const style = {
        '--iconsBefore': before ? 1 : 0,
        '--iconsAfter': after ? 1 : 0
    };

    return (
        <span className={classes.root} style={style}>
            <span className={classes.input}>{children}</span>
            <span className={classes.before}><LinkButton>{before}</LinkButton></span>
            <span className={classes.after}><LinkButton>{after}</LinkButton></span>
        </span>
    );
};

FieldIcons.propTypes = {
    classes: shape({
        after: string,
        before: string,
        root: string
    })
};

export default FieldIcons;
