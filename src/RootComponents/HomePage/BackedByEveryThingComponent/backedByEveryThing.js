import React from "react";

import {shape, string} from "prop-types";
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import backEnd1 from './images/backed1.jpg';
import backEnd2 from './images/backed2.jpg';
import backEnd3 from './images/backed3.jpg';
import backEnd4 from './images/backed4.jpg';
import backEnd5 from './images/backed5.jpg';

import defaultClasses from "./backedByEveryThing.css";

const BackedByEveryThing = () => {
    const classes = mergeClasses(defaultClasses);

    return (
        <div className = {classes.root}>
            <div className = {classes.heading}>
                <h2 className = {classes.h2}>{"...and backed by everything you need in an extension"}</h2>
                <div className = {classes.line}>
                    <div className = {classes.singleCol}>
                        <div className = {classes.media}>
                            <img alt={"Magento Logo"} className = {classes.memberImg} src = {backEnd1}/>
                        </div>
                        <div className = {classes.text}>
                            <span>{"Decade of Magento experience"}</span>
                        </div>
                    </div>

                    <div className = {classes.singleCol}>
                        <div className = {classes.media}>
                            <img alt={"Certified Logo"} className = {classes.memberImg} src = {backEnd2}/>
                        </div>
                        <div className = {classes.text}>
                            <span>{"Developed by Certified Magento Developers"}</span>
                        </div>
                    </div>

                    <div className = {classes.singleCol}>
                        <div className = {classes.media}>
                            <img alt={"12 months support"} className = {classes.memberImg} src = {backEnd3}/>
                        </div>
                        <div className = {classes.text}>
                            <span>{"12 months free support & updates"}</span>
                        </div>
                    </div>

                    <div className = {classes.singleCol}>
                        <div className = {classes.media}>
                            <img alt={"money back guarantee"} className = {classes.memberImg} src = {backEnd4}/>
                        </div>
                        <div className = {classes.text}>
                            <span>{"30 day money back guarantee"}</span>
                        </div>
                    </div>

                    <div className = {classes.singleCol}>
                        <div className = {classes.media}>
                            <img alt={"open source"}  className = {classes.memberImg} src = {backEnd5}/>
                        </div>
                        <div className = {classes.text}>
                            <span>{"100% open source and unencrypted code"}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

BackedByEveryThing.propTypes = {
    classes: shape({
        root: string,
        heading: string,
        line: string,
        singleCol: string,
        media: string,
        memberImg: string,
        text: string
    })
};

export default BackedByEveryThing;
