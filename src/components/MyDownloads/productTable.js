import React from "react";
import { Link } from '@magento/venia-drivers';
import { mergeClasses } from '@magento/venia-ui/lib/classify';

import defaultClasses from './productTable.css';
import {shape, string} from "prop-types";


const ProductTable = props => {

    const classes = mergeClasses(defaultClasses);

    const {items} = props;

    const mapProductDetail = () => {
        return items.slice(0).reverse().map((singleItem, index) => {
            const { order_increment_id, date, status } = singleItem;
            const localDate = (new Date(date)).toLocaleDateString();
            return (
                <tr key={index}>
                    <td className={classes.tdClass}>
                            <Link to={'#'}>
                            {order_increment_id}
                        </Link>
                    </td>
                    <td className={classes.tdClass}>{localDate}</td>
                    <td className={classes.tdClass}>{`PDF Picking list(add-on to Pdf Customizer) - Magento 1`}</td>
                    <td className={classes.tdClass}>{status}</td>
                </tr>
            );
        });
    }

    return (
        <table className={classes.tableClass}>
            <thead>
                <tr className={classes.trClass}>
                    <th className={classes.thClass}>Order #</th>
                    <th className={classes.thClass}>Date</th>
                    <th className={classes.thClass}>Title</th>
                    <th className={classes.thClass}>Status</th>
                </tr>
            </thead>
            <tbody>
                {mapProductDetail()}
            </tbody>
        </table>
    );
}

ProductTable.propTypes = {
    classes: shape({
        tableClass: string,
        thClass: string,
        tdClass: string
    })
};

export default ProductTable;
