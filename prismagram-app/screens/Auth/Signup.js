import React, { useState } from "react";
import styled from "styled-components";
import * as Facebook from "expo-facebook";
import * as Google from 'expo-google-app-auth';
import { Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useMutation } from "@apollo/react-hooks";
import AuthButton from "../../components/AuthButton";
import ThirdPartyButton from "../../components/ThirdPartyButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { CREATE_ACCOUNT } from "./AuthQueries";

const View = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1;
`;

const FBContainer = styled.View`
    margin-top: 25px;
    padding-top: 25px;
    border-top-width: 1px;
    border-style: solid;
    border-top-color: ${props => props.theme.lightGreyColor};
`;

const GoogleContainer = styled.View`
    margin-top: 10px;
`;

export default ({ navigation, route }) => {
    const defaultEmail = route.params?.email ?? "";
    const emailInput = useInput(defaultEmail);
    const firstNameInput = useInput("");
    const lastNameInput = useInput("");
    const usernameInput = useInput("");
    const [loading, setLoading] = useState(false);
    const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
        variables: {
            email: emailInput.value,
            firstName: firstNameInput.value,
            lastName: lastNameInput.value,
            username: usernameInput.value
        }
    });
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const handleSignup = async () => {
        const { value: email } = emailInput;
        const { value: firstName } = firstNameInput;
        const { value: lastName } = lastNameInput;
        const { value: username } = usernameInput;
        if (email === "" || firstName === "" || lastName === "" || username === "") {
            return Alert.alert("All fields must be filled");
        }

        if (!emailRegex.test(email)) {
            return Alert.alert("That email is invalid");
        }
        try {
            setLoading(true);
            const {
                data: { createAccount }
            } = await createAccountMutation();
            if (createAccount) {
                Alert.alert("That email is invalid");
                navigation.navigate("Login", { email });
            }
        } catch (e) {
            Alert.alert("Username / Email is already taken.");
            console.log(e);
            navigation.navigate("Login", { email });
        } finally {
            setLoading(false);
        }
    };
    const fbLogin = async () => {
        try {
            setLoading(true);
            await Facebook.initializeAsync("372568340372514");
            const {
                type,
                token,
                permissions
            } = await Facebook.logInWithReadPermissionsAsync(
                {
                    permissions: ["public_profile", "email"]
                }
            );
            
            if (type === "success") {
                // Get the user"s name using Facebook"s Graph API
                const response = await fetch(`https://graph.facebook.com/me?fields=id,email,first_name,last_name&access_token=${token}`);
                const { email, first_name, last_name } = await response.json();
                if (email) {
                    const [username] = email.split("@");

                    emailInput.setValue(email);
                    usernameInput.setValue(username);
                } else {
                    Alert.alert(`You need to verify your email address with Facebook`);
                }
                firstNameInput.setValue(first_name);
                lastNameInput.setValue(last_name);
                Alert.alert("Logged in!", `Hi ${(await response.json()).name}!`);
            } else {
                // type === "cancel"
            }
        } catch ({ message }) {
            Alert.alert(`Facebook Login Error: ${message}`);
        } finally {
            setLoading(false);
        }
    }

    const googleLogin = async () => {
        const GOOGLE_ANDROID_ID = "278473447010-d0rjj7j7gr81qufjvrmoiru09bnf9k83.apps.googleusercontent.com";
        const GOOGLE_IOS_ID = "278473447010-08g0m4651nevj8202ea1ue295k3ge644.apps.googleusercontent.com";
        try {
            setLoading(true);
            const result = await Google.logInAsync({
                androidClientId: GOOGLE_ANDROID_ID,
                iosClientId: GOOGLE_IOS_ID,
                scopes: ['profile', 'email'],
            });
            if (result.type === 'success') {
                const response = await fetch('https://www.googleapis.com/userinfo/v2/me', {
                    headers: { Authorization: `Bearer ${result.accessToken}` },
                });
                const { email, given_name, family_name } = await response.json();

                const [username] = email.split("@");

                emailInput.setValue(email);
                firstNameInput.setValue(given_name);
                lastNameInput.setValue(family_name);
                usernameInput.setValue(username);

            } else {
                return { cancelled: true };
            }
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View>
                    <AuthInput
                        {...emailInput}
                        keyboardType="email-address"
                        placeholder="Email"
                        autoCorrect={false}
                        loading={loading}
                    />
                    <AuthInput
                        {...firstNameInput}
                        placeholder="First Name"
                        autoCapitalize="words"
                        loading={loading}
                    />
                    <AuthInput
                        {...lastNameInput}
                        placeholder="Last Name"
                        autoCapitalize="words"
                        loading={loading}
                    />
                    <AuthInput
                        {...usernameInput}
                        placeholder="Username"
                        returnKeyType="done"
                        autoCorrect={false}
                        loading={loading}
                    />
                    <AuthButton
                        text="Sign Up"
                        onPress={handleSignup}
                        loading={loading}
                    />
                    <FBContainer>
                        <ThirdPartyButton
                            bgColor={"#2D4DA7"}
                            text="Continue with Facebook"
                            onPress={fbLogin}
                            loading={loading}
                        />
                    </FBContainer>
                    <GoogleContainer>
                        <ThirdPartyButton
                            bgColor={"#EE1922"}
                            text="Continue with Google"
                            onPress={googleLogin}
                            loading={loading}
                        />
                    </GoogleContainer>
                </View>
            </TouchableWithoutFeedback>
        </>
    )
};