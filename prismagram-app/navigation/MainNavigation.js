import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigation from "./TabNavigation";
import PhotoNavigation from "./PhotoNavigation";
import styles from "../styles";


const Stack = createStackNavigator();

const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: styles.white,
    },
  };

export default () => (
    <NavigationContainer theme={MyTheme}>
        <Stack.Navigator headerMode="none" mode="modal">
            <Stack.Screen name="Home" component={TabNavigation} />
            <Stack.Screen name="PhotoNavigation" component={PhotoNavigation} />
        </Stack.Navigator>
    </NavigationContainer>
);