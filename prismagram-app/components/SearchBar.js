import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import constants from "../constants";
import { Ionicons } from '@expo/vector-icons';
import styles from "../styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import SearchInput from "./SearchInput";

const View = styled.View`
    padding: 5px;
    flex-direction: row;
    width: ${constants.width - 20}px;
    border-radius: 5px;
`;

const SearchBar = ({ onChangeText, value, onSubmit }) => {
    return (
        <TouchableOpacity onPress={() => null}>
            <View>
                <Ionicons name={Platform.OS === "ios" ? "ios-search" : "md-search"} color={styles.darkGreyColor} size={23} />
                <SearchInput
                    keyboardType={"default"}
                    value={value}
                    onChangeText={onChangeText}
                    textAlign={"left"}
                    placeholder={"Search"}
                    returnKeyType={"search"}
                    onSubmitEditing={onSubmit}
                />
            </View>
        </TouchableOpacity>
    );
};

SearchBar.propTypes = {
    onChangeText: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
}

export default SearchBar;