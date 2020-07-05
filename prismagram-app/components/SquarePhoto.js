import React from "react";
import styled from "styled-components";
import { Image } from "react-native";
import PropTypes from "prop-types";
import constants from "../constants";
import { useNavigation } from "@react-navigation/native";

const TouchableOpacity = styled.TouchableOpacity`
    width: ${constants.width / 3}px;
    height: ${constants.width / 3}px;
    padding: 1.5px;
`;

const SquarePhoto = ({ files = [], id }) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => navigation.navigate("Detail", { id })}>
            <Image
                source={{ uri: files.length > 0 ? files[0].url : "" }}
                style={{ width: "100%", height: "100%" }}
            />
        </TouchableOpacity>
    );
};

SquarePhoto.propTypes = {
    files: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired
        })
    ).isRequired,
    id: PropTypes.string.isRequired
};

export default SquarePhoto;