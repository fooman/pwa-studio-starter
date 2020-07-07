import React from 'react';

import { mergeClasses } from '@magento/venia-ui/lib/classify';
import {shape, string} from "prop-types";


import defaultClasses from '../productOptionsComponent/RadioTextArea.css';


const RadioTextArea = props => {

    let TextOption;
    let RadioOption;

    props.productOptions.map((options)=>{
        if(options.__typename==="CustomizableFieldOption") {
            TextOption=options;
        }
        else if(options.__typename==="CustomizableRadioOption"){
            RadioOption=options
        }
    })

    const classes = mergeClasses(defaultClasses, props.classes);


    return (
            <section>
                {
                    TextOption!==undefined &&
                    <React.Fragment>
                        <label className={classes.urlText}>{TextOption.title}</label>
                        <span className={classes.urlExclamation}>&nbsp;*</span>

                        <input type="text" className={classes.userText}/>
                    </React.Fragment>
                }
                {RadioOption!==undefined &&
                    <React.Fragment>
                        <div className={classes.radio_label}>
                            <input id="radio-1" name="radio" type="radio" checked/>
                            <label htmlFor="radio-1" >None</label>
                        </div>

                        {RadioOption.radioValue.map((radiovalue)=>(
                            <div className={classes.radio_label}>
                                <input id={`radio-${radiovalue.option_type_id}`} name="radio" type="radio"/>
                                <label htmlFor={`radio-${radiovalue.option_type_id}`}>{radiovalue.title} <span
                                    className="price-notice">&nbsp;+<span className="price">US${radiovalue.price}</span></span></label>
                            </div>
                        ))}

                    </React.Fragment>
                }
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
