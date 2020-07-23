import React, { Fragment } from "react";
import { Price } from "@magento/peregrine";
import RadioGroup from "@magento/venia-ui/lib/components/RadioGroup";

export const ProductOptionsRadio = props => {
    const {
        radioValue: values,
        initialSelection,
        price: { regular_price : { amount: {currency = 'USD'} = {} } = {}} = {},
        handleSelectionChange,
        classes,
        option_id,
        fieldErrorObj
    } = props
    const priceElement = (option) =>{
       return option.price !== 'none'
           ? <span className={classes.price}>
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
            value: option.price === 'none' ? option.price : option.option_type_id.toString()
        };
    });
    return (
        <div>
            <div>
                <RadioGroup
                    classes={classes}
                    field="option"
                    initialValue={initialSelection}
                    items={radioComponents}
                    onValueChange={handleSelectionChange}
                />
            </div>
            <div style={{color: "red" , paddingTop: '0.625rem'}}>
                {fieldErrorObj[option_id] ? (<span style={{color: "red"}}>{fieldErrorObj[option_id]}</span>) : false}
            </div>
        </div>
    );

}
