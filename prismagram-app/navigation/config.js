import { TransitionPresets } from "@react-navigation/stack";

const config = {
    animation: 'spring',
    config: {
        stiffness: 1000,
        damping: 500,
        mass: 3,
        overshootClamping: false,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 0.01,
    },
};

export const stackOptions = {
    gestureEnabled: true,
    gestureDirection: "horizontal",
    ...TransitionPresets.SlideFromRightIOS,
    transitionSpec: {
        open: config,
        close: config,
    }
}

export const stackStyles = {
    backgroundColor: "#FFFFFF"
}