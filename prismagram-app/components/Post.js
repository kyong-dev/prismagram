import React, { useState } from "react";
import { Image, Platform, View } from "react-native";
import styled from "styled-components";
import PropTypes from "prop-types";
import Swiper from "react-native-swiper";
import { useMutation } from "@apollo/react-hooks";
import { useNavigation, UIManager } from '@react-navigation/native';
import { Ionicons, FontAwesome, Entypo } from "@expo/vector-icons";
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import { gql } from "apollo-boost";
import constants from "../constants";
import styles from "../styles";

export const TOGGLE_LIKE = gql`
    mutation toggleLike($postId: String!) {
        toggleLike(postId: $postId)
    }
`;

const Container = styled.View`
`;

const Header = styled.View`
    padding: 15px;
    flex-direction: row;
    align-items: center;
`;

const Touchable = styled.TouchableOpacity``;

const HeaderUserContainer = styled.View`
    margin-left: 10px;
`;

const Bold = styled.Text`
    font-weight: 600;
`;

const Location = styled.Text`
    font-size: 12px;
`;

const IconsContainer = styled.View`
    flex-direction: row;
`;

const IconContainer = styled.View`
    margin-right: 12px;
`;

const InfoContainer = styled.View`
    padding: 10px;
`;

const Caption = styled.Text`
    margin: 3px 0px;
`;

const CommentCount = styled.Text`
    opacity: 0.5;
    font-size: 13px;
`;

const TimeStamp = styled.Text`
    font-weight: 300;
    text-transform: uppercase;
    opacity: 0.5;
    font-size: 10px;
`;

const Text = styled.Text``;

const Post = ({
    id,
    user,
    location,
    files = [],
    likeCount: likeCountProp,
    caption,
    comments = [],
    isLiked: isLikedProp,
    createdAt,
}) => {
    const [isLiked, setIsLiked] = useState(isLikedProp);
    const [likeCount, setLikeCount] = useState(likeCountProp);
    const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, {
        variables: { postId: id }
    });
    const navigation = useNavigation();
    let lastTap = null
    const handleLike = async () => {
        if (isLiked === true) {
            setLikeCount(l => l - 1);
        } else {
            setLikeCount(l => l + 1);
        }
        setIsLiked(p => !p);
        try {
            await toggleLikeMutation();
        } catch (e) {
            console.log(e);
        }
    }
    const handleDoubleTap = () => {
        const now = Date.now();
        const DOUBLE_TAP_DELAY = 300;
        if (lastTap && (now - lastTap) < DOUBLE_TAP_DELAY) {
            if (isLiked !== true) {
                handleLike();
            } else {
                return;
            }
        } else {
            lastTap = now;
        }
    }
    return (
        <Container>
            <Header>
                <Touchable onPress={() => navigation.navigate("UserDetail", { username: user.username })}>
                    <Image
                        key={user.id}
                        style={{ height: 40, width: 40, borderRadius: 20 }}
                        source={{ uri: user.avatar }}
                    />
                </Touchable>
                <View style={{ justifyContent: "space-between", flex: 1, flexDirection: "row" }} >
                    <Touchable onPress={() => navigation.navigate("UserDetail", { username: user.username })}>
                        <HeaderUserContainer>
                            <Bold>
                                {user.username}
                            </Bold>
                            <Location>{location}</Location>
                        </HeaderUserContainer>
                    </Touchable>
                    <>
                        <Menu>
                            <MenuTrigger>
                                <Entypo
                                    name={Platform.OS === "ios" ? "dots-three-horizontal" : "dots-three-vertical"}
                                    size={20}
                                    color={styles.blackColor}
                                    style={{ height: 40, paddingTop: 10, paddingBottom: 10 }}
                                />
                            </MenuTrigger>
                            <MenuOptions style={{ backgroundColor: styles.superLightGreyColor }}>
                                {user.isSelf ?
                                    <>
                                        <MenuOption onSelect={() => alert(`Delete`)} ><Text style={{color: 'red'}}>Delete</Text></MenuOption>
                                        <MenuOption onSelect={() => alert(`Archive`)} text='Archive' />
                                        <MenuOption onSelect={() => alert(`Turn Off`)} text='Turn Off Commenting' />
                                        <MenuOption onSelect={() => alert(`Edit`)} text='Edit' />
                                        <MenuOption onSelect={() => alert(`Copy Link`)} text='Copy Link' />
                                        <MenuOption onSelect={() => alert(`Share`)} text='Share' />
                                        <MenuOption onSelect={() => alert(`Cancel`)} text='Cancel' />
                                    </>
                                    :
                                    <>
                                        <MenuOption onSelect={() => alert(`Report`)} text='Report...' />
                                        <MenuOption onSelect={() => alert(`Notifications`)} text='Turn On Port Notifications' />
                                        <MenuOption onSelect={() => alert(`About`)} text='About This Account' />
                                        <MenuOption onSelect={() => alert(`Copy`)} text='Copy Link' />
                                        <MenuOption onSelect={() => alert(`Share`)} text='Share to...' />
                                        <MenuOption onSelect={() => alert(`Unfollow`)} text='Unfollow' />
                                        <MenuOption onSelect={() => alert(`Mute`)} text='Mute' />
                                    </>
                                }
                            </MenuOptions>
                        </Menu>
                    </>
                </View>
            </Header>
            <Swiper
                dot={
                    <View style={{
                        backgroundColor: 'rgba(103,128,129,1)',
                        width: 5,
                        height: 5,
                        borderRadius: 4,
                        marginLeft: 3,
                        marginRight: 3,
                        marginTop: 3,
                        marginBottom: 3,
                    }}
                    />}
                activeDot={
                    <View style={{
                        backgroundColor: '#007aff',
                        width: 6,
                        height: 6,
                        borderRadius: 4,
                        marginLeft: 3,
                        marginRight: 3,
                        marginTop: 3,
                        marginBottom: 3
                    }}
                    />
                }
                paginationStyle={{ margin: -55 }}
                style={{ height: constants.height / 2.5 }}
            >
                {files.map(file => (
                    <>
                        <Touchable key={file.id} onPress={handleDoubleTap} activeOpacity={0.9}>
                            <Image
                                key={file.id}
                                style={{ width: constants.width, height: constants.height / 2.5 }}
                                source={{ uri: file.url }}
                            />
                        </Touchable>
                    </>
                ))}
            </Swiper>
            <InfoContainer>
                <IconsContainer>
                    <Touchable onPress={handleLike}>
                        <IconContainer>
                            <Ionicons
                                size={28}
                                color={isLiked ? styles.redColor : styles.blackColor}
                                name={Platform.OS === "ios"
                                    ?
                                    isLiked ? "ios-heart" : "ios-heart-empty"
                                    :
                                    isLiked ? "md-heart" : "md-heart-empty"
                                }
                            />
                        </IconContainer>
                    </Touchable>
                    <Touchable>
                        <IconContainer>
                            <FontAwesome
                                name="comment-o"
                                size={25}
                                color={styles.blackColor}
                            />
                        </IconContainer>
                    </Touchable>
                    {!user.isSelf &&
                        <>
                            <Touchable>
                                <IconContainer>
                                    <Ionicons
                                        name={Platform.OS === "ios" ? "ios-paper-plane" : "md-paper-plane"}
                                        color={styles.blackColor}
                                        size={28}
                                    />
                                </IconContainer>
                            </Touchable>
                        </>
                    }
                </IconsContainer>
                <Touchable>
                    <Bold>
                        {likeCount === 1 ? "1 like" : `${likeCount} likes`}
                    </Bold>
                </Touchable>
                <Touchable onPress={() => { navigation.navigate("Detail", { id }) }}>
                    <Caption>
                        <Bold>{user.username}</Bold> {caption}
                    </Caption>
                </Touchable>
                {comments.length !== 0 && (
                    <Touchable>
                        <CommentCount>{
                            comments.length === 1 ?
                                `View 1 comment`
                                :
                                `View all ${comments.length} comments`
                        }
                        </CommentCount>
                    </Touchable>
                )}
                <TimeStamp>
                    {(Date.parse(createdAt) - Date.now()) > -119384 && `Just Now`}
                    {(Date.parse(createdAt) - Date.now()) > -358154 &&
                        (Date.parse(createdAt) - Date.now()) <= -119384 &&
                        `${Math.abs((Date.parse(createdAt) - Date.now()) / 360000).toFixed()} minutes ago`}
                    {(Date.parse(createdAt) - Date.now()) > -8595700 &&
                        (Date.parse(createdAt) - Date.now()) <= -358154 &&
                        `${Math.abs((Date.parse(createdAt) - Date.now()) / 360000).toFixed()} hours ago`}
                    {(Date.parse(createdAt) - Date.now()) <= -8595700 &&
                        `${Math.abs((Date.parse(createdAt) - Date.now()) / 86400000).toFixed()} days ago`}
                </TimeStamp>
            </InfoContainer>
        </Container>
    );
};

Post.propTypes = {
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
}

export default Post;