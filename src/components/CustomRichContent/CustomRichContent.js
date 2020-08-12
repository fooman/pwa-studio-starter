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
        /*return <Image
            alt={name}
            classes={{
                image: classes.image,
                root: classes.imageContainer
            }}
            height={IMAGE_HEIGHT}
            resource={small_image}
            widths={IMAGE_WIDTHS}
        />*/
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
