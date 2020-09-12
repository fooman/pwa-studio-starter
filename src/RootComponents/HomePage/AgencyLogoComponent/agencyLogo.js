import React from "react";
import range from 'lodash/range';
import Button from "@magento/venia-ui/lib/components/Button";
import {shape, string} from "prop-types";
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import Image from "@magento/venia-ui/lib/components/Image";
import defaultClasses from "./agencyLogo.css";
import { Link, resourceUrl } from '@magento/venia-drivers';

const AgencyLogo = ({data}) => {

    const classes = mergeClasses(defaultClasses);

    const noOfItems = (data.testimonials && data.testimonials.items && data.testimonials.items.length) || 0;

    const imgArray = (data.testimonials && data.testimonials.items) || [];

    const carouselItems = range(noOfItems).map(index => (
        <div key={index} className={classes.imgDiv}>
            <Image
                alt={imgArray[index].name + " Agency Logo"}
                classes={{
                    root: classes.imgDiv,
                    image: classes.imgCls,
                    loaded: classes.imgWidth,
                }}
                src={imgArray[index].logo_image}
            />
        </div>
    ));

    if (data) {
        return (
            <div className = {classes.root}>
                <h2 className={classes.h2}>{`Trusted by Leading Developers and Digital Agencies`}</h2>
                <div className={classes.wrapper}>
                    {carouselItems}
                </div>
                <Link className={classes.link} to={resourceUrl('/customer-profiles')}>
                    <div className = {classes.btnDiv}>
                        <Button className={classes.btnCls}
                                priority="normal"
                        >
                            {"Read Client Stories"}
                        </Button>
                    </div>
                </Link>
            </div>
        );
    }
    return null;
}

AgencyLogo.propTypes = {
    classes: shape({
        root: string,
        h2: string,
        wrapper: string,
        btnDiv: string,
        btnCls: string,
        imgDiv: string,
        imgCls: string,
        imgWidth :string
    })
};

export default AgencyLogo;
