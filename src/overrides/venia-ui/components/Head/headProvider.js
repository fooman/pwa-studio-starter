import React, {Fragment} from 'react';
import {HelmetProvider as HeadProvider, Helmet} from 'react-helmet-async';
import ReactGA from 'react-ga';
import {useLocation} from "react-router-dom";
import {useGoogleAnalytics} from "../../../../hooks/useGoogleAnalytics";
ReactGA.initialize(process.env.GA_ACCT_ID);

const structuredData = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Fooman",
    "url": "https://fooman.com",
    "logo": "https://fooman.com/assets/icons/fooman_logo_512x512.png",
    "sameAs": "https://twitter.com/foomanNZ"
});

const structuredWebsiteData = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": "https://fooman.com",
    "potentialAction": {
        "@type": "SearchAction",
        "target": "https://fooman.com/search.html?query={search_term_string}",
        "query-input": "required name=search_term_string"
    }
});

const VeniaHeadProvider = props => {
    const { pathname } = useLocation();
    useGoogleAnalytics(pathname);
    return (
        <HeadProvider>
            {props.children}
            <Helmet>
                <meta property="og:title" content="Magento Extensions by Fooman"/>
                <meta property="og:description" content="Trusted Magento 1 and 2 extensions to save you serious time. Quality code backed by amazing support. 170,000+ downloads | Magento Master & Certified Developers"/>
                <meta property="og:image" content="https://fooman.com/FoomonLogo_OG.png"/>
                <meta property="og:type" content="website"/>
                <meta property="og:url" content="https://fooman.com/"/>
                <meta property="twitter:card" content="summary"/>
                <meta property="twitter:site" content="@foomanNZ"/>
                <meta property="twitter:title" content="Magento Extensions by Fooman"/>
                <meta property="twitter:description" content="Trusted Magento 1 and 2 extensions to save you serious time. Quality code backed by amazing support. 170,000+ downloads | Magento Master & Certified Developers"/>
                <meta property="twitter:image" content="https://fooman.com/FoomonLogo_TwitterCard.png"/>
                <script key="og-org-data" type="application/ld+json">{structuredData}</script>
                <script key="og-website-data" type="application/ld+json">{structuredWebsiteData}</script>
            </Helmet>
        </HeadProvider>
    );
};

export default VeniaHeadProvider;
