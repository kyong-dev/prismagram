import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import Signup from "../screens/Auth/Signup";
import Login from "../screens/Auth/Login";
import Confirm from "../screens/Auth/Confirm";
import AuthHome from "../screens/Auth/AuthHome";


const Stack = createStackNavigator();

const AuthStack = () => (
    <Stack.Navigator headerMode="none"
        screenOptions={{
            gestureEnabled: true,
            gestureDirection: "horizontal",
            ...TransitionPresets.SlideFromRightIOS
        }}>
        <Stack.Screen name="AuthHome" component={AuthHome} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Confirm" component={Confirm} />
    </Stack.Navigator>
);


export default () => (
    <NavigationContainer>
        <AuthStack />
    </NavigationContainer>
);