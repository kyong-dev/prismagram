import React from "react";
import { Platform } from "react-native";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import styles from "../styles";

const Container = styled.TouchableOpacity`
    padding-right: 20px;
`;
const Text = styled.Text`
`;

export default () => {
    const navigation = useNavigation();
    return (
        <>
            <Container onPress={() => { navigation.navigate("Messages") }}>
                <Ionicons name={Platform.OS === "ios" ? "ios-paper-plane" : "md-paper-plane"} color={styles.blackColor} size={26} />
            </Container>
        </>
    )
};