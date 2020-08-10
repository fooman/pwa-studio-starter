import React from "react";

import {useMyDownloads} from './useMyDownloads';
import { mergeClasses } from '@magento/venia-ui/lib/classify';

import { fullPageLoadingIndicator } from '@magento/venia-ui/lib/components/LoadingIndicator';

import customerDownloadableProductQuery from 'src/components/MyDownloads/customerDownloadableProduct.graphql';

import defaultClasses from './myDownloads.css';
import {Title} from "@magento/venia-ui/lib/components/Head";

import ProductTable from './productTable'

const PAGE_TITLE = `My Downloadable Products`;
const EMPTY_DATA_MESSAGE = `You don't have any downloadable products.`;

const MyDownloads = () => {
    const talonProps = useMyDownloads({
        useCustomerDownloadableProductQuery: customerDownloadableProductQuery
    });
    const { data, isLoading, error } = talonProps;

    const classes = mergeClasses(defaultClasses);

    if (error) {
        if (process.env.NODE_ENV !== 'production') {
            console.error(error);
        }
        return <div>Data Fetch Error</div>;
    }

    if (isLoading) {
        return fullPageLoadingIndicator;
    }

    let pageContents;
    if (data) {
        let { customerDownloadableProducts } = data;
        let { items } = customerDownloadableProducts;

        if (!items.length) {
            pageContents = (
                <h3 className={classes.emptyProductMessage}>
                    {EMPTY_DATA_MESSAGE}
                </h3>
            );
        }
        else {
            pageContents = (
                <div className={classes.downloadableProductTable}>
                    <ProductTable items = {items}/>
                </div>
            );
        }
        return (
            <div className={classes.root}>
                <Title>{`${PAGE_TITLE} - ${STORE_NAME}`}</Title>
                <h1 className={classes.heading}>{PAGE_TITLE}</h1>
                {pageContents}
            </div>
        );
    }
}

export default MyDownloads;
