import React from 'react';
import ReactDOMServer from 'react-dom/server';
import parse , { domToReact } from 'html-react-parser';
import Image from "@magento/venia-ui/lib/components/Image";
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import RichContent from "@magento/venia-ui/lib/components/RichText";
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
            classes={{ image: classes.descriptionImage ,placeholder: classes.imagePlaceHolder }}
            src={attribs.src}
            title={attribs.title}
        />;
    }
    if(attribs.class === "media feature") {
        return  <ProductFeatureComponent content={domToReact(children,{ replace: replaceHtmlWithReact })}/>
    }
    else if(attribs.class === "customers-logos"){
        return  <HighlightedCustomersComponent content={domToReact(children,{ replace: replaceHtmlWithReact })}/>
    }
}

const CustomRichContent = ({ html }) => {
    return <RichContent content = { ReactDOMServer.renderToString(parse(html,{
             replace: replaceHtmlWithReact
     }))}/>
}

export const canRender = html => !!html;

export { CustomRichContent as Component };
