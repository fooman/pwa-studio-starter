import React from 'react';
import parse from 'html-react-parser';
import Image from "@magento/venia-ui/lib/components/Image";
import RichContent from "@magento/venia-ui/lib/components/RichContent";

const CustomRichContent = ({ html }) => {
     return parse(html,{
         replace: domNode => {
             if (domNode.attribs && domNode.attribs.src) {
                 return <Image
                     style={{width: domNode.attribs.width,lineHeight:"1.5rem"}}
                     alt={domNode.attribs.alt}
                     src={domNode.attribs.src}
                     title={domNode.attribs.title}
                 />;
             }
         }
     });
     // return <RichContent html={html}/>

}

export const canRender = (html) => /^[^<>]+$/gm.test(html);
export { CustomRichContent as Component };
