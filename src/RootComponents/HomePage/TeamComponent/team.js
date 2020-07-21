import React from "react";

import {shape, string} from "prop-types";
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import kristofRingleff from './images/Kristof-Ringleff-Fooman.png';
import Dusan from './images/Dusan.jpg';
import Michael from './images/Michael_B_W.jpg';
import Martha from './images/Martha_B_W.jpg';
import Irfan from './images/Irfan.jpg';
import developerPlus from './images/developer_plus.png';
import defaultClasses from "./team.css";

const Team = () => {
    const classes = mergeClasses(defaultClasses);

    return (
        <div className = {classes.root}>
            <div className = {classes.heading}>
                <h2>{"...developed & supported by our team of Magento enthusiasts..."}</h2>
                <div className = {classes.line}>
                    <div className = {classes.singleCol}>
                        <div className = {classes.mediaMember}>
                            <div className = {classes.frameWrapper}>
                                <div className = {classes.roundFrame}>
                                    <img src = {kristofRingleff} />
                                </div>
                                <img src = {developerPlus} />
                            </div>
                            <div style={{clear: "both"}}></div>
                            <div>
                                <span className={classes.memberName}>{"Kristof"}</span>
                                <br/>
                                <span className={classes.memberRole}>{"Lead Magento Developer"}</span>
                            </div>
                        </div>
                    </div>

                    <div className = {classes.singleCol}>
                        <div className = {classes.mediaMember}>
                            <div className = {classes.frameWrapper}>
                                <div className = {classes.roundFrame}>
                                    <img src = {Dusan} />
                                </div>
                                <img src = {developerPlus} />
                            </div>
                            <div style={{clear: "both"}}></div>
                            <div>
                                <span className={classes.memberName}>{"Dusan"}</span>
                                <br/>
                                <span className={classes.memberRole}>{"Magento Developer"}</span>
                            </div>
                        </div>
                    </div>

                    <div className = {classes.singleCol}>
                        <div className = {classes.mediaMember}>
                            <div className = {classes.frameWrapper}>
                                <div className = {classes.roundFrame}>
                                    <img src = {Michael} />
                                </div>
                            </div>
                            <div style={{clear: "both"}}></div>
                            <div>
                                <span className={classes.memberName}>{"Michael"}</span>
                                <br/>
                                <span className={classes.memberRole}>{"Customer Support"}</span>
                            </div>
                        </div>
                    </div>

                    <div className = {classes.singleCol}>
                        <div className = {classes.mediaMember}>
                            <div className = {classes.frameWrapper}>
                                <div className = {classes.roundFrame}>
                                    <img src = {Martha} />
                                </div>
                            </div>
                            <div style={{clear: "both"}}></div>
                            <div>
                                <span className={classes.memberName}>{"Martha"}</span>
                                <br/>
                                <span className={classes.memberRole}>{"Customer Support"}</span>
                            </div>
                        </div>
                    </div>

                    <div className = {classes.singleCol}>
                        <div className = {classes.mediaMember}>
                            <div className = {classes.frameWrapper}>
                                <div className = {classes.roundFrame}>
                                    <img src = {Irfan} />
                                </div>
                            </div>
                            <div style={{clear: "both"}}></div>
                            <div>
                                <span className={classes.memberName}>{"Irfan"}</span>
                                <br/>
                                <span className={classes.memberRole}>{"Customer Support"}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

Team.propTypes = {
    classes: shape({
        root: string,
        heading: string,
        line: string,
        singleCol: string,
        mediaMember: string,
        frameWrapper: string,
        roundFrame: string,
        memberName: string,
        memberRole: string
    })
};

export default Team;
