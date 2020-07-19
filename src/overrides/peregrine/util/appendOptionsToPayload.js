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
        for (const option of item.configurable_options) {
            optionCodes.set(Number(option.attribute_id), option.attribute_code);
        }
    }

    const options = Array.from(optionSelections, ([id, value]) => ({
        id,
        value_string: value
    }));
    Object.assign(payload, {
        options,
        parentSku: item.sku,
        item
    });

    return payload;
};
