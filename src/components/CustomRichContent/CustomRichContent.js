import React from 'react';
import ReactDOMServer from 'react-dom/server';
import parse , { domToReact } from 'html-react-parser';
import Image from "@magento/venia-ui/lib/components/Image";
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import RichContent from "@magento/venia-ui/lib/components/RichContent";
import HighlightedCustomersComponent  from "./HighlightedCustomersComponent";
import ProductFeatureComponent  from "./ProductFeatureComponent";
import defaultClasses from "./CustomRichContent.css";

const classes = mergeClasses(defaultClasses);

function replaceHtmlWithReact({ attribs, children , type , name }) {
    if (!attribs) return;
    if (type === "tag" && name === "img") {
        return <Image
            alt={attribs.alt}
            style={{width:`${attribs.width}px`}}
            classes={{ image: classes.descriptionImage ,root: classes.imageContainer,placeholder: classes.imagePlaceHolder }}
            src={new URL(attribs.src).pathname}
            title={attribs.title}
        />;
    }
    if(attribs.class === "media feature") {
        const data = children && children.length && children.map(item => {
            if(item && item.attribs) {
                if(item.attribs.class === "bd"){
                    item.attribs.class = classes.featureBd
                }
                else if(item.attribs.class === "img"){
                    item.attribs.class = classes.featureImgLeft
                }
                else if(item.attribs.class === "imgExt"){
                    item.attribs.class = classes.featureImgRight
                }
            }
            return item;
        })
        return  <ProductFeatureComponent content={domToReact(data,{ replace: replaceHtmlWithReact })}/>
    }
    else if(attribs.class === "customers-logos"){
        return  <HighlightedCustomersComponent content={domToReact(children,{ replace: replaceHtmlWithReact })}/>
    }

}

const CustomRichContent = ({ html }) => {
    return <RichContent html = { ReactDOMServer.renderToString(parse(html,{
             replace: replaceHtmlWithReact
     }))}/>
}


export default  CustomRichContent ;
