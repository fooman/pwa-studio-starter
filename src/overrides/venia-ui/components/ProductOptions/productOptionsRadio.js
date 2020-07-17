import React, { Fragment } from "react";
import { Price } from "@magento/peregrine";
import RadioGroup from "@magento/venia-ui/lib/components/RadioGroup";

export const ProductOptionsRadio = props => {
    const {
        radioValue: values,
        initialSelection,
        price: { regular_price : { amount: {currency = 'USD'} = {} } = {}} = {},
        handleSelectionChange,
        classes
    } = props
    const priceElement = (option) =>{
       return option.price !== 'none'
           ? <span>
               <span>+</span>
               <Price value={option.price} currencyCode={currency} />
           </span>
           : '';
}
    const radioComponents = values.map(option => {
        const price = priceElement(option)
        return {
            label: (
                    <Fragment>
                        <span>{option.title}</span>
                        {price}
                    </Fragment>

            ),
            value: option.price
        };
    });
    return (
        <RadioGroup
            classes={classes}
            field="option"
            initialValue={initialSelection}
            items={radioComponents}
            onValueChange={handleSelectionChange}
        />
    );

}
