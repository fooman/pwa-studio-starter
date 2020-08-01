import React from "react";
import { useQuery } from '@apollo/react-hooks';
import testimonialQuery from './getTestimonialsForProfile.graphql';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import defaultClasses from './customerProfile.css';
import ProfileContent from './profileContent';
import { shape, string } from "prop-types";

const CustomerProfile = () => {
    const {data} = useQuery(testimonialQuery);
    let items;
    let itemLength;

    items = data ? data.testimonials.items : [];
    itemLength = items.length;

    const classes = mergeClasses(defaultClasses);

    const logoHandleClick = (url) => {
        window.open(url, '_blank')
    }

    const mappedItems = () => {
        return items && items.map((singleItem , index) => {
            if (singleItem.content) {
                return (
                    <div key={index}>
                        <ProfileContent
                            singleItem = {singleItem}
                            itemIndex = {index}
                            itemLength = {itemLength}
                            logoHandleClick = {logoHandleClick}
                        />
                    </div>
                );
            }
        });
    }

    return (
        <div className={classes.root}>
            <div >
                <h1 className={classes.heading}>{'Customer Profiles'}</h1>
            </div>
            <div>
                {mappedItems()}
            </div>
        </div>
    );
}

CustomerProfile.propTypes = {
    classes: shape({
        root: string,
        heading: string
    })
};

export default CustomerProfile;
