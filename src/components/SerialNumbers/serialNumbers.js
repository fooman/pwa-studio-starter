import React from "react";
import { useSerialNumbers } from "./useSerialNumbers";
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import serialNumbersQuery from "./serialNumbers.graphql";
import { fullPageLoadingIndicator } from "@magento/venia-ui/lib/components/LoadingIndicator";

import {Title} from "@magento/venia-ui/lib/components/Head";
import SerialNumbersTable from "./serialNumberTable";
import defaultClasses from "./serialNumbers.css";

const PAGE_TITLE = `Serial Numbers`;
const EMPTY_DATA_MESSAGE = `You don't have any serial numbers.`;

const SerialNumbers = () => {
    const talonProps = useSerialNumbers({
        useSerialNumbersQuery: serialNumbersQuery
    });

    const {
        isLoading,
        data,
        error
    } = talonProps;

    const classes = mergeClasses(defaultClasses);

    if (error) {
        if (process.env.NODE_ENV !== 'production') {
            console.error(error);
        }
        return (<div>Data Fetch Error</div>);
    }

    if (isLoading) {
        return (fullPageLoadingIndicator);
    }

    let pageContents;
    if (data) {
        let { serialNumbers } = data;
        let { items } = serialNumbers;

        if (!items.length) {
            pageContents = (
                <h3 className={classes.emptySerialNumberMessage}>
                    {EMPTY_DATA_MESSAGE}
                </h3>
            );
        }
        else {
            pageContents = (
                <div className={classes.serialNumbersTable}>
                    <SerialNumbersTable items = {items} />
                </div>
            );
        }
        return (
            <div className={classes.root}>
                <Title>{`${PAGE_TITLE} - ${STORE_NAME}`}</Title>
                {pageContents}
            </div>
        );
    }
    return null;
}

export default SerialNumbers;
