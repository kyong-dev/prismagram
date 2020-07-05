import React, { useState } from "react";
import { Image } from "react-native";
import styled from "styled-components";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import styles from "../../styles";
import { SEARCH_USER } from "../Search";
import { useQuery } from "@apollo/react-hooks";
import Loader from "../../components/Loader";
import { Feather } from '@expo/vector-icons';


const Text = styled.Text``;

const TextInput = styled.TextInput`
    margin-left: 10px;
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border-bottom-color: ${styles.darkGreyColor};
    border-bottom-width: 1px;
`;

const UserRow = styled.View`
    flex: 1;
    flex-direction: row;
`;

const Column = styled.View`
    padding: 10px 10px 10px 10px;
    justify-content: center;
`;

export default () => {
    const [selected, setSelected] = useState("");
    const [term, setTerm] = useState("");
    const { loading, data, refetch } = useQuery(SEARCH_USER, {
        skip: term === "",
        variables: { term }
    });

    const onChangeText = async (text) => {
        setTerm(text)
        try {
            await refetch();
            console.log(data);

        } catch (e) {
            console.log(e);
        } finally {
        }
    };

    const onPress = (username) => {
        setSelected(username);
    }
    return (
        <ScrollView>
            <TextInput placeholder={"Search..."} onChangeText={onChangeText} value={term}></TextInput>
            {loading ? <Loader /> : data && data.searchUser && data.searchUser.map(user =>
                (
                    !user.isSelf &&
                    <>
                        <TouchableOpacity onPress={() => onPress(user.username)}>
                            <UserRow style={{backgroundColor: selected === user.username ? styles.lightGreyColor : styles.white }}>
                                <Column>
                                    <Image style={{ height: 60, width: 60, borderRadius: 30 }} source={{ uri: user.avatar }} />
                                </Column>
                                <Column>
                                    <>
                                        <Text style={{ fontSize: 15 }}>
                                            {user.username}
                                        </Text>
                                        <Text style={{ color: styles.darkGreyColor }}>
                                            {user.fullName} {user.isFollowing && "· Following"}
                                        </Text>
                                    </>
                                </Column>
                            </UserRow>
                        </TouchableOpacity>
                    </>
                )
            )}
        </ScrollView>
    );
};