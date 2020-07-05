import React from "react";
import styled from "styled-components";
import { ActivityIndicator } from "react-native";
import constants from "../constants";
import PropTypes from "prop-types";

const Touchable = styled.TouchableOpacity`
`;
const Container = styled.View`
    background-color: ${props => props.bgColor ? props.bgColor : props.theme.blueColor};
    padding: 8px ${constants.width / 20}px;
    width: ${constants.width / 1.6}px;
    border-radius: 4px;
`;
const Text = styled.Text`
    color: white;
    text-align: center;
    font-weight: 600;
`;

const ThirdPartyButton = ({ text, onPress, loading = false, bgColor = null }) => (
    <Touchable disabled={loading} onPress={onPress}>
        <Container bgColor={bgColor}>
            {loading ? <ActivityIndicator color={"white"} /> :
                <>
                    <Text>
                        {text}
                    </Text>
                </>
            }
        </Container>
    </Touchable>
);

ThirdPartyButton.propTypes = {
    load: PropTypes.bool,
    text: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    bgColor: PropTypes.string,
}

export default ThirdPartyButton;