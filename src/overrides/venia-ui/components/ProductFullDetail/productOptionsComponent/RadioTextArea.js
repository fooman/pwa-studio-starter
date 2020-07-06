import React from 'react';

import { mergeClasses } from '@magento/venia-ui/lib/classify';
import {shape, string} from "prop-types";


import defaultClasses from '../productOptionsComponent/RadioTextArea.css';


const RadioTextArea = props => {

    const productDetailRadioOptions=props.productDeatil.options[1].radioValue;
    const classes = mergeClasses(defaultClasses, props.classes);

    return (
            <section>
                <label className={classes.urlText}>URL of main store:</label> <span className={classes.urlExclamation}>*</span>
                <input type="text" className={classes.userText}/>
                <div className={classes.radio_label}>
                    <input id="radio-1" name="radio" type="radio" checked/>
                        <label htmlFor="radio-1" >None</label>
                </div>

                <div className={classes.radio_label}>
                    <input id="radio-2" name="radio" type="radio" />
                        <label htmlFor="radio-2">{productDetailRadioOptions[0].title} <span
                            className="price-notice">&nbsp;+&nbsp;<span className="price">US$31.98</span></span></label>
                </div>

                <div className={classes.radio_label}>
                    <input id="radio-3" name="radio" type="radio" />
                    <label htmlFor="radio-3">{productDetailRadioOptions[1].title}<span
                        className="price-notice">&nbsp;+&nbsp;<span >US$42.42</span></span></label>
                </div>
            </section>
    );
}

RadioTextArea.propTypes = {
    classes: shape({
        urlToMainStore:string,
        urlText:string,
        urlExclamation:string,
        userText:string,
        radio_label:string,
    })
};

export default RadioTextArea;
