import React, { Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router';
import gravCmsPageQuery from '../../queries/getGravCmsPage.graphql';
import { fullPageLoadingIndicator } from '@magento/venia-ui/lib/components/LoadingIndicator';
import RichContent from '@magento/venia-ui/lib/components/RichContent';
import { string } from 'prop-types';
import { Meta, Title } from '@magento/venia-ui/lib/components/Head';

const GravCMSPage = props => {
    const { urlKey = 'index' } = useParams()
    /*let urlKey = props.match.params.urlKey ?
        props.match.params.urlKey.replace('.html', ''):
        'index' ;*/

    const { loading, error, data } = useQuery(gravCmsPageQuery, {
        variables: {
            urlKey: urlKey.replace('.html', '')
        }
    });

    if (error) {
        if (process.env.NODE_ENV !== 'production') {
            console.error(error);
        }
        return <div>Page Fetch Error</div>;
    }

    if (loading) {
        return fullPageLoadingIndicator;
    }

    if (data) {
        let content;
        content = <RichContent html={data.gravCmsPage.content} />;

        return (
            <Fragment>
                <Title>{data.gravCmsPage.title}</Title>
                <Meta
                    name="description"
                    content={data.gravCmsPage.meta_description}
                />
                <Meta
                    name="keywords"
                    content={data.gravCmsPage.meta_keywords}
                />
                {content}
            </Fragment>
        );
    }
    return null;
};

GravCMSPage.propTypes = {
    urlKey: string
};

export default GravCMSPage;
