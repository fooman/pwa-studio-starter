import React from "react";

import {shape, string} from "prop-types";
import { mergeClasses } from '@magento/venia-ui/lib/classify';

import davidBestImg from './images/David-Best-Response-Media-round.png';
import tomRobertsImg from './images/Tom-Robertshaw-Meanbee-round.png';
import bestResponseImg from './images/Best-Response-Media.png';
import meanBee from './images/meanbee.png';
import defaultClasses from "./experts.css";

const Experts = () => {
    const classes = mergeClasses(defaultClasses);

    return (
        <div className={classes.root}>
            <div className = {classes.heading}>
                <h2 className = {classes.h2}>{"... rated by industry experts..."}</h2>
                <div className = {classes.line}>
                    <div className={classes.unit}>
                        <div className={classes.portRait}>
                            <img alt={"photo of David"} src = {davidBestImg} />
                        </div>
                        <div className = {classes.rText}>
                            <p className = {classes.clientName}>{"David Wain-Heapy"}</p>
                            <p className = {classes.clientOrg}>{"Best Response Media"}</p>
                            <p className = {classes.clientQuote}>{"We have had great experiences with Fooman extensions... The code is really well written"}</p>
                            <p>
                                <img alt={"Logo Best Response Media"} className = {classes.strikeImg} src = {bestResponseImg} />
                            </p>
                        </div>
                    </div>
                    <div className={classes.unit}>
                        <div className={classes.portRait}>
                            <img alt={"photo of Tom"} src = {tomRobertsImg} />
                        </div>
                        <div className = {classes.rText}>
                            <p className = {classes.clientName}>{"Tom Robertshaw"}</p>
                            <p className = {classes.clientOrg}>{"Meanbee"}</p>
                            <p className = {classes.clientQuote}>{"Fooman is a Magento name you can trust"}</p>
                            <p>
                                <img alt={"Logo Meanbee"} className = {classes.strikeImg} src = {meanBee} />
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

Experts.propTypes = {
    classes: shape({
        root: string,
        heading: string,
        h2: string,
        line: string,
        unit: string,
        portRait: string,
        rText: string,
        clientName: string,
        clientOrg: string,
        clientQuote: string,
        strikeImg: string
    })
};

export default Experts;
