import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import UploadPhoto from "../screens/Photo/UploadPhoto";
import TakePhoto from "../screens/Photo/TakePhoto";
import SelectPhoto from "../screens/Photo/SelectPhoto";
import styles from "../styles";
import styled from "styled-components";

const TouchableOpacity = styled.TouchableOpacity`
    padding-right: 10px;
`;

const Text = styled.Text`
    font-weight: 700;
    color: ${styles.blueColor};
`;

const Tab = createMaterialTopTabNavigator();

const PhotoTab = () => (
    <Tab.Navigator
        tabBarPosition="bottom"
        tabBarOptions={{
            indicatorStyle: {
                backgroundColor: styles.blackColor
            }
        }}
    >
        <Tab.Screen name="Gallery" component={SelectPhoto} />
        <Tab.Screen name="Photo" component={TakePhoto} />
    </Tab.Navigator>
);

const Stack = createStackNavigator();

const PhotoStack = () => (
    <Stack.Navigator screenOptions={{
        headerTintColor: styles.blackColor,
    }}
    >
        <Stack.Screen name="PhotoTab" component={PhotoTab} options=
            {{
                headerTitle: "Photo",
                headerBackTitleVisible: false,
            }}
        />
        <Stack.Screen name="UploadPhoto" component={UploadPhoto} options={{ headerTitle: "Upload" }} />
    </Stack.Navigator>
);

export default () => <PhotoStack />;