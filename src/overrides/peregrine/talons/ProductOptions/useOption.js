import { useCallback, useMemo, useState } from 'react';

/**
 * Talon for Option.
 *
 * @param {number} props.attribute_id the id of the option
 * @param {string} props.label the label for the option
 * @param {function} props.onSelectionChange callback handler for when the option is clicked
 * @param {string} props.selectedValue the label of the selected option
 * @param {array} props.values an array containing possible values
 */
export const useOption = props => {
    const {
        option_id,
        title,
        onSelectionChange,
        selectedValue,
        values
    } = props;
    let valuesMap
    const [selection, setSelection] = useState(null);
    const initialSelection = useMemo(() => {
        let initialSelection = 'none'
        const searchValue = selection || selectedValue;
        if (searchValue) {
            initialSelection =
                values.find(value => value.title === searchValue) || {};
        }
        return initialSelection;
    }, [selectedValue, selection, values]);
    if(values.length) {
        valuesMap = useMemo(() => {
            return new Map(
                values.map(value => [value.option_type_id, value.title])
            );
        }, [values]);
    }

    const handleSelectionChange = useCallback(
        selection => {
            setSelection(valuesMap.get(selection));
            if (onSelectionChange) {
                onSelectionChange(option_id, selection);
            }
        },
        [option_id, onSelectionChange, valuesMap]
    );

    const handleTextChange = useCallback( (selection) => {
        if (onSelectionChange) {
            onSelectionChange(option_id, selection);
        }
    } ,[option_id, onSelectionChange])
    return {
        handleSelectionChange,
        initialSelection,
        handleTextChange,
    };
};
