/**
 * TODO Document
 */
export const appendOptionsToPayload = (
    payload,
    optionSelections,
    optionCodes = null
) => {
    const { item } = payload;

    if (!optionCodes) {

        optionCodes = new Map();
        if (item.configurable_options) {
            for (const option of item.configurable_options) {
                optionCodes.set(Number(option.attribute_id), option.attribute_code);
            }
        }
    }

    const options = optionSelections?  Array.from(optionSelections, ([id, value]) => ({
        id,
        value_string: value
    })) : [{id: 0, value_string: '0'}];

    Object.assign(payload, {
        options,
        parentSku: item.sku,
        item
    });

    return payload;
};
