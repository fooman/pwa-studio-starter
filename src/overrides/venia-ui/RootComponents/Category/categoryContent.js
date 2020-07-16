import React, { Fragment, Suspense } from 'react';
import { array, shape, string } from 'prop-types';
import RichContent from '@magento/venia-ui/lib/components/RichContent';
import { useCategoryContent } from '@magento/peregrine/lib/talons/RootComponents/Category';
import NoProductsFound from '@magento/venia-ui/lib/RootComponents/Category/NoProductsFound';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import { Title } from '@magento/venia-ui/lib/components/Head';
import Breadcrumbs from '@magento/venia-ui/lib/components/Breadcrumbs';
import ProductSort from '@magento/venia-ui/lib/components/ProductSort';
import Pagination from '@magento/venia-ui/lib/components/Pagination';
import { resourceUrl } from '@magento/venia-drivers';
import GET_PRODUCT_FILTERS_BY_CATEGORY from '@magento/venia-ui/lib/queries/getProductFiltersByCategory.graphql';
import Button from '@magento/venia-ui/lib/components/Button';
import defaultClasses from './categoryContent.css';
import Gallery from '@magento/venia-ui/lib/components/Gallery';

const FilterModal = React.lazy(() => import('@magento/venia-ui/lib/components/FilterModal'));

const CategoryContent = props => {
    const { categoryId, data, pageControl, sortProps } = props;
    const [currentSort] = sortProps;

    const talonProps = useCategoryContent({
        categoryId,
        data,
        queries: {
            getProductFiltersByCategory: GET_PRODUCT_FILTERS_BY_CATEGORY
        }
    });

    const {
        categoryName,
        categoryDescription,
        filters,
        handleLoadFilters,
        handleOpenFilters,
        items,
        pageTitle,
        totalPagesFromData
    } = talonProps;

    const classes = mergeClasses(defaultClasses, props.classes);
    const header = filters ? (
        <Fragment>
            <div className={classes.headerButtons}>
                <Button
                    priority={'low'}
                    classes={{root_lowPriority: classes.filterButton}}
                    onClick={handleOpenFilters}
                    onFocus={handleLoadFilters}
                    onMouseOver={handleLoadFilters}
                    type="button"
                >
                    {'Filter'}
                </Button>
                <ProductSort sortProps={sortProps}/>
            </div>
            <div className={classes.sortContainer}>
                {'Items sorted by '}
                <span className={classes.sortText}>{currentSort.sortText}</span>
            </div>
        </Fragment>
    ) : null;

    // If you want to defer the loading of the FilterModal until user interaction
    // (hover, focus, click), simply add the talon's `loadFilters` prop as
    // part of the conditional here.
    const modal = filters ? <FilterModal filters={filters}/> : null;

    const categoryDescriptionElement = categoryDescription ? (
        <RichContent html={categoryDescription}/>
    ) : null;

    const content =
        totalPagesFromData === 0 ? (
            <NoProductsFound categoryId={categoryId}/>
        ) : (
            <Fragment>
                <section className={classes.gallery}>
                        <Gallery items={items}/>
                </section>
                <div className={classes.pagination}>
                    <Pagination pageControl={pageControl}/>
                </div>
            </Fragment>
        );

    let currencyCode = ['aud', 'gbp', 'eur', 'nzd', 'usd'];

    // const currencyOptions = () => {
    //     return currencyCode = currencyCode.map((currency, index) => {
    //         return (<option key={index} className={classes.currencyName}>{currency}</option>);
    //     });
    // };

    return (
        <Fragment>
            <Breadcrumbs categoryId={categoryId}/>
            <Title>{pageTitle}</Title>
            <article className={classes.root}>
                <h1 className={classes.title}>
                    <div className={classes.categoryTitle}>{categoryName}</div>
                </h1>
                <div className={classes.linkTitle}>
                    <a className={classes.magentoLinks} active={true} href={resourceUrl('/extensions.html')}>{'Magento 1'}</a>
                    <a className={classes.magentoLinks} href={resourceUrl('/extensions/magento2.html')}>{'Magento 2'}</a>
                    {/*<select title="Select Your Currency" className={classes.selectCurrency}>*/}
                    {/*    {currencyOptions()}*/}
                    {/*</select>*/}
                </div>
                {categoryDescriptionElement}
                {header}
                {content}
                <Suspense fallback={null}>{modal}</Suspense>
            </article>
        </Fragment>
    );
};

export default CategoryContent;

CategoryContent.propTypes = {
    classes: shape({
        filterContainer: string,
        gallery: string,
        headerButtons: string,
        filterButton: string,
        pagination: string,
        root: string,
        title: string,
        currencyName: string,
        linkTitle: string,
        selectCurrency: string,
        magentoLinks: string
    }),
    // sortProps contains the following structure:
    // [{sortDirection: string, sortAttribute: string, sortText: string},
    // React.Dispatch<React.SetStateAction<{sortDirection: string, sortAttribute: string, sortText: string}]
    sortProps: array
};
