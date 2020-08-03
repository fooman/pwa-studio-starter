import React from "react";
import RichContent from '@magento/venia-ui/lib/components/RichContent';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import defaultClasses from './profileContent.css';
import { shape, string } from "prop-types";

const ProfileContent = props => {
    const {
        singleItem,
        itemIndex,
        itemLength,
        logoHandleClick
    } = props;

    const classes = mergeClasses(defaultClasses);
    let { url, logo_image, content, hero_image } = singleItem;
    return (
        <div key={itemIndex}>
        <div>
            <div>
                <div className={classes.wrapImgDesc}>
                <div className={classes.imgDiv}>
                    <a onClick={() => logoHandleClick(url)}>
                        <img className={classes.imgTag} src={logo_image}/>
                    </a>
                </div>
                <div className={classes.desc}>
                    <RichContent className={classes.richParagraph} html = {content} />
                    <div className={classes.wrapHeroImgDic}>
                        <div className={classes.heroImgDiv}>
                            <img className={classes.heroImgSrc} src={hero_image}/>
                        </div>
                        <div className={classes.heroImgDiv}>
                            {/*extension used data*/}
                        </div>
                    </div>
                </div>
            </div>

            </div>
        </div>
            {(itemLength - 1) !== itemIndex ? <hr/> : <div className = {classes.lastContentSpas}></div>}
        </div>
    );
}

ProfileContent.propTypes = {
    classes: shape({
        wrapImgDesc: string,
        imgDiv: string,
        imgTag: string,
        desc: string,
        heroImgDiv: string,
        wrapHeroImgDic: string,
        heroImgSrc: string,
        richParagraph: string,
        lastContentSpas: string
    })
};

export default ProfileContent;
