import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const TextInput = styled.TextInput`
    margin-left: 10px;
    width: 100%;
`;

const SearchInput = ({
    keyboardType = "default",
    placeholder,
    value,
    autoCapitalize = "none",
    onChangeText,
    returnKeyType = "done",
    onSubmitEditing = () => null,
    autoCorrect = true,
    loading,
}) => {
    
    return (
        <TextInput
            onChangeText={onChangeText}
            keyboardType={keyboardType}
            placeholder={placeholder}
            value={value}
            autoCapitalize={autoCapitalize}
            returnKeyType={returnKeyType}
            onSubmitEditing={onSubmitEditing}
            autoCorrect={autoCorrect}
            editable={!loading}
        />
    );
};


SearchInput.propTypes = {
    keyboardType: PropTypes.oneOf([
        "default",
        "number-pad",
        "decimal-pad",
        "numeric",
        "email-address",
        "phone-pad"
    ]),
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    autoCapitalize: PropTypes.oneOf([
        "none",
        "sentences",
        "words",
        "charaters",
    ]),
    onChangeText: PropTypes.func.isRequired,
    returnKeyType: PropTypes.oneOf([
        "done",
        "go",
        "next",
        "search",
        "send"
    ]),
    onSubmitEditing: PropTypes.func,
    autoCorrect: PropTypes.bool,
    loading: PropTypes.bool
}

export default SearchInput;