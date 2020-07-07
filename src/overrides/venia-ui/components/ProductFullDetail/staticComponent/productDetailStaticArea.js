import React from 'react';

import { mergeClasses } from '@magento/venia-ui/lib/classify';
import {shape, string} from "prop-types";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlug, faKey} from "@fortawesome/free-solid-svg-icons";
import {faUsdCircle,faCopy,faBookOpen,faDownload} from "@fortawesome/pro-regular-svg-icons";
import '@fortawesome/fontawesome-svg-core/styles.css'

import defaultClasses from './productDetailStaticArea.css';




const ProductStaticArea = props => {

    const classes = mergeClasses(defaultClasses, props.classes);

    return (
        <div className={classes.setSectionMain} >
            <section className={classes.setSection}>
                <div className={classes.left}>
                    <div className={classes.leftInner}>
                        <div className={classes.leftImage}>
                            <div className={classes.iconDiv}>
                                <FontAwesomeIcon className={classes.iconStyle}  icon={faUsdCircle} />
                            </div>
                        </div>
                        <div  className={classes.leftText}>
                            <h3 className={classes.leftHeaderText}>{"Money back guarantee"}</h3>
                        <div>
                            <p className={classes.leftHeaderText2}>{"We stand behind the quality of our extensions with a 30 day money back guarantee"}</p>
                        </div>
                        </div>
                    </div>
                </div>
                <div className={classes.right}>
                    <div className={classes.leftInner}>
                        <div className={classes.leftImage}>
                            <div className={classes.iconDiv}>
                                <FontAwesomeIcon  className={classes.iconStyle} icon={faDownload} />
                            </div>
                        </div>
                        <div className={classes.leftText}>
                            <h3 className={classes.leftHeaderText}>{"Free updates"}</h3>
                            <div>
                                <p className={classes.leftHeaderText2}>{"All extensions include free updates for 12 months"}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>




            <section className={classes.setSection}>
                <div className={classes.left}>
                    <div className={classes.leftInner}>
                        <div className={classes.leftImage}>
                            <div className={classes.iconDiv}>
                                <FontAwesomeIcon  className={classes.iconStyle} icon={faCopy}/>
                            </div>
                        </div>
                        <div className={classes.leftText}>
                            <h3 className={classes.leftHeaderText}>{"Simple user manuals"}</h3>
                            <div>
                                <p className={classes.leftHeaderText2}>{"Easy to understand user manuals show you how to get the most out of your extension"}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classes.right}>
                    <div className={classes.leftInner}>
                        <div className={classes.leftImage}>
                            <div className={classes.iconDiv}>
                                <FontAwesomeIcon className={classes.iconStyle} icon={faBookOpen} />
                            </div>
                        </div>
                        <div className={classes.leftText}>
                            <h3 className={classes.leftHeaderText}>{"Open source code"}</h3>
                            <div>
                                <p className={classes.leftHeaderText2}>{"Our code is 100% open source and unencrypted. Easily add your own customisations"}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className={classes.setSection}>
                <div className={classes.left}>
                    <div className={classes.leftInner}>
                        <div className={classes.leftImage}>
                            <div className={classes.iconDiv}>
                                <FontAwesomeIcon className={classes.iconStyle} transform="rotate-45" icon={faPlug} />
                            </div>
                        </div>
                        <div className={classes.leftText}>
                            <h3 className={classes.leftHeaderText}>{"Quality support"}</h3>
                            <div>
                                <p className={classes.leftHeaderText2}>{"Our friendly team provides expert product support and troubleshooting"}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classes.right}>
                    <div className={classes.leftInner}>
                        <div className={classes.leftImage}>
                            <div className={classes.iconDiv}>
                                <FontAwesomeIcon className={classes.iconStyle} icon={faKey} />
                            </div>
                        </div>
                        <div className={classes.leftText}>
                            <h3 className={classes.leftHeaderText}>{"Easy licensing"}</h3>
                            <div>
                                <p className={classes.leftHeaderText2}>{"One license per Magento installation, including multi store setups and test sites. Easy!"}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

ProductStaticArea.propTypes = {
    classes: shape({
        setSectionMain: string,
        setSection: string,
        left: string,
        right: string,
        leftInner: string,
        leftImage: string,
        leftText: string,
        leftHeaderText: string,
        leftHeaderText2: string,
        iconStyle: string,
        iconDiv: string
    })
};

export default ProductStaticArea;
