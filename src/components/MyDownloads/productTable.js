import React from "react";
import { mergeClasses } from '@magento/venia-ui/lib/classify';

import defaultClasses from './productTable.css';
import {shape, string} from "prop-types";
import LinkButton from '@magento/venia-ui/lib/components/LinkButton';

const ProductTable = props => {

    const handleDownloadClick = (url) => {
        window.location.assign(url);
    };

    const classes = mergeClasses(defaultClasses);

    const {items} = props;
    const magentoBackendURL = new URL(process.env.MAGENTO_BACKEND_URL);
    const mapProductDetail = () => {
        return items.slice(0).reverse().map((singleItem, index) => {
            const { order_increment_id, date, status } = singleItem;
            let {download_url} = singleItem;
            if (status === 'available') {
                let downloadURL = new URL(download_url);
                if (downloadURL.origin === magentoBackendURL.origin) {
                    // Replace URL base so upward can proxy to back-end
                    download_url = downloadURL.href.slice(downloadURL.origin.length);
                }
            }
            const maybeLink = (status === 'available') ?
                <LinkButton
                    onClick={() => {
                        handleDownloadClick(download_url);
                    }}>
                    <span>{'Download'}</span>
                </LinkButton> : null;

            const localDate = (new Date(date)).toLocaleDateString();
            return (
                <tr key={index}>
                    <td className={classes.tdClass}>{order_increment_id}</td>
                    <td className={classes.tdClass}>{localDate}</td>
                    <td className={classes.tdClass}>{`PDF Picking list(add-on to Pdf Customizer) - Magento 1`}</td>
                    <td className={classes.tdClass}>{status}</td>
                    <td className={classes.tdClass}>{maybeLink}</td>
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
                    <th className={classes.thClass}/>
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
