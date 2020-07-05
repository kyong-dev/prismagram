import React, { useState } from "react";
import styled from "styled-components";
import { RefreshControl } from "react-native";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import Loader from "../components/Loader";
import SquarePhoto from "../components/SquarePhoto";
import { Image } from "react-native";
import styles from "../styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

export const SEARCH_USER = gql`
    query searchUser($term: String!) {
        searchUser(term: $term) {
            id
            avatar
            username
            fullName
            isFollowing
            isFollower
            isSelf
        }
    }
`;

export const SEARCH_POST = gql`
    query searchPost($term: String!) {
        searchPost(term: $term) {
            id
            files {
                id
                url
            }
            likeCount
            commentCount
            createdAt
        }
    }
`;

const ScrollView = styled.ScrollView`
    flex: 1;
`;

const Text = styled.Text``;

const View = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
`;

const UserRow = styled.View`
    flex: 1;
    flex-direction: row;
`;

const Column = styled.View`
    padding: 10px 10px 0px 10px;
    justify-content: center;
`;

const Search = ({ term, shouldFetch }) => {
    const navigation = useNavigation();
    const [refreshing, setRefreshing] = useState(false);
    const [searchTerm] = useState(term);
    const { loading, data, refetch } = useQuery(SEARCH_POST, {
        skip: searchTerm !== "",
        variables: { term: "" },
        fetchPolicy: "network-only"
    });
    const { loading: userLoading, data: userData, refetch: userRefetch } = useQuery(SEARCH_USER, {
        skip: !shouldFetch | searchTerm === "",
        variables: { term: searchTerm }
    });

    const refresh = async () => {
        try {
            setRefreshing(true);
            await userRefetch({ variables: { term: searchTerm } });
        } catch (e) {
            console.log(e);
        } finally {
            setRefreshing(false);
        }
    }

    return (
        <ScrollView refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={refresh} />
        }>
            {userLoading ? <Loader /> : userData && userData.searchUser && userData.searchUser.map(user =>
                (
                    !user.isSelf &&
                    <>
                        <TouchableOpacity onPress={() => navigation.navigate("UserDetail", { username: user.username })}>
                            <UserRow>
                                <Column>
                                    <Image style={{ height: 60, width: 60, borderRadius: 30 }} source={{ uri: user.avatar }} />
                                </Column>
                                <Column>
                                    <Text style={{ fontSize: 15 }}>
                                        {user.username}
                                    </Text>
                                    <Text style={{ color: styles.darkGreyColor }}>
                                        {user.fullName} {user.isFollowing && "· Following"}
                                    </Text>
                                </Column>
                            </UserRow>
                        </TouchableOpacity>
                    </>
                )
            )}
            <View>
                {loading ? <Loader /> : data && data.searchPost && data.searchPost.map(post => (<SquarePhoto key={post.id} {...post} />))}
            </View>
        </ScrollView>
    );
};

export default Search;