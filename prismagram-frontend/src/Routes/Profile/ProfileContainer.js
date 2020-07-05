import React, { useState } from "react";
import { gql } from "apollo-boost";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { withRouter } from "react-router-dom";
import ProfilePresenter from "./ProfilePresenter";

const GET_USER = gql`
    query seeUser($username: String!) {
        seeUser(username: $username) {
            id
            avatar
            username
            fullName
            isFollowing
            isFollower
            isSelf
            bio
            postCount
            followerCount
            followingCount
            posts {
                id
                files {
                    url
                }
                likeCount
                commentCount
            }
        }
    }
`;

const LOG_OUT = gql`
    mutation logUserOut {
        logUserOut @client
    }
 `;

export default withRouter(({ match: { params: { username } } }) => {
    const { loading, data } = useQuery(GET_USER, { variables: { username } });
    const [logout] = useMutation(LOG_OUT);
    const [followerCountState, setFollowerCountState] = useState(0);

    const initFollowerCount = () => {
        if (!loading && data && data.seeUser) {
            setFollowerCountState(data.seeUser.followerCount);
        }
    }
    
    const updateFollowerCount = (action) => {
        if (action === "follow") {
            setFollowerCountState(followerCountState + 1);
        } else if (action === "unfollow") {
            setFollowerCountState(followerCountState - 1);
        }
    }

    return <ProfilePresenter
        loading={loading}
        data={data}
        logout={logout}
        followerCountState={followerCountState}
        initFollowerCount={initFollowerCount}
        updateFollowerCount={updateFollowerCount}
    />
});