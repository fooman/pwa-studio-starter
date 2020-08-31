import React, {Fragment} from 'react';
import {useQuery} from '@apollo/client';
import {useParams} from 'react-router';
import gravCmsPageQuery from '../../queries/getGravCmsPage.graphql';
import {fullPageLoadingIndicator} from '@magento/venia-ui/lib/components/LoadingIndicator';
import RichContent from '@magento/venia-ui/lib/components/RichContent';
import {mergeClasses} from "@magento/venia-ui/lib/classify";
import {shape, string} from 'prop-types';
import {Meta, Title} from '@magento/venia-ui/lib/components/Head';
import defaultClasses from "./blog.css";

const GravCMSPage = props => {

    const classes = mergeClasses(defaultClasses);

    const {urlKey = 'index'} = useParams()

    const {loading, error, data} = useQuery(gravCmsPageQuery, {
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
        content = <RichContent html={data.gravCmsPage.content}/>;

        return (
            <div className={classes.blogRoot}>
            <Fragment >
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
            </div>
        );
    }
    return null;
};

GravCMSPage.propTypes = {
    urlKey: string,
    classes: shape({
        blogRoot: string,
    })
};

export default GravCMSPage;
