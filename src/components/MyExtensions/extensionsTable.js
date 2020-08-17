import React, {useEffect, useState} from "react";
import { mergeClasses } from '@magento/venia-ui/lib/classify';

import defaultClasses from './extensionsTable.css';
import {shape, string} from "prop-types";
import ComposerInfo from './ComposerInfo/composerInfo';

const ExtensionsTable = props => {

    const [mappedItem, setMappedItem] = useState([]);
    const [mappedRepoUrl, setMappedRepoUrl] = useState([]);
    const classes = mergeClasses(defaultClasses);

    const {items} = props;

    useEffect(() => {
        let mappedItem = [];
        let unique_repo_url_item = [];
        const reverseItems = items.reverse();
        reverseItems.forEach((singleItem, index) => {
            const { order_increment_id, product_name, purchased_host, free_upgrades_until, repo_url } = singleItem;

            /*operation for get unique repo_url*/
            !unique_repo_url_item.length ?
                unique_repo_url_item.push(repo_url) :
                !unique_repo_url_item.includes(repo_url) ?
                    unique_repo_url_item.push(repo_url) :
                    null;

            const upgradeUntilDate = new Date(new Date(free_upgrades_until * 1000)).toLocaleDateString();
            mappedItem.push(
                <tr key={index}>
                    <td className={classes.tdClass}>{order_increment_id}</td>
                    <td className={classes.tdClass}>{product_name}</td>
                    <td className={classes.tdClass}>{purchased_host}</td>
                    <td className={classes.tdClass}>{upgradeUntilDate}</td>
                </tr>
            );
        });
        setMappedItem(mappedItem);
        setMappedRepoUrl(unique_repo_url_item);
    }, [items]);

    return (
        <div>
            <ComposerInfo uniqueRepoUrlItem = {mappedRepoUrl} />
          <div className={classes.gridContent}>
              <h1 className={classes.heading}>{`My Extensions`}</h1>
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
                {mappedItem}
                </tbody>
            </table>
          </div>
        </div>
    );
}

ExtensionsTable.propTypes = {
    classes: shape({
        gridContent: string,
        tableClass: string,
        thClass: string,
        tdClass: string
    })
};

export default ExtensionsTable;
