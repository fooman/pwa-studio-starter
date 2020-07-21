import React from "react";

import {shape, string} from "prop-types";
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import classic from './images/524b430d94340.png';
import meanBee from './images/524b42dadff25.png';
import amazing from './images/524b43888b6e0.png';
import younify from './images/524b422510cf4.png';
import purPointDesign from './images/56f065a3e4800.png';
import defaultClasses from "./agencyLogo.css";

const AgencyLogo = () => {
    const classes = mergeClasses(defaultClasses);

    return (
        <div className={classes.root}>
            <a>
                <img src = {classic}/>
            </a>
            <a>
                <img src = {meanBee}/>
            </a>
            <a>
                <img src = {younify}/>
            </a>
            <a>
                <img src = {amazing}/>
            </a>
            <a>
                <img src = {purPointDesign}/>
            </a>
        </div>
    );
}

AgencyLogo.propTypes = {
    classes: shape({
        root: string
    })
};

export default AgencyLogo;
