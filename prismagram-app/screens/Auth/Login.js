import React, { useState } from "react";
import styled from "styled-components";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useMutation } from "@apollo/react-hooks";
import { LOG_IN } from "./AuthQueries";

const View = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1;
`;

export default ({ navigation, route }) => {
    const defaultEmail = route.params?.email ?? "";
    const emailInput = useInput(defaultEmail);
    const [loading, setLoading] = useState(false);
    const [requestSecretMutation] = useMutation(LOG_IN, {
        variables: {
            email: emailInput.value
        }
    });
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const handleLogin = async () => {
        const { value } = emailInput;
        if (value === "") {
            return Alert.alert("Email can't be empty");
        } else if (!value.includes("@") || !value.includes(".")) {
            return Alert.alert("Please write an email");
        } else if (!emailRegex.test(value)) {
            return Alert.alert("That email is invalid");
        }
        try {
            setLoading(true);
            const {
                data: { requestSecret }
            } = await requestSecretMutation();
            if (requestSecret) {
                Alert.alert("Check your email");
                navigation.navigate("Confirm", {email: emailInput.value});
            } else {
                Alert.alert("Account Not Found. Sign up first.");
                navigation.navigate("Signup", {email: emailInput.value});
            }
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
                <AuthInput
                    {...emailInput}
                    keyboardType="email-address"
                    placeholder="Email"
                    returnKeyType="send"
                    onSubmitEditing={handleLogin}
                    autoCorrect={false}
                    loading={loading}
                />
                <AuthButton
                    text="Request Secret"
                    onPress={handleLogin}
                    loading={loading}
                />
            </View>
        </TouchableWithoutFeedback>
    )
};