import React from "react";
import { mergeClasses } from '@magento/venia-ui/lib/classify';

import defaultClasses from './extensionsTable.css';
import {shape, string} from "prop-types";

const ExtensionsTable = props => {

    const classes = mergeClasses(defaultClasses);

    const {items} = props;
    const mapExtensionDetail = () => {
        return items.slice(0).reverse().map((singleItem, index) => {
            const { order_increment_id, product_name, purchased_host, free_upgrades_until } = singleItem;
            const upgradeUntilDate = new Date(new Date(free_upgrades_until * 1000)).toLocaleDateString();
            return (
                <tr key={index}>
                    <td className={classes.tdClass}>{order_increment_id}</td>
                    <td className={classes.tdClass}>{product_name}</td>
                    <td className={classes.tdClass}>{purchased_host}</td>
                    <td className={classes.tdClass}>{upgradeUntilDate}</td>
                </tr>
            );
        });
    }

    return (
        <table className={classes.tableClass}>
            <thead>
            <tr className={classes.trClass}>
                <th className={classes.thClass}>Order #</th>
                <th className={classes.thClass}>Product Title</th>
                <th className={classes.thClass}>Purchased Host</th>
                <th className={classes.thClass}>Free Upgrades Until</th>
            </tr>
            </thead>
            <tbody>
            {mapExtensionDetail()}
            </tbody>
        </table>
    );
}

ExtensionsTable.propTypes = {
    classes: shape({
        tableClass: string,
        thClass: string,
        tdClass: string
    })
};

export default ExtensionsTable;
