import React from "react";
import styled from "styled-components";
import { Image } from "react-native";
import PropTypes from "prop-types";
import constants from "../constants";
import { useNavigation } from "@react-navigation/native";

const UsernameText = styled.Text`
    font-size: 15px;
    font-weight: 700;
`;

const MessageText = styled.Text`
    font-size: 15px;
    width: ${constants.width / 1.5}px;
    height: ${constants.height / 6}px;
`;

const UserRow = styled.View`
    flex: 1;
    flex-direction: row;
`;

const AvatarColumn = styled.View`
    padding: 10px 10px 0px 10px;
    justify-content: center;

`;

const Column = styled.View`
    padding: 10px 10px 0px 10px;
    flex-direction: column;
`;

const PostColumn = styled.View`
    padding: 10px 10px 0px 0px;
    justify-content: center;
`;

const TouchableOpacity = styled.TouchableOpacity`
    width: ${constants.width}px;
    height: 70px;
`;
const Text = styled.Text``;

const Room = ({ id, participants, messages, createdAt, opponent, setUser }) => {
    const navigation = useNavigation();
    const handlePress = () => {
        setUser(opponent);
        navigation.navigate("Message", { id, messages, opponent });
    }
    return (
        <TouchableOpacity onPress={handlePress}>
            <UserRow>
                <AvatarColumn>
                    <Image style={{ height: 60, width: 60, borderRadius: 30 }} source={{ uri: opponent.avatar }} />
                </AvatarColumn>
                <Column>
                    <UsernameText>
                        {opponent.username}
                    </UsernameText>
                    <MessageText>
                        {messages[messages.length - 1].text}
                    </MessageText>
                </Column>
            </UserRow>
        </TouchableOpacity>
    );
};


Room.propTypes = {
    id: PropTypes.string.isRequired,
    participants: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            username: PropTypes.string.isRequired,
            avatar: PropTypes.string.isRequired
        }).isRequired
    ).isRequired,
    messages: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            from: PropTypes.shape({
                id: PropTypes.string.isRequired,
                username: PropTypes.string.isRequired,
                avatar: PropTypes.string.isRequired
            }).isRequired,
            to: PropTypes.shape({
                id: PropTypes.string.isRequired,
                username: PropTypes.string.isRequired,
                avatar: PropTypes.string.isRequired
            }).isRequired
        })
    ).isRequired,
    createdAt: PropTypes.string.isRequired,
    opponent: PropTypes.shape({
        id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired
    }).isRequired
}

export default Room;