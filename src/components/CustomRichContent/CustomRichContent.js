import React from 'react';
import ReactDOMServer from 'react-dom/server';
import parse from 'html-react-parser';
import Image from "@magento/venia-ui/lib/components/Image";
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import RichContent from "@magento/venia-ui/lib/components/RichText";
import HighlightedCustomersComponent  from "./HighlightedCustomersComponent";
import ProductFeatureComponent  from "./ProductFeatureComponent";
import defaultClasses from "./CustomRichContent.css";


const CustomRichContent = ({ html }) => {
    const classes = mergeClasses(defaultClasses);
    return <RichContent content = { ReactDOMServer.renderToString(parse(html,{
             replace: domNode => {
                 if(domNode.attribs){
                     if(domNode.attribs.class === "media feature") {
                         return  <ProductFeatureComponent content={domNode.children}/>
                     }
                     else if(domNode.attribs.class === "customers-logos"){
                         return  <HighlightedCustomersComponent content={domNode.children}/>
                     }
                     if (domNode.attribs.src) {
                         return <Image
                             alt={domNode.attribs.alt}
                             style={{width:`${domNode.attribs.width}px`}}
                             classes={{ image: classes.descriptionImage ,placeholder: classes.imagePlaceHolder }}
                             src={domNode.attribs.src}
                             title={domNode.attribs.title}
                         />;
                     }
                 }
         }
     }))}/>
}

export const canRender = html => !!html;

export { CustomRichContent as Component };
