import React from "react";
import styled from "styled-components";
import { Image } from "react-native";

const TouchableOpacity = styled.TouchableOpacity`
`;

const View = styled.View`
`;

export default () => (
    <TouchableOpacity onPress={() => null}>
        <Image style={{ height: 30, width: 30, borderRadius: 15 }} source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRWxaQyVhGWEVUqTMeX3b95Zy8TDjBkF08szVOLeyMWm38a5db4sX9k6ADA3Va7dsY_6OO0_AsC03lSmyshPPQY9GZFX44ELSKcrhoU9OV8Zi7ePmOg7jfD_e4oE56fYO1KwEbl_bWBI6DiY-PRnqQntJlXfB0gBQO6GMeYJbFTf7uR_BPxMT_d2xcyBn9wNdZtbNoJiVZF7I5kq7K9vJBIbJ_0IsSvyw-61QGtxu-s2aCYSm98JHsCfxEJIltD_TSRBNwau4n8kp61pZF27fUR5NzLbNtqlUL1YvzmK1BNTOGVEUJ-79C0ENyTNj2ydmSpCOYUBRMPggQuJ_T2r4QrpZmhcvFawL52z6_5AjEMLdsS0qS9wujAJcD1Jdo18EIrzb4Zqc9_BlUHzwFVU3gPY6KnUuIx_38drw3fr8EVqDqDzNQlabkIxy4&usqp=CAU" }} />
    </TouchableOpacity>
)