import React from 'react';
import { shape, string } from 'prop-types';
import { useFooter } from '@magento/peregrine/lib/talons/Footer/useFooter';

import { mergeClasses } from '@magento/venia-ui/lib/classify';
import defaultClasses from './footer.css';
import GET_STORE_CONFIG_DATA from '@magento/venia-ui/lib/queries/getStoreConfigData.graphql';
import { Link, resourceUrl } from '@magento/venia-drivers';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin, faTwitterSquare } from '@fortawesome/free-brands-svg-icons'
import Image from "@magento/venia-ui/lib/components/Image";
import logo from "../Logo/FoomonLogo_Landscape_White.svg";
import extdn from "../../../../../assets/ExtDN_Logo.svg";

const Footer = props => {
    const classes = mergeClasses(defaultClasses, props.classes);

    const talonProps = useFooter({
        query: GET_STORE_CONFIG_DATA
    });
    const { copyrightText } = talonProps;

    let copyright = null;
    if (copyrightText) {
        copyright = <span>{copyrightText}</span>;
    }

    return (
        <footer className={classes.root}>
            <section className={classes.tile}>
                <Image
                    style={{height: "40px"}}
                    alt="Fooman"
                    src={logo}
                    title="Fooman"
                />
                <p className={classes.tileBody}>
                    Copyright Fooman
                </p>
                <a style={classes.link} aria-label="Kristof Ringleff on LinkedIn" href={'https://www.linkedin.com/in/kristofringleff'}>
                    <FontAwesomeIcon icon={faLinkedin} color={'white'} size={'2x'}/>
                </a>
                <a className= {classes.mlTen} style={classes.link} aria-label="foomanNZ on Twitter" href={'https://twitter.com/foomanNZ'}>
                    <FontAwesomeIcon icon={faTwitterSquare} color={'white'} size={'2x'}/>
                </a>

                <p className={classes.tileBody}>
                    Proud member of
                </p>
                <Image
                    style={{height: "40px"}}
                    alt="ExtDN"
                    src={extdn}
                    title="ExtDN"
                />
            </section>
            <section className={classes.tile}>
                <h3 className={classes.tileTitle}>Extensions</h3>
                <ul className={classes.tileBody}>
                    <li>
                        <Link className={classes.link} to={resourceUrl('/extensions.html')}>
                            Magento 1
                        </Link>
                    </li>
                    <li>
                        <Link className={classes.link} to={resourceUrl('/extensions/magento2.html')}>
                            Magento 2
                        </Link>
                    </li>
                    <li>
                        <Link className={classes.link} to={resourceUrl('/extensions/magento2/free-m2.html')}>
                            Free Stuff
                        </Link>
                    </li>
                    <li>
                        <Link className={classes.link} to={resourceUrl('/terms')}>
                            License Agreement
                        </Link>
                    </li>
                </ul>
            </section>
            <section className={classes.tile}>
                <h3 className={classes.tileTitle}>Fooman</h3>
                <ul className={classes.tileBody}>
                    <li>
                        <Link className={classes.link} to={resourceUrl('/about-fooman')}>
                            About Fooman
                        </Link>
                    </li>
                    <li>
                        <Link className={classes.link} to={resourceUrl('/customer-profiles')}>
                            Customer Case Studies
                        </Link>
                    </li>
                    <li>
                        <Link className={classes.link} to={resourceUrl('/privacy')}>
                            Privacy
                        </Link>
                    </li>
                </ul>
            </section>
            <section className={classes.tile}>
                <h3 className={classes.tileTitle}>Support</h3>
                <ul className={classes.tileBody}>
                    <li>
                        <a style={classes.link} href='https://magento1-support.fooman.co.nz/'>
                            Magento 1 Help Centre
                        </a>
                    </li>
                    <li>
                        <a style={classes.link} href='https://magento2-support.fooman.co.nz/'>
                            Magento 2 Help Centre
                        </a>
                    </li>
                    <li>
                        <Link className={classes.link} to={resourceUrl('/contacts')}>
                            Contact Support
                        </Link>
                    </li>
                </ul>
            </section>
        </footer>
    );
};

Footer.propTypes = {
    classes: shape({
        copyright: string,
        root: string,
        tile: string,
        tileBody: string,
        tileTitle: string,
        mlTen: string
    })
};

export default Footer;
