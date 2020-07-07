import { useEffect } from 'react';
import ReactGA from 'react-ga';
import {shape, string} from "prop-types";

export const useGoogleAnalytics = pageName => {
    useEffect(() => {
        ReactGA.set({ page: window.location.pathname }); // Update the user's current page
        ReactGA.pageview(window.location.pathname + window.location.search); // Record a pageview for the given page
    }, [pageName]);
};

const useGoogleAnalyticsEvent = props=> {
    ReactGA.event({
        category: props.category,
        action: props.action
    });
}

useGoogleAnalyticsEvent.propTypes = {
    eventData: shape({
        category: string,
        action: string
    })
};
export default useGoogleAnalyticsEvent;
