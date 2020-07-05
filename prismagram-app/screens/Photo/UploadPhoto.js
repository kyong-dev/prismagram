import React, { useState } from "react";
import { Image, ActivityIndicator, Alert } from "react-native";
import styled from "styled-components";
import axios from "axios";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import styles from "../../styles";
import constants from "../../constants";
import useInput from "../../hooks/useInput";
import { FEED_QUERY } from "../Home";

const UPLOAD = gql`
  mutation upload($caption: String!, $files: [String!]!, $location: String) {
    upload(caption: $caption, files: $files, location: $location) {
      id
      caption
      location
    }
  }
`;

const View = styled.View`
  flex: 1;
`;

const Container = styled.View`
  padding: 20px;
  flex-direction: row;
`;

const Form = styled.View`
  justify-content: flex-start;
`;

const STextInput = styled.TextInput`
  margin-bottom: 10px;
  border: 0px solid ${styles.lightGreyColor};
  border-bottom-width: 1px;
  padding-bottom: 10px;
  width: ${constants.width - 180}px;
`;

const Button = styled.TouchableOpacity`
  background-color: ${props => props.theme.blueColor};
  padding: 10px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
`;

const Text = styled.Text`
  color: white;
  font-weight: 600;
`;

export default ({ navigation, route }) => {
    const [loading, setIsLoading] = useState(false);
    const photo = route.params.photo;
    const captionInput = useInput("");
    const locationInput = useInput("Melbourne");
    const [uploadMutation] = useMutation(UPLOAD, {
        refetchQueries: () => [{ query: FEED_QUERY }]
    });

    const handleSubmit = async () => {
        if (captionInput.value === "" || locationInput.value === "") {
            Alert.alert("All fields are required");
            return;
        }
        const formData = new FormData();
        const name = photo.filename;
        const [, type] = name.split(".");
        formData.append("file", {
            name,
            type: type.toLowerCase(),
            uri: photo.uri
        });

        try {
            setIsLoading(true);
            const {
                data: { location }
            } = await axios.post("http://192.168.8.105:4000/api/upload", formData, {
                headers: {
                    "content-type": "multipart/form-data"
                }
            });

            const {
                data: { upload }
            } = await uploadMutation({
                variables: {
                    files: [location],
                    caption: captionInput.value,
                    location: locationInput.value
                }
            });
            if (upload.id) {
                navigation.navigate("Home");
            }
        } catch (e) {
            Alert.alert("Can't upload", "Try later");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View>
            <Container>
                <Image
                    source={{ uri: photo.uri }}
                    style={{ height: 80, width: 80, marginRight: 30 }}
                />
                <Form>
                    <STextInput
                        onChangeText={captionInput.onChangeText}
                        value={captionInput.value}
                        placeholder="Caption"
                        multiline={true}
                        placeholderTextColor={styles.darkGreyColor}
                    />
                    <STextInput
                        onChangeText={locationInput.onChangeText}
                        value={locationInput.value}
                        placeholder="Location"
                        multiline={true}
                        placeholderTextColor={styles.darkGreyColor}
                    />
                    <Button onPress={handleSubmit}>
                        {loading ? (
                            <ActivityIndicator color="white" />
                        ) : (
                                <Text>Upload </Text>
                            )}
                    </Button>
                </Form>
            </Container>
        </View>
    );
};