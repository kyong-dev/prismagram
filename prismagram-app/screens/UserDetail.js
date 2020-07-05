import React, { useState } from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { RefreshControl } from "react-native";
import Loader from "../components/Loader";
import UserProfile from "../components/UserProfile";
import { USER_FRAGMENT } from "../fragments";

export const GET_USER = gql`
    query seeUser($username: String!) {
        seeUser(username: $username) {
            ...UserParts
        }
    }
    ${USER_FRAGMENT}
`;

const ScrollView = styled.ScrollView``;

const Text = styled.Text``;

export default ({ setUsername, route }) => {
    const [refreshing, setRefreshing] = useState(false);
    const { loading, data, refetch } = useQuery(GET_USER, {
        variables: { username: route.params.username }
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

    setUsername(route.params.username);
    
    return (
        <ScrollView refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={refresh} />}>
            {loading ? <Loader /> : data && data.seeUser && <UserProfile {...data.seeUser} />}
        </ScrollView>
    );
};