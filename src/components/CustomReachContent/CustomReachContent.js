// import React from 'react';
// import BaseRichContent from '@magento/venia-ui/lib/components/RichContent';
// import WordArt from 'react-wordart';
//
// // If the content is just words, make 'em BLUE words.
// export const RichContent = ({ html }) =>
//     /^[^<>]+$/gm.test(html) ? ( // no tags!
//         <WordArt text={html} theme="blues" fontSize={200} />
//     ) : (
//         <BaseRichContent html={html} />
//     );

import React from 'react';
import WordArt from 'react-wordart';
import RichContent from '@magento/venia-ui/lib/components/RichContent';
const noTags = /<\/?[a-z][\s\S]*>/i;
const BlueWords = ({ html }) => {
    return !noTags.test(html) ? ( // no tags!
            <WordArt text={html} theme="blues" fontSize={200} />
            ) : (
            <RichContent html = {html} />
         );
}
export const canRender = html => !noTags.test(html);
export { BlueWords as Component };
