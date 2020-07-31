import React from 'react';
import  { domToReact } from 'html-react-parser';

const HighlightedCustomersComponent = props => {
    return <div className="customersLogos">{domToReact(props.content)}</div>
}

export default HighlightedCustomersComponent;

