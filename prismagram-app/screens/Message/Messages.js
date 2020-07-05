import React, { useState } from "react";
import styled from "styled-components";
import { ScrollView } from "react-native-gesture-handler";
import { gql } from "apollo-boost";
import Room from "../../components/Room";
import { useQuery } from "@apollo/react-hooks";
import { ActivityIndicator, RefreshControl } from "react-native";
import { ROOM_FRAGMENT } from "../../fragments";

const SEE_ROOMS = gql`
    query seeRooms {
        seeRooms {
            ...RoomParts
        }
    }
    ${ROOM_FRAGMENT}
`;

export default ({ setUser }) => {
    const [refreshing, setRefreshing] = useState(false);
    const { loading, data, refetch } = useQuery(SEE_ROOMS, {
        fetchPolicy: "network-only"
    });

    const refresh = async () => {
        try {
            setRefreshing(true);
            await refetch();
        } catch (e) {
            console.log(e);
        } finally {
            setRefreshing(false);
        }
    };

    return (
        <ScrollView refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={refresh} />
        }>
            {loading ? <ActivityIndicator />
                :
                data && data.seeRooms && data.seeRooms.map((room, index) =>
                    <>
                        <Room key={index} {...room} setUser={setUser} />
                    </>
                )}
        </ScrollView>
    );
};