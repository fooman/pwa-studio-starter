import React from "react";

import {useMyExtensions} from './useMyExtensions';
import { mergeClasses } from '@magento/venia-ui/lib/classify';

import { fullPageLoadingIndicator } from '@magento/venia-ui/lib/components/LoadingIndicator';

import customerPurchasedExtensionsQuery from './customerPurchasedExtensions.graphql';

import defaultClasses from './myExtensions.css';
import {Title} from "@magento/venia-ui/lib/components/Head";

import ExtensionsTable from './extensionsTable';

const PAGE_TITLE = `My Extensions`;
const EMPTY_DATA_MESSAGE = `You don't have any extensions.`;

const MyExtensions = () => {
    const talonProps = useMyExtensions({
        useCustomerPurchasedExtensionsQuery: customerPurchasedExtensionsQuery
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
        let { customerPurchasedExtensions } = data;
        let { items } = customerPurchasedExtensions;

        if (!items.length) {
            pageContents = (
                <h3 className={classes.emptyExtensionsMessage}>
                    {EMPTY_DATA_MESSAGE}
                </h3>
            );
        }
        else {
            pageContents = (
                <div className={classes.downloadableExtensionsTable}>
                    <ExtensionsTable items = {items}/>
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

export default MyExtensions;
