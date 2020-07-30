import React from 'react';
import ReactDOMServer from 'react-dom/server';
import parse, { domToReact } from 'html-react-parser';
import Image from "@magento/venia-ui/lib/components/Image";
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import RichContent from "@magento/venia-ui/lib/components/RichText";
import defaultClasses from './CustomRichContent.css';

const CustomRichContent = ({ html }) => {
    const classes = mergeClasses(defaultClasses);
    return <RichContent content = { ReactDOMServer.renderToString(parse(html,{
             replace: domNode => {
             if (domNode.attribs && domNode.attribs.src) {
                 return <Image
                     classes={{ image: classes.descriptionImage }}
                     alt={domNode.attribs.alt}
                     src={domNode.attribs.src}
                     title={domNode.attribs.title}
                 />;
             }
             if(domNode.attribs && domNode.attribs.class === "customers-logos"){
                 return  <div className="custom-customer-logos" >
                             {domToReact(domNode.children)}
                        </div>
             }
         }
     })
 )}/>
}

export const canRender = html => !!html;

export { CustomRichContent as Component };
