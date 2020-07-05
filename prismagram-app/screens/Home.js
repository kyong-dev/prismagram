import React, { useState, useEffect } from "react";
import { RefreshControl, Platform } from "react-native";
import styled from "styled-components";
import { gql } from "apollo-boost";
import * as Permissions from "expo-permissions";
import { Notifications } from "expo";
import Loader from "../components/Loader";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Post from "../components/Post";
import { POST_FRAGMENT } from "../fragments";
import * as Device from 'expo-device';

export const FEED_QUERY = gql`
    {
        seeFeed {
            ...PostParts
        }
    }
    ${POST_FRAGMENT}
`;

const UPDATE_NOTIFICATION_TOKEN = gql`
    mutation updateNotificationToken($notificationToken: String!) {
        updateNotificationToken(notificationToken: $notificationToken) {
            id
        }
    }
`;

const ScrollView = styled.ScrollView`
    flex: 1;
`;

const Text = styled.Text``;

export default () => {
    const [refreshing, setRefreshing] = useState(false);
    const { loading, data, refetch } = useQuery(FEED_QUERY);

    const [notificationToken, setNotificationToken] = useState("");
    const [updateNotificationTokenMutation] = useMutation(UPDATE_NOTIFICATION_TOKEN, {
        variables: {
            notificationToken: notificationToken
        }
    });

    const refresh = async () => {
        try {
            setRefreshing(true);
            await refetch();
        } catch (e) {
            console.log(e);
        } finally {
            setRefreshing(false);
        }
    };


    const ask = async () => {
        await Permissions.askAsync(Permissions.NOTIFICATIONS);
        let token = await Notifications.getExpoPushTokenAsync();
        console.log(token);
        setNotificationToken(token);
        await updateNotificationTokenMutation();
        Notifications.setBadgeNumberAsync(0);
    };

    useEffect(() => {
        if (Device.isDevice) {
            ask();
        }
    }, []);

    return (
        <>
            <ScrollView refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={refresh} />
            }
            >
                {loading ?
                    <Loader /> :
                    (
                        data &&
                        data.seeFeed &&
                        data.seeFeed.map((post, index) => <Post key={index} {...post} />)
                    )
                }
            </ScrollView>
        </>
    )
}; 