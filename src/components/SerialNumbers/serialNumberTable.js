import React, {useEffect, useState} from "react";
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import defaultClasses from "./serialNumberTable.css";
import {shape, string} from "prop-types";

const SerialNumbersTable = props => {

    const [mappedItem, setMappedItem] = useState([]);

    const classes = mergeClasses(defaultClasses);

    const { items } = props;
    useEffect( () => {
        let mappedItem = [];
        for (let i = items.length -1 ; i >= 0; i--) {
            const { purchased_host, serial_number } = items[i];
            serial_number? mappedItem.push(
                <tr key={i}>
                    <td className={classes.tdClass}>{purchased_host}</td>
                    <td className={classes.tdClass}>{serial_number}</td>
                </tr>
            ) : null;
        }
        setMappedItem(mappedItem);
    }, [items]);

    return (
        <div className={classes.gridContent}>
            <h1 className={classes.heading}>{`Serial Numbers`}</h1>
            <table className={classes.tableClass}>
                <thead>
                <tr className={classes.trClass}>
                    <th className={classes.thClass}>Purchased Host</th>
                    <th className={classes.thClass}>Serial Number</th>
                </tr>
                </thead>
                <tbody>
                {mappedItem}
                </tbody>
            </table>
        </div>
    );
}

SerialNumbersTable.propTypes = {
    classes: shape({
        gridContent: string,
        heading: string,
        tableClass: string,
        thClass: string,
        tdClass: string
    })
};

export default SerialNumbersTable;
