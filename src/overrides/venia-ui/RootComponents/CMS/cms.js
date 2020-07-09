import React, { Fragment } from 'react';
import { number, shape, string } from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import cmsPageQuery from '@magento/venia-ui/lib/queries/getCmsPage.graphql';
import { fullPageLoadingIndicator } from '@magento/venia-ui/lib/components/LoadingIndicator';
import RichContent from '@magento/venia-ui/lib/components/RichContent';
import CategoryList from '@magento/venia-ui/lib/components/CategoryList';
import { Meta, Title } from '@magento/venia-ui/lib/components/Head';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import defaultClasses from './cms.css';
import { useAppContext } from '@magento/peregrine/lib/context/app';

const CMSPage = props => {
    const { id } = props;
    const classes = mergeClasses(defaultClasses, props.classes);
    const { loading, error, data } = useQuery(cmsPageQuery, {
        variables: {
            id: Number(id),
            onServer: false
        },
        fetchPolicy: 'cache-and-network'
    });
    const [
        { isPageLoading },
        {
            actions: { setPageLoading }
        }
    ] = useAppContext();

    if (error) {
        if (process.env.NODE_ENV !== 'production') {
            console.error(error);
        }
        return <div>Page Fetch Error</div>;
    }

    if (!data) {
        return fullPageLoadingIndicator;
    }

    if (loading && !isPageLoading) {
        setPageLoading(true);
    } else if (!loading && isPageLoading) {
        setPageLoading(false);
    }

    const { content_heading, title } = data.cmsPage;

    const headingElement =
        content_heading !== '' ? (
            <h1 className={classes.heading}>{content_heading}</h1>
        ) : null;

    let content;

    if (
        data.cmsPage.content &&
        data.cmsPage.content.length > 0 &&
        !data.cmsPage.content.includes('CMS homepage content goes here.')
    ) {
        content = (
            <Fragment>
                <Title>{title}</Title>
                {headingElement}
                <RichContent html={data.cmsPage.content} />
            </Fragment>
        );
    } else {
        content = <CategoryList title="Shop by category" id={2} />;
    }

    return (
        <Fragment>
            <Meta name="description" content={data.cmsPage.meta_description} />
            <div>
                <div className={classes.HeroImg}></div>
            </div>
            {content}
        </Fragment>
    );
};

CMSPage.propTypes = {
    id: number,
    classes: shape({
        heading: string,
        HeroImg: string
    })
};

export default CMSPage;
