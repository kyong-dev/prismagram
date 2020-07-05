import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Camera } from 'expo-camera';
import Loader from "../../components/Loader";
import constants from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../styles";

const View = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1;
`;

const Button = styled.View`
    width: 80px;
    height: 80px;
    border-radius: 40px;
    border: 20px solid ${styles.lightGreyColor};
`;

const Text = styled.Text``;

export default ({ navigation }) => {
    const cameraRef = useRef();
    const [canTakePhoto, setCanTakePhoto] = useState(true);
    const [loading, setLoading] = useState(true);
    const [hasPermission, setHasPermission] = useState(false);
    const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
    const takePhoto = async () => {
        if (!canTakePhoto) {
            return;
        }
        try {
            const { uri } = await cameraRef.current.takePictureAsync({
                quality: 1,
                exif: true
            })
            const asset = await MediaLibrary.createAssetAsync(uri);
            navigation.navigate("UploadPhoto", { photo: asset });
            setCanTakePhoto(false);
        } catch (e) {
            console.log(e);
            setCanTakePhoto(true);
        }
    }
    const askPermission = async () => {
        try {
            const { status } = await Permissions.askAsync(Permissions.CAMERA);
            if (status === "granted") {
                setHasPermission(true);
            }
        } catch (e) {
            console.log(e);
            setHasPermission(false);
        } finally {
            setLoading(false);
        }
    }
    const toggleType = () => {
        if (cameraType === Camera.Constants.Type.back) {
            setCameraType(Camera.Constants.Type.front)
        } else {
            setCameraType(Camera.Constants.Type.back)
        }
    }

    useEffect(() => {
        askPermission();
    }, []);

    return (
        <View>
            {loading ? <Loader /> : hasPermission ?
                (
                    <>
                        <Camera ref={cameraRef} type={cameraType} Camera style={{ justifyContent: "flex-end", width: constants.width, height: constants.width, padding: 15, }} >
                            <TouchableOpacity onPress={() => toggleType()} style={{
                                alignSelf: 'flex-start',
                            }}>
                                <Ionicons
                                    name={Platform.OS === "ios" ? "ios-reverse-camera" : "md-reverse-camera"}
                                    color={styles.white}
                                    size={35}
                                    style={{ opacity: 0.5 }}
                                />
                            </TouchableOpacity>
                        </Camera>
                        <View>
                            <TouchableOpacity onPress={takePhoto} disabled={!canTakePhoto} >
                                <Button />
                            </TouchableOpacity>
                        </View>
                    </>
                )
                : null
            }
        </View >
    )
};