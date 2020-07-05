import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Image, View, Alert, AsyncStorage } from "react-native";
import styles from "../styles";
import { MaterialIcons } from '@expo/vector-icons';
import SquarePhoto from "./SquarePhoto";
import Post from "./Post";
import constants from "../constants";
import { useNavigation } from "@react-navigation/native";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";

export const FOLLOW = gql`
    mutation follow($id: String!) {
        follow(id: $id)
    }
`;

export const UNFOLLOW = gql`
    mutation unfollow($id: String!) {
        unfollow(id: $id)
    }
`;

const ProfileHeader = styled.View`
    padding: 20px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const Bold = styled.Text`
    font-weight: 600;
`;

const HeaderColumn = styled.View``;

const ProfileStats = styled.View`
    flex-direction: row;
`;

const Stat = styled.View`
    align-items: center;
    margin-left: 30px;
`;

const StatNumber = styled.Text`
    font-size: 14px;
    font-weight: 700;
    color: ${styles.blackColor};
`;

const StatName = styled.Text`
    font-size: 12px;
    color: ${styles.blackColor};
`;

const ProfileMeta = styled.View`
    padding: 10px;
`;

const InteractionContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    padding: 3px 10px;
`;

const InteractionTouchable = styled.TouchableOpacity`
    padding: 5px;
    margin: 5px;
    width: ${constants.width / 3 - 15}px;
    height: 30px;
    border: 1px solid ${styles.darkGreyColor};
    border-radius: 5px;
    justify-content: center;
    align-items: center;
`;

const InteractionTouchableForEditProfile = styled.TouchableOpacity`
    padding: 5px;
    margin: 5px;
    width: ${constants.width - 15}px;
    height: 30px;
    border: 1px solid ${styles.darkGreyColor};
    border-radius: 5px;
    justify-content: center;
    align-items: center;
`;

const InteractionText = styled.Text`
    text-align: center;
    color: ${styles.blackColor};
    font-size: 12px;
    font-weight: 700;
`;

const ButtonContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    padding: 7px 0px;
    border: 1px solid ${styles.lightGreyColor};
`;

const TouchableOpacity = styled.TouchableOpacity`
    width: 50%;
    align-items: center;
`;

const SquarePhotoContainer = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
`;

const Bio = styled.Text``;

const Button = styled.Text`
    align-items: center;
`;

const UserProfile = ({
    id,
    isSelf,
    isFollower,
    isFollowing: isFollowingProps,
    fullName,
    bio,
    avatar,
    postCount,
    followerCount: followerCountProps,
    followingCount,
    posts: postsProps
}) => {
    const [posts, setPosts] = useState(postsProps);
    const [fromNewToOld, setfromNewToOld] = useState(false);
    const [isFollowing, setIsFollowing] = useState(isFollowingProps);
    const [followerCount, setFollowerCount] = useState(followerCountProps);
    const [isGrid, setIsGrid] = useState(true);
    const navigation = useNavigation();
    const [followMutation] = useMutation(FOLLOW, {
        variables: { id }
    });
    const [unfollowMutation] = useMutation(UNFOLLOW, {
        variables: { id }
    });


    const toggleLike = async () => {
        if (isFollowing) {
            setFollowerCount(n => n - 1);
        } else {
            setFollowerCount(n => n + 1);
        }
        setIsFollowing(!isFollowing);

        if (isFollowing) {
            await unfollowMutation();
        } else {
            await followMutation();
        }
    }

    const logout = () => {
        Alert.alert("You are actually logging out.");
        AsyncStorage.clear();
    }

    useEffect(() => {
        if (!fromNewToOld) {
            setfromNewToOld(true);
            // setPosts(posts.reverse());
        }
    }, [])

    return (
        <View>
            <ProfileHeader>
                <HeaderColumn>
                    <Image style={{ height: 80, width: 80, borderRadius: 40 }} source={{ uri: avatar }} />
                </HeaderColumn>
                <HeaderColumn>
                    <ProfileStats>
                        <Stat>
                            <StatNumber>{postCount}</StatNumber>
                            <StatName>Posts</StatName>
                        </Stat>
                        <Stat>
                            <StatNumber>{followerCount}</StatNumber>
                            <StatName>Followers</StatName>
                        </Stat>
                        <Stat>
                            <StatNumber>{followingCount}</StatNumber>
                            <StatName>Following</StatName>
                        </Stat>
                    </ProfileStats>
                </HeaderColumn>
            </ProfileHeader>
            <ProfileMeta>
                <Bold>{fullName}</Bold>
                <Bio>
                    {bio}
                </Bio>
            </ProfileMeta>
            {!isSelf ?
                <>
                    <InteractionContainer>
                        <InteractionTouchable
                            onPress={toggleLike}
                        >
                            <InteractionText>{isFollowing ? "Following" : isFollower ? "Follow Back" : "Follow"}</InteractionText>
                        </InteractionTouchable>
                        <InteractionTouchable onPress={() => navigation.navigate("NewMessage")}>
                            <InteractionText>Message</InteractionText>
                        </InteractionTouchable>
                        <InteractionTouchable onPress={() => Alert.alert("Contact")}>
                            <InteractionText>Contact</InteractionText>
                        </InteractionTouchable>
                    </InteractionContainer>
                </>
                : 
                <>
                <InteractionContainer>
                        <InteractionTouchableForEditProfile
                            onPress={logout}
                        >
                            <InteractionText>Edit Profile</InteractionText>
                        </InteractionTouchableForEditProfile>
                    </InteractionContainer>
                </>
                }
            <ButtonContainer>
                <TouchableOpacity onPress={() => setIsGrid(true)}>
                    <Button>
                        <MaterialIcons name="grid-on" size={24} color={isGrid ? styles.blackColor : styles.darkGreyColor} />
                    </Button>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsGrid(false)}>
                    <Button>
                        <MaterialIcons name="format-list-bulleted" size={24} color={!isGrid ? styles.blackColor : styles.darkGreyColor} />
                    </Button>
                </TouchableOpacity>
            </ButtonContainer>
            {isGrid && posts && (
                <SquarePhotoContainer>
                    {posts.map(post => <SquarePhoto key={post.id} {...post} />)}
                </SquarePhotoContainer>
            )}
            {!isGrid && posts &&
                posts.map(post => <Post key={post.id} {...post} />)
            }
        </View>
    )
};


UserProfile.propTypes = {
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    fullName: PropTypes.string.isRequired,
    isFollowing: PropTypes.bool.isRequired,
    isFollower: PropTypes.bool.isRequired,
    isSelf: PropTypes.bool.isRequired,
    bio: PropTypes.string.isRequired,
    followingCount: PropTypes.number.isRequired,
    followerCount: PropTypes.number.isRequired,
    postCount: PropTypes.number.isRequired,
    posts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            user: PropTypes.shape({
                id: PropTypes.string.isRequired,
                avatar: PropTypes.string,
                username: PropTypes.string.isRequired
            }).isRequired,
            files: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.string.isRequired,
                    url: PropTypes.string.isRequired
                })
            ).isRequired,
            likeCount: PropTypes.number.isRequired,
            isLiked: PropTypes.bool.isRequired,
            comments: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.string.isRequired,
                    text: PropTypes.string.isRequired,
                    user: PropTypes.shape({
                        id: PropTypes.string.isRequired,
                        username: PropTypes.string.isRequired
                    }).isRequired
                })
            ).isRequired,
            caption: PropTypes.string.isRequired,
            location: PropTypes.string,
            createdAt: PropTypes.string.isRequired
        })
    )
};

export default UserProfile;