import React, {useRef} from "react";

import { mergeClasses } from '@magento/venia-ui/lib/classify';

import defaultClasses from './composerInfo.css';

import Button from "@magento/venia-ui/lib/components/Button";

import {shape, string} from "prop-types";

import {CopyToClipboard} from 'react-copy-to-clipboard';

const ComposerInfo = props => {

    const { uniqueRepoUrlItem } = props;

    const classes = mergeClasses(defaultClasses);

    const commandEl = useRef(null);

    const viewBtnClickHandle = (repoUrl) => {
        let win = window.open(repoUrl, '_blank');
        win.focus();
    }

    let mappedUniqueRepoUrl = uniqueRepoUrlItem.map((singleUrl, index) => {
        let slash = "\\";
        let newLine = "\n";
        let commandLine = `composer config repositories.fooman composer${slash}${singleUrl}`;
        let commandWithNewLine = `composer config repositories.fooman composer${slash}${newLine}${singleUrl}`;
        return (
            <div key={index} className={classes.commandSection}>
                <div className = {classes.headingUrl}>
                    {singleUrl}
                </div>
                <div className={classes.commandDescription}>
                    {`Copy and paste the below command and run it from your Magento 2 root directory as
                    the first step of your installation process (all lines are part of the same command):`}
                </div>
                <div className={classes.wrapCommandSection}>
                    <div className = {classes.commandLine}>
                        <textarea
                            ref={commandEl}
                            value={commandWithNewLine}
                        />
                    </div>
                    <div className={classes.btnSection}>
                        <div>
                            <Button onClick = {() => viewBtnClickHandle(singleUrl)}
                                    priority="low"
                            >
                                {"View"}
                            </Button>
                        </div>
                        <div>
                            <CopyToClipboard text={commandLine}>
                                <Button
                                    priority="low"
                                >
                                    {"Copy"}
                                </Button>
                            </CopyToClipboard>
                        </div>
                    </div>
                </div>
            </div>
        );
    });

    return (
        <div>
            <h1 className={classes.heading}>{`Magento 2 Extension Installation`}</h1>
            <div className={classes.title}>{`Command for setting up Fooman Hosted Installation Method`}</div>
            {mappedUniqueRepoUrl}
        </div>
    )
}

ComposerInfo.propTypes = {
    classes: shape({
        root: string,
        heading: string,
        title: string,
        commandSection: string,
        headingUrl: string,
        commandDescription: string,
        wrapCommandSection: string,
        commandLine: string,
        btnSection: string
    })
};

export default ComposerInfo;
