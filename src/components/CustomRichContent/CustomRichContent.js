import React from 'react';
import ReactDOMServer from 'react-dom/server';
import parse , { domToReact } from 'html-react-parser';

import RichContent from "@magento/venia-ui/lib/components/RichContent";
import HighlightedCustomersComponent  from "./HighlightedCustomersComponent";
import ProductFeatureComponent  from "./ProductFeatureComponent";

function replaceHtmlWithReact({attribs, children, type, name}) {
    if (!attribs) {
        return;
    }
    if (type === "tag" && name === "img") {
        return <img
            alt={attribs.alt}
            src={new URL(attribs.src).pathname}
            title={attribs.title}
        />;
    }
    if (attribs.class === "media feature") {
        return <ProductFeatureComponent content={domToReact(children, {replace: replaceHtmlWithReact})}/>
    } else if (attribs.class === "customers-logos") {
        return <HighlightedCustomersComponent content={domToReact(children, {replace: replaceHtmlWithReact})}/>
    }
}

const CustomRichContent = ({html}) => {
    return <RichContent html={ReactDOMServer.renderToString(parse(html, {
        replace: replaceHtmlWithReact
    }))}/>
}


export default  CustomRichContent ;
