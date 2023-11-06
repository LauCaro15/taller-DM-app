import React from "react";
import MultiSelect from "react-native-multiple-select";



const MultipleSelect = (fn, selected, onChange) => {
    

    state = {
        selectedItems : []
    };

    const onSelectedItemsChange = selectedItems => {
        this.setState({ selectedItems });
    };

    return (
        <MultiSelect
            items={fn}
            uniqueKey="_id"
            onSelectedItemsChange={onChange}
            selectedItems={selected}
            selectText="Selecciona categorías"
            searchInputPlaceholderText="Buscar categorías..."
            tagRemoveIconColor="red"
            tagBorderColor="blue"
            tagTextColor="blue"
            selectedItemTextColor="blue"
            selectedItemIconColor="blue"
            itemTextColor="black"
            displayKey="name"
            searchInputStyle={{ color: "black" }}
        />

    );
};

export default MultipleSelect;
