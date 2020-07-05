import React, { useState, createContext } from "react";
import { Text, Image, Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import Notifications from "../screens/Notifications";
import Profile from "../screens/Profile";
import Search from "../screens/Search";
import NewMessage from "../screens/Message/NewMessage";
import MessageNavigation from "./MessageNavigation";
import MessagesLink from "../components/MessagesLink";
import { Ionicons } from "@expo/vector-icons";
import { stackOptions, stackStyles } from "./config";
import SearchBar from "../components/SearchBar";
import useInput from "../hooks/useInput";
import Detail from "../screens/Detail";
import styles from "../styles";
import UserDetail from "../screens/UserDetail";


const Stack = createStackNavigator();

export const HomeStack = () => {
    const [username, setUsername] = useState("Profile");
    const UserDetailContext = createContext();
    const UserDetailContextWrapper = ({ route }) => (
        <UserDetailContext.Consumer>
            {props => (
                <UserDetail key="1" {...props} setUsername={setUsername} route={route} />
            )}
        </UserDetailContext.Consumer>
    );
    return (
        <Stack.Navigator
            screenOptions={{
                ...stackOptions,
                headerStyle: {
                    ...stackStyles
                },
                headerTintColor: styles.blackColor,
            }}
            mode="modal" >
            <Stack.Screen name="Home" component={Home} options={{
                headerTitle: (Platform.OS === "ios" ?
                    <Image style={{ height: 35 }} resizeMode="contain" source={require("../assets/small-logo.png")} />
                    : (<><Ionicons name={"logo-instagram"} size={35} /><Text style={{ fontSize: 29 }}> Instagram</Text></>)
                ),
                headerRight: () => <MessagesLink />
            }} />
            <Stack.Screen name="Profile" component={Profile} options={{ headerTitle: "Profile" }} />
            <Stack.Screen name="UserDetail" component={UserDetailContextWrapper} options={{ headerTitle: username, headerBackTitleVisible: false }} />
            <Stack.Screen name="Messages" component={MessageNavigation} options={{headerShown: false}} />
            <Stack.Screen name="Detail" component={Detail} options={{ headerTitle: "Photo", headerBackTitleVisible: false }} />
        </Stack.Navigator >
    )
};

export const SearchStack = () => {
    const searchTerm = useInput("");
    const [shouldFetch, setShouldFetch] = useState(false);
    const [username, setUsername] = useState("Profile");

    const SearchContext = createContext();
    const SearchContextWrapper = () => (
        <SearchContext.Consumer>
            {props => (
                <Search {...props} term={searchTerm.value} shouldFetch={shouldFetch} />
            )}
        </SearchContext.Consumer>
    );

    const UserDetailContext = createContext();
    const UserDetailContextWrapper = ({ route }) => (
        <UserDetailContext.Consumer>
            {props => (
                <UserDetail {...props} setUsername={setUsername} route={route} />
            )}
        </UserDetailContext.Consumer>
    );

    return (
        <Stack.Navigator
            screenOptions={{
                ...stackOptions,
                headerStyle: {
                    ...stackStyles
                },
                headerTintColor: styles.blackColor,
            }}
            mode="modal">
            <Stack.Screen name="Search" component={SearchContextWrapper} options={{ headerTitle: (props => <SearchBar {...props} {...searchTerm} onSubmit={() => setShouldFetch(true)} />) }} />
            <Stack.Screen name="Home" component={Home} options={{ headerTitle: "Home" }} />
            <Stack.Screen name="Detail" component={Detail} options={{ headerTitle: "Photo", headerBackTitleVisible: false }} />
            <Stack.Screen name="UserDetail" component={UserDetailContextWrapper} options={{ headerTitle: username, headerBackTitleVisible: false }} />
            <Stack.Screen name="Profile" component={Profile} options={{ headerTitle: "Profile" }} />
        </Stack.Navigator>
    )
};

export const NotificationsStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                ...stackOptions,
                headerStyle: {
                    ...stackStyles
                },
                headerTintColor: styles.blackColor,
            }}
            mode="modal">
            <Stack.Screen name="Notifications" component={Notifications} options={{ headerTitle: "Activities" }} />
            <Stack.Screen name="Home" component={Home} options={{ headerTitle: "Home" }} />
            <Stack.Screen name="Profile" component={Profile} options={{ headerTitle: "Profile" }} />
            <Stack.Screen name="Detail" component={Detail} options={{ headerTitle: "Photo", headerBackTitleVisible: false }} />
        </Stack.Navigator>
    )
};

export const ProfileStack = () => {
    const [username, setUsername] = useState("Profile")

    const profileContext = createContext();
    const ProfileContextWrapper = () => (
        <profileContext.Consumer>
            {props => (
                <Profile {...props} setUsername={setUsername} />
            )}
        </profileContext.Consumer>
    );

    return (
        <Stack.Navigator
            screenOptions={{
                ...stackOptions,
                headerStyle: {
                    ...stackStyles
                },
                headerTintColor: styles.blackColor,
            }}
            mode="modal">
            <Stack.Screen name="Profile" component={ProfileContextWrapper} options={{ headerTitle: username }} />
            <Stack.Screen name="Home" component={Home} options={{ headerTitle: "Home" }} />
            <Stack.Screen name="NewMessage" component={NewMessage} options={{ headerTitle: "New Message" }} />
            <Stack.Screen name="Detail" component={Detail} options={{ headerTitle: "Photo", headerBackTitleVisible: false }} />
        </Stack.Navigator>
    )
};

export default Stack;