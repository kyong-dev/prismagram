import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { KeyboardAvoidingView, Platform, Keyboard, ActivityIndicator } from "react-native";
import gql from "graphql-tag";
import { View, Image } from "react-native";
import { useMutation, useSubscription } from "@apollo/react-hooks";
import { useRoute } from "@react-navigation/native";
import constants from "../../constants";
import { TextInput, ScrollView } from "react-native-gesture-handler";
import { useHeaderHeight } from "@react-navigation/stack";

const SEND_MESSAGE = gql`
    mutation sendMessage($message: String!, $roomId: String!) {
        sendMessage(message: $message, roomId: $roomId) {
            id
        }
    }
`;

const NEW_MESSAGE = gql`
    subscription newMessage($roomId: String!) {
        newMessage(roomId: $roomId) {
            id
            text
            to {
                id
                username
                avatar
            }
            from {
                id
                username
                avatar
            }
        }
    }
`;

const Box = styled.View`
    margin: 10px 10px;
    padding: 10px;
    border: 1px solid ${props => props.theme.lightGreyColor};
    border-radius: 20px;
`;

const Row = styled.View`
    flex-direction: row;
`;

const Text = styled.Text``;

export default () => {
    const route = useRoute();
    const roomId = route.params.id;
    const opponent = route.params.opponent;
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState(route.params.messages);    // const { data, error } = useQuery(CHAT);
    const scrollViewRef = useRef();
    const headerHeight = useHeaderHeight();
    const { data } = useSubscription(NEW_MESSAGE, {
        variables: { roomId }
    });
    const [sendMessageMutation] = useMutation(SEND_MESSAGE, {
        variables: {
            roomId,
            message,
        }
    });

    const onChangeText = text => setMessage(text);
    const onSubmitEditing = async () => {
        setMessage("");
        setLoading(true);
        try {
            await sendMessageMutation();
        } catch (e) {
            console.log(e);
        };
    }

    const handleNewMessage = () => {
        if (data !== undefined) {
            const { newMessage } = data;
            setMessages(previous => [...previous, newMessage]);
            setLoading(false);
        }
    };

    useEffect(() => {
        handleNewMessage();
    }, [data]);

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            enabled
            keyboardVerticalOffset={headerHeight + 30}
        >
            <ScrollView
                ref={scrollViewRef}
                contentContainerStyle={{
                    paddingVertical: 10,
                    flex: 1,
                    justifyContent: "flex-end",
                }}
            // onContentSizeChange={(contentWidth, contentHeight) => { scrollViewRef.current.scrollToEnd({ y: 0, animated: true }) }}
            >
                {messages.map((message, index) =>
                    <View style={{
                        alignSelf: message.from.username === opponent.username ? "flex-start" : "flex-end",
                    }}>
                        <Row>
                            {message.from.username === opponent.username && <Image style={{ height: 30, width: 30, borderRadius: 15 }} source={{ uri: message.from.avatar }} />}
                            <Box>
                                <Text>{message.text}</Text>
                            </Box>
                        </Row>
                    </View>)}
                {loading && <ActivityIndicator />}
                <TextInput
                    placeholder="Type a message"
                    style={{
                        marginTop: 20,
                        width: "90%",
                        padding: 10,
                        borderRadius: 10,
                        backgroundColor: "#f2f2f2"
                    }}
                    returnKeyType="send"
                    value={message}
                    onChangeText={onChangeText}
                    onSubmitEditing={onSubmitEditing}
                />
            </ScrollView>
        </KeyboardAvoidingView>
    );
};