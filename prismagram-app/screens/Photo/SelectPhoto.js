import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import styled from "styled-components";
import * as MediaLibrary from "expo-media-library";
import * as Permissions from "expo-permissions";
import Loader from "../../components/Loader";
import constants from "../../constants";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import styles from "../../styles";



const View = styled.View`
    align-items: center;
    flex: 1;
`;

const AllPhotosView = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
`;

const Button = styled.TouchableOpacity`
    width: 100px;
    height: 30px;
    position: absolute;
    right: 5px;
    top: 15px;
    background-color: ${styles.blueColor};
    justify-content: center;
    align-items: center;
    border-radius: 5px;
`;
const Text = styled.Text`
    color: ${styles.superLightGreyColor};;
    font-weight: 600;
`;

export default ({ navigation }) => {
    const [loading, setLoading] = useState(true);
    const [hasPermission, setHasPermission] = useState(false);
    const [selected, setSelected] = useState();
    const [allPhotos, setAllPhotos] = useState();

    const chagneSelected = photo => {
        setSelected(photo);
    };
    const getPhotos = async () => {
        try {
            const { assets } = await MediaLibrary.getAssetsAsync();
            const [firstPhoto] = assets;
            setSelected(firstPhoto);
            setAllPhotos(assets);
            return;
        } catch (e) {
            console.log(e);
        }
    }
    const askPermission = async () => {
        try {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status === "granted") {
                setHasPermission(true);
                getPhotos();
            }
        } catch (e) {
            console.log(e);
            setHasPermission(false);
        } finally {
            setLoading(false);
        }
    }
    const handleSelected = () => {
        navigation.navigate("UploadPhoto", {photo: selected})
    }

    useEffect(() => {
        askPermission();
    }, []);

    return (
        <View>
            {loading ?
                (
                    <Loader />
                )
                :
                (
                    <View>{hasPermission && selected && selected.id && allPhotos ? (
                        <>
                            <Image
                                key={selected.id}
                                style={{ width: constants.width, height: constants.width }}
                                source={{ uri: selected.uri }}
                            />

                            <Button onPress={handleSelected}>
                                <Text>Next</Text>
                            </Button>

                            <ScrollView contentContainerStyle={{ flexDirection: "row" }}>
                                {allPhotos.map(photo => (
                                    <TouchableOpacity key={photo.id} onPress={() => chagneSelected(photo)}>
                                        <Image
                                            key={photo.id}
                                            style={{ 
                                                width: constants.width / 2, 
                                                height: constants.width / 2,
                                                opacity: photo.id === selected.id ? 0.5 : 1
                                            }}
                                            source={{ uri: photo.uri }}
                                        />
                                    </TouchableOpacity>
                                )
                                )}
                            </ScrollView>
                        </>
                    )
                        :
                        <Text>"Need a permission"</Text>}
                    </View>
                )
            }
        </View>
    );
};