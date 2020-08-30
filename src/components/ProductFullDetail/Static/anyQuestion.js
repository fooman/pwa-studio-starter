import React, {useState} from 'react';

import Button from '@magento/venia-ui/lib/components/Button';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import {shape, string} from "prop-types";

import defaultClasses from './anyQuestion.css';
import ContactDialog from "../../contactDialog/contactDialog";


const AnyQuestion = props => {

    const [contactDialogIsOpen, setContactDialogIsOpen] = useState(false);

    const contactDialogHandler = () => {
        setContactDialogIsOpen(true);
    }

    const closeContactDialog = () => {
        setContactDialogIsOpen(false);
    }

    const classes = mergeClasses(defaultClasses, props.classes);

    const clickOnTryDemoHandler = () => {
        let win = window.open(props.demoUrl, '_blank');
        win.focus();
    }

    return (
        <div className={classes.backgroundImage}>
            <div  className={classes.backgroundImageInner}>
                <p className= {classes.developerName}><strong>{"Kristof"}</strong>{", Lead Magento Developer"}</p>
                <p className={classes.questionSection}>{"Any Questions?"}</p>
                <p className={classes.description}>{"Get in touch and I'll give you my honest opinion about whether I think this extension is right for you"}</p>
                <div className={classes.allButton}>
                    <Button
                        onClick={contactDialogHandler}
                        priority="high"
                    >
                        {"I have a question"}
                    </Button>
                    {props.demoUrl?
                        (
                            <Button
                                priority="low"
                                onClick = {clickOnTryDemoHandler}>
                                {"Try the demo"}
                            </Button>
                        ) :
                        null
                    }
                </div>

            </div>
            <ContactDialog onContactSupportClicked = {contactDialogIsOpen} closeContactDialogHandler = {closeContactDialog} />
        </div>
    );
}

AnyQuestion.propTypes = {
    classes: shape({
        backgroundImage: string,
        backgroundImageInner: string,
        developerName: string,
        questionSection: string,
        description: string,
        allButton: string
    })
};

export default AnyQuestion;
