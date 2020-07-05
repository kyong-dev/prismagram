import * as React from "react";
import { View, Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";
import { HomeStack, NotificationsStack, ProfileStack, SearchStack } from "./StackNavigation";

const Tab = createBottomTabNavigator();

export default ({ navigation }) => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    size = 26;
                    if (route.name === "Home") {
                        iconName = focused ? "home" : "home";
                        color = focused ? "black" : "grey";
                    } else if (route.name === "Search") {
                        iconName = "search";
                        color = focused ? "black" : "grey";
                    } else if (route.name === "Add") {
                        iconName = "plus";
                        color = focused ? "black" : "grey";
                    } else if (route.name === "Notifications") {
                        iconName = focused ? "heart" : "heart-o";
                        color = focused ? "black" : "grey";
                    } else if (route.name === "Profile") {
                        iconName = focused ? "user" : "user-o";
                        color = focused ? "black" : "grey";
                    }
                    return <FontAwesome name={iconName} size={size} color={color} />;
                }
            })}
            tabBarOptions={{
                keyboardHidesTabBar: Platform.OS === "ios" ? false : true,
                activeTintColor: "#000000",
                showLabel: false,
                style: {
                    backgroundColor: "#FAFAFA"
                },
            }}
        >
            <Tab.Screen name="Home" component={HomeStack} />
            <Tab.Screen name="Search" component={SearchStack} />
            <Tab.Screen
                listeners={{
                    tabPress: e => {
                        e.preventDefault();
                        navigation.navigate("PhotoNavigation");
                    },
                }}
                name="Add" component={View} />
            <Tab.Screen name="Notifications" component={NotificationsStack} />
            <Tab.Screen name="Profile" component={ProfileStack} />
        </Tab.Navigator >
    )
};