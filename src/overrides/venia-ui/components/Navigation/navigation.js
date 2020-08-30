import React, { Suspense, useContext, useMemo } from 'react';
import { shape, string } from 'prop-types';
import { useNavigation } from '@magento/peregrine/lib/talons/Navigation/useNavigation';

import { mergeClasses } from '@magento/venia-ui/lib/classify';
import AuthBar from '@magento/venia-ui/lib/components/AuthBar';
import CategoryTree from '@magento/venia-ui/lib/components/CategoryTree';
import LoadingIndicator from '@magento/venia-ui/lib/components/LoadingIndicator';
import NavHeader from '@magento/venia-ui/lib/components/Navigation/navHeader';
import defaultClasses from '@magento/venia-ui/lib/components/Navigation/navigation.css';
import GET_CUSTOMER_QUERY from '@magento/venia-ui/lib/queries/getCustomer.graphql';
// import { useSignInRequestContext } from '../../../../components/ProductFullDetail/Tabs/ReviewsTab/addReviewComponent';
const AuthModal = React.lazy(() => import('@magento/venia-ui/lib/components/AuthModal'));

const Navigation = props => {
    const {
        catalogActions,
        categories,
        categoryId,
        handleBack,
        handleClose,
        hasModal,
        isOpen,
        isTopLevel,
        setCategoryId,
        showCreateAccount,
        showForgotPassword,
        showMainMenu,
        showMyAccount,
        showSignIn,
        view
    } = useNavigation({ customerQuery: GET_CUSTOMER_QUERY });

    const classes = mergeClasses(defaultClasses, props.classes);
    const rootClassName = isOpen ? classes.root_open : classes.root;
    const modalClassName = hasModal ? classes.modal_open : classes.modal;
    const bodyClassName = hasModal ? classes.body_masked : classes.body;

    // Lazy load the auth modal because it may not be needed.
    const authModal =hasModal ? (
        <Suspense fallback={<LoadingIndicator />}>
            <AuthModal
                closeDrawer={handleClose}
                showCreateAccount={showCreateAccount}
                showForgotPassword={showForgotPassword}
                showMainMenu={showMainMenu}
                showMyAccount={showMyAccount}
                showSignIn={showSignIn}
                view={view}
            />
        </Suspense>
    ) : null;

    return (
        <aside className={rootClassName}>
            <header className={classes.header}>
                <NavHeader
                    isTopLevel={isTopLevel}
                    onBack={handleBack}
                    view={view}
                />
            </header>
            <div className={bodyClassName}>
                <CategoryTree
                    categoryId={categoryId}
                    categories={categories}
                    onNavigate={handleClose}
                    setCategoryId={setCategoryId}
                    updateCategories={catalogActions.updateCategories}
                />
            </div>
            <div className={classes.footer}>
                <AuthBar
                    disabled={hasModal}
                    showMyAccount={showMyAccount}
                    showSignIn={showSignIn}
                    view={view}
                />
            </div>
            <div className={modalClassName}>{authModal}</div>
        </aside>
    );
};

export default Navigation;

Navigation.propTypes = {
    classes: shape({
        body: string,
        form_closed: string,
        form_open: string,
        footer: string,
        header: string,
        root: string,
        root_open: string,
        signIn_closed: string,
        signIn_open: string
    })
};
