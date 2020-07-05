import { HttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";

export const address = "://192.168.8.105:4000/";

export const httpLink = new HttpLink({
    uri: 'http' + address
});

export const wsLink = new WebSocketLink({
    uri: 'ws' + address,
    options: {
        reconnect: true
    }
});
