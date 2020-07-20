import React from "react";

import {shape, string} from "prop-types";
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import defaultClasses from "./team.css";

const Team = () => {
    const classes = mergeClasses(defaultClasses);

    return (
        <div className = {classes.teamRoot}>
        </div>
    );
}

Team.propTypes = {
    classes: shape({
        teamRoot: string
    })
};

export default Team;
