import React from "react";
import { mergeClasses } from '@magento/venia-ui/lib/classify';

import defaultClasses from './subscriptionsTable.css';
import {shape, string} from "prop-types";

const SubscriptionsTable = props => {

    const classes = mergeClasses(defaultClasses);

    const { items } = props;

    const mapSubscriptionsDetail = () => {
        return items.slice(0).reverse().map((singleItem, index) => {
            const { increment_id, description, last_run, next_run } = singleItem;

            return (
                <tr key={index}>
                    <td className={classes.tdClass}>{increment_id}</td>
                    <td className={classes.tdClass}>{description}</td>
                    <td className={classes.tdClass}>{last_run}</td>
                    <td className={classes.tdClass}>{next_run}</td>
                </tr>
            );
        });
    }

    return (
        <table className={classes.tableClass}>
            <thead>
            <tr className={classes.trClass}>
                <th className={classes.thClass}>Order #</th>
                <th className={classes.thClass}>Description</th>
                <th className={classes.thClass}>Last Run</th>
                <th className={classes.thClass}>Next Run</th>
            </tr>
            </thead>
            <tbody>
            {mapSubscriptionsDetail()}
            </tbody>
        </table>
    );
}

SubscriptionsTable.propTypes = {
    classes: shape({
        tableClass: string,
        thClass: string,
        tdClass: string
    })
};

export default SubscriptionsTable;
