import React from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import { POST_FRAGMENT } from "../fragments";
import { gql } from "apollo-boost";
import Loader from "../components/Loader";
import Post from "../components/Post";

const POST_DETAIL = gql`
    query seeFullPost($id: String!) {
        seeFullPost(id: $id) {
            ...PostParts
        }
    }
    ${POST_FRAGMENT}
`;

const ScrollView = styled.ScrollView``;

const Text = styled.Text``;

export default ({ route }) => {

    const { loading, data } = useQuery(POST_DETAIL, {
        variables: { id: route.params.id }
    });
    
    return (
        <ScrollView>
            {loading ? <Loader /> : data && data.seeFullPost && <Post {...data.seeFullPost} />}
        </ScrollView>
    );
};