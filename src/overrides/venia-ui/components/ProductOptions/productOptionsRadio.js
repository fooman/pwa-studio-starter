import React, { Fragment } from "react";
import { Price } from "@magento/peregrine";
import RadioGroup from "@magento/venia-ui/lib/components/RadioGroup";

export const ProductOptionsRadio = props => {
    const {
        radioValue:
        values,
        price : {
            regularPrice: {
                amount = {}
            } = {}
        } = {},
        initialSelection,
        handleSelectionChange,
        classes
    } = props
    const priceElement = amount ? (
        <Price value={amount.value} currencyCode={amount.currency} />
    ) : (
        <span>FREE</span>
    );
    const radioComponents = values.map(option => {
        return {
            label: (
                    <Fragment>
                        <span>{option.title}</span>
                        <span>+</span>
                        <span>{priceElement}</span>
                    </Fragment>

            ),
            value: option.option_type_id
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
