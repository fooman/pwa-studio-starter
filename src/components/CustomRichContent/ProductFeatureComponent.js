import React from 'react';
import  { domToReact } from 'html-react-parser';

const ProductFeatureComponent = props => {
    return <div className="mediaFeature">{domToReact(props.content)}</div>
}

export default ProductFeatureComponent;
