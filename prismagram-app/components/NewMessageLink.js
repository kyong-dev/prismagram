import React from "react";
import styled from "styled-components";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";

const Container = styled.TouchableOpacity`
    padding-right: 20px;
`;
const Text = styled.Text`
`;

export default () => {
    const navigation = useNavigation();
    return (
        <>
            <Container onPress={() => { navigation.navigate("NewMessage") }}>
                <FontAwesome name="pencil-square-o" size={26} color="black" />
            </Container>
        </>
    )
};