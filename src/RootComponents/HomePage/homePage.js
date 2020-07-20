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

const HomePage = () => {
    const classes = mergeClasses(defaultClasses);
    return (
        <div>
            <div>
              <HeroComponent/>
            </div>
            <div className={classes.trustedComponent}>
             <TrustedBy/>
            </div>
            <div className={classes.commonComponent}>
             <Experts/>
            </div>
            <div>
             <AgencyLogo/>
            </div>
            <div className={classes.teamComponent}>
            <Team/>
            </div>
            <div className={classes.commonComponent}>
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
        teamComponent: string
    })
};

export default HomePage;
