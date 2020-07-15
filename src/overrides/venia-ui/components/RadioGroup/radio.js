import React, { Component } from 'react';
import { node, shape, string } from 'prop-types';
import { Radio } from 'informed';

import classify from '@magento/venia-ui/lib/classify';
import defaultClasses from './radio.css';
import { Price } from "@magento/peregrine";

/* TODO: change lint config to use `label-has-associated-control` */
/* eslint-disable jsx-a11y/label-has-for */

export class RadioOption extends Component {
    static propTypes = {
        classes: shape({
            input: string,
            label: string,
            root: string
        }),
        label: node.isRequired,
        value: node.isRequired
    };
    render() {
        const { props } = this;
        const { classes, id, title, value, ...rest } = props;
        return (
            <label className={classes.root} htmlFor={id}>
                <Radio
                    {...rest}
                    className={classes.input}
                    id={id}
                    value={value}
                />
                <span className={classes.label}>
                    <span>{title || (value != null ? value : '')}</span>
                    {title !== 'None' &&
                        <span><span>&nbsp;+&nbsp;</span>
                        <span className={classes.label}><Price currencyCode={"USD"} value={rest.price}/></span>
                        </span>}
                </span>
            </label>
        );
    }
}

/* eslint-enable jsx-a11y/label-has-for */

export default classify(defaultClasses)(RadioOption);
