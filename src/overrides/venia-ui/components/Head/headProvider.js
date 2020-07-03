import React, {Fragment} from 'react';
import {HelmetProvider as HeadProvider, Helmet} from 'react-helmet-async';

const structuredData = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    "url": "https://fooman.com",
    "logo": "https://static.fooman.com/Fooman_Logo.png",
    "sameAs": "https://twitter.com/foomanNZ"
});

const VeniaHeadProvider = props => {
    return (
        <HeadProvider>
            {props.children}
            <Helmet>
                <meta property="og:title" content="Magento Extensions by Fooman"/>
                <meta property="og:description" content=""/>
                <meta property="og:image" content="https://static.fooman.com/Fooman_OG_Logo.png"/>
                <meta property="og:type" content="website"/>
                <meta property="og:url" content="https://fooman.com/"/>
                <meta property="twitter:card" content="summary"/>
                <meta property="twitter:site" content="@foomanNZ"/>
                <meta property="twitter:title" content="Magento Extensions by Fooman"/>
                <meta property="twitter:description" content=""/>
                <meta property="twitter:image" content="https://static.fooman.com/Fooman_Twitter_Card.png"/>
                <script key="og-org-data" type="application/ld+json">{structuredData}</script>
            </Helmet>
        </HeadProvider>
    );
};

export default VeniaHeadProvider;
