import React from "react";
import styled from "styled-components";
import AuthButton from "../../components/AuthButton";
import constants from "../../constants";

const View = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1;
`;

const Image = styled.Image`
    width: ${constants.width / 2.5}px;
    padding: 0px;
    margin: -${constants.height / 10}px;
`;

const Touchable = styled.TouchableOpacity`
`;

const LoginLink = styled.View``;

const LoginLinkText = styled.Text`
    color: ${props => props.theme.blueColor};
    margin-top: 20px;
    font-weight: 600;
`;

export default ({ navigation }) => (
    <View>
        <Image resizeMode={"contain"} source={require("../../assets/logo.png")} />
        <AuthButton text={"Create New Account"} onPress={() => navigation.navigate("Signup")}/>
        <Touchable onPress={() => navigation.navigate("Login")}>
            <LoginLink>
                <LoginLinkText>Log In</LoginLinkText>
            </LoginLink>
        </Touchable>
    </View>
);