import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import constants from "../constants";

const Container = styled.View`
    margin-bottom: 10px;
`;

const TextInput = styled.TextInput`
    width: ${constants.width / 1.5}px;
    padding: 10px;
    background-color: ${props => props.theme.greyColor};
    border: 1px solid ${props => props.theme.lightGreyColor};
    border-radius: 4px;
`;

const AuthInput = ({
    keyboardType = "default",
    placeholder,
    value,
    autoCapitalize = "none",
    onChangeText,
    returnKeyType = "done",
    onSubmitEditing = () => null,
    autoCorrect = true,
    loading,
}) => (
        <Container>
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
        </Container>
    );


AuthInput.propTypes = {
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

export default AuthInput;