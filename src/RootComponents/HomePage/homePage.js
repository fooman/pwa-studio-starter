import React from "react";

import HeroComponent from './HeroComponent/heroComponent'
import TrustedBy from './TrustedByComponent/trustedBy';
import Experts from './ExpertsComponent/experts';
import AgencyLogo from './AgencyLogoComponent/agencyLogo';
import Team from './TeamComponent/team';
import BackedByEveryThing from './BackedByEveryThingComponent/backedByEveryThing';
import ReadyToSave from './ReadyToSaveComponent/readyToSave';
import {mergeClasses} from "@magento/venia-ui/lib/classify";
import defaultClasses from "./homePage.css";
import {shape, string} from "prop-types";
import { fullPageLoadingIndicator } from "@magento/venia-ui/lib/components/LoadingIndicator";
import { useQuery } from '@apollo/client';
import agencyLogosQuery from './testimonialsLogo.graphql';


const HomePage = () => {
    const { loading, error, data } = useQuery(agencyLogosQuery);
    if (error) {
        if (process.env.NODE_ENV !== 'production') {
            console.error(error);
        }
        return <div>Page Fetch Error</div>;
    }
    if (loading) {
        return fullPageLoadingIndicator;
    }
    const classes = mergeClasses(defaultClasses);
    return (
        <div>
            <div>
              <HeroComponent/>
            </div>
            <div className={classes.trustedComponent}>
             <TrustedBy/>
            </div>
            <div className={classes.expertsComponent}>
             <Experts/>
            </div>
            <div className = {classes.agencyComponent}>
                <AgencyLogo data = {data}/>
            </div>
            <div className={classes.teamComponent}>
            <Team/>
            </div>
            <div className={classes.backedBy}>
            <BackedByEveryThing/>
            </div>
            <div>
            <ReadyToSave/>
            </div>
        </div>
    );
}

HomePage.propTypes = {
    classes: shape({
        trustedComponent: string,
        commonComponent: string,
        agencyComponent: string,
        teamComponent: string,
        backedBy: string,
        expertsComponent: string
    })
};

export default HomePage;
