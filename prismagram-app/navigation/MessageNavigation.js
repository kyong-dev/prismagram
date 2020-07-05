import React, { useState, createContext } from "react";
import styled from "styled-components";
import { createStackNavigator } from "@react-navigation/stack";
import { stackOptions, stackStyles } from "./config";
import Messages from "../screens/Message/Messages";
import Message from "../screens/Message/Message";
import NewMessage from "../screens/Message/NewMessage";
import NewMessageLink from "../components/NewMessageLink";
import styles from "../styles";

const Stack = createStackNavigator();

const Text = styled.Text`
    font-size: 17px;
    font-weight: 700;
    margin-right: 10px;
    color: ${styles.darkGreyColor};
`;

export default () => {
    const [user, setUser] = useState(null);

    const MessagesContext = createContext();
    const MessagesContextWrapper = () => (
        <MessagesContext.Consumer>
            {() => (
                <Messages setUser={setUser} />
            )}
        </MessagesContext.Consumer>
    );

    return (
        <Stack.Navigator
            screenOptions={{
                ...stackOptions,
                headerStyle: {
                    ...stackStyles
                },
                headerTintColor: styles.blackColor,
            }} mode="modal">
            <Stack.Screen name="Messages" component={MessagesContextWrapper} options={{
                headerTitle: "Direct",
                headerRight: () => <NewMessageLink />,
                headerBackTitleVisible: false,
            }} />
            <Stack.Screen name="Message" component={Message} options={{
                headerTitle: user === null ? "Chat" : user.username,
                headerBackTitleVisible: false,
            }} />
            <Stack.Screen name="NewMessage" component={NewMessage} options={{
                headerTitle: "New message",
                headerRight: () => <Text>Next</Text>
            }}
            />
        </Stack.Navigator>
    );
};