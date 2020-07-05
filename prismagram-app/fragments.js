import { gql } from "apollo-boost";

const PARTICIPANT_FRAGMENT = gql`
    fragment ParticipantParts on User {
        id
        username
        avatar
    }
`;

const MESSAGE_FRAGMENT = gql`
    fragment MessageParts on Message {
        id
        text
        from {
            ...ParticipantParts
        }
        to {
            ...ParticipantParts
        }
    }
`;

export const ROOM_FRAGMENT = gql`
    fragment RoomParts on Room {
        id
        participants { 
            ...ParticipantParts
        }
        messages { 
            ...MessageParts
        }
        createdAt
        opponent {
            ...ParticipantParts
        }
    }
    ${PARTICIPANT_FRAGMENT}
    ${MESSAGE_FRAGMENT}
`;

export const POST_FRAGMENT = gql`
    fragment PostParts on Post {
        id
        location
        caption
        user {
            id
            avatar
            username
            isSelf
        }
        files {
            id
            url
        }
        likeCount
        isLiked
        comments {
            id
            text
            user {
                id
                username
            }
        }
        createdAt
    }
`;

export const USER_FRAGMENT = gql`
    fragment UserParts on User {
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
           ...PostParts
        }
    }
    ${POST_FRAGMENT}
`;
