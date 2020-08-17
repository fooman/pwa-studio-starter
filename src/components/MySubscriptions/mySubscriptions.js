import React from "react";

import { useMySubscriptions } from './useMySubscriptions';
import { mergeClasses } from '@magento/venia-ui/lib/classify';

import { fullPageLoadingIndicator } from '@magento/venia-ui/lib/components/LoadingIndicator';

import customerSubscriptionsQuery from './customerSubscriptions.graphql';

import defaultClasses from './mySubscriptions.css';
import {Title} from "@magento/venia-ui/lib/components/Head";

import SubscriptionsTable from './subscriptionsTable';

const PAGE_TITLE = `My Subscriptions`;
const EMPTY_DATA_MESSAGE = `You don't have any subscriptions.`;

const MySubscriptions = () => {
    const talonProps = useMySubscriptions({
        useCustomerSubscriptionsQuery: customerSubscriptionsQuery
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

        let { subscriptions } = data;

        if (!subscriptions.length) {
            pageContents = (
                <h3 className={classes.emptySubscriptionMessage}>
                    {EMPTY_DATA_MESSAGE}
                </h3>
            );
        }
        else {
            pageContents = (
                <div className={classes.subscriptionTable}>
                    <SubscriptionsTable items = { subscriptions }/>
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
    return null;
}

export default MySubscriptions;
