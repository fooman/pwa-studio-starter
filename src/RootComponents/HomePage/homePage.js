import React from "react";

import HeroComponent from './HeroComponent/heroComponent'
import TrustedBy from './TrustedByComponent/trustedBy';
import Experts from './ExpertsComponent/experts';
import AgencyLogo from './AgencyLogoComponent/agencyLogo';
import Team from './TeamComponent/team';
import BackedByEveryThing from './BackedByEveryThingComponent/backedByEveryThing';
import ReadyToSave from './ReadyToSaveComponent/readyToSave';

const HomePage = () => {
    return (
        <div>
            <HeroComponent/>
            <TrustedBy/>
            <Experts/>
            <AgencyLogo/>
            <Team/>
            <BackedByEveryThing/>
            <ReadyToSave/>
        </div>
    );
}

export default HomePage;
