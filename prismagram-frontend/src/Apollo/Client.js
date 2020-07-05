import ApolloClient from "apollo-boost";
import { defaults, resolvers } from "./LocalState";

export default new ApolloClient({
    uri: "http://192.168.8.105:4000",
    clientState: {
        defaults,
        resolvers
    },
    headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
});