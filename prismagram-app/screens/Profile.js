import React, { useState } from "react";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { USER_FRAGMENT } from "../fragments";
import { ScrollView } from "react-native-gesture-handler";
import { useQuery } from "@apollo/react-hooks";
import Loader from "../components/Loader";
import UserProfile from "../components/UserProfile";
import { RefreshControl } from "react-native";

const ME = gql`
    {
        me {
            ...UserParts
        }
    }
    ${USER_FRAGMENT}
`;

const View = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1;
`;

const Text = styled.Text``;

export default ({ setUsername }) => {
    const [refreshing, setRefreshing] = useState(false);
    const { loading, data, refetch } = useQuery(ME);
    if(data && data.me) {
        setUsername(data.me.username);
    }
    
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

    return (
        <ScrollView refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={refresh} />}>
            {loading ? <Loader /> : data && data.me && <UserProfile {...data.me} />}
        </ScrollView>
    )
};