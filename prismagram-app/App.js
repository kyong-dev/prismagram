import React, { useState, useEffect } from "react";
import { AsyncStorage } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import { InMemoryCache } from "apollo-cache-inmemory";
import { persistCache } from "apollo-cache-persist";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-client";
import { ThemeProvider } from "styled-components";
import { MenuProvider } from 'react-native-popup-menu';

import { httpLink, wsLink } from "./apollo";
import styles from "./styles";
import NavController from "./components/NavController";
import { AuthProvider } from "./AuthContext";

import { onError } from "apollo-link-error";
import { ApolloLink, split } from "apollo-link";
import { getMainDefinition } from "apollo-utilities";
import { setContext } from 'apollo-link-context';

// AsyncStorage.clear();

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [client, setClient] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const preLoad = async () => {
    try {
      await Font.loadAsync({
        ...Ionicons.font
      });
      await Asset.loadAsync([require("./assets/logo.png"), require("./assets/small-logo.png")]);
      const cache = new InMemoryCache();
      await persistCache({
        cache,
        storage: AsyncStorage
      });
      const authLink = setContext(async (_, { headers }) => {
        // get the authentication token from local storage if it exists
        const token = await AsyncStorage.getItem('jwt');
        // return the headers to the context so httpLink can read them
        return {
          headers: {
            ...headers,
            Authorization: token ? `Bearer ${token}` : "",
          }
        }
      });
      const client = new ApolloClient({
        cache,
        link: authLink.concat(ApolloLink.from([
          onError(({ graphQLErrors, networkError }) => {
            if (graphQLErrors)
              graphQLErrors.map(({ message, locations, path }) =>
                console.log(
                  `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
                )
              );
            if (networkError) console.log(`[Network error]: ${networkError}`);
          }),
          split(
            ({ query, mutation }) => {
              const definition = getMainDefinition(query);
              return (
                definition.kind === "OperationDefinition" &&
                definition.operation === "subscription"
              );
            },
            wsLink,
            httpLink,
          )
        ]),
        )
      });
      const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");

      if (!isLoggedIn || isLoggedIn === "false") {
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }
      setLoaded(true);
      setClient(client);
    } catch (e) {
      console.log(e);
    }
  };


  useEffect(() => {
    preLoad();
  }, []);

  return loaded && client && isLoggedIn !== null ? (
    <ApolloProvider client={client}>
      <ThemeProvider theme={styles}>
        <AuthProvider isLoggedIn={isLoggedIn}>
          <MenuProvider>
            <NavController />
          </MenuProvider>
        </AuthProvider>
      </ThemeProvider>
    </ApolloProvider>
  ) : (
      <AppLoading />
    );
}