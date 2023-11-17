import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { SplashScreen } from "expo-router";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import RootNavigator from "../navigation/root";
import { store } from "../redux/store";
export { ErrorBoundary } from "expo-router";

SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
    const [loaded, error] = useFonts({
        SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
        ...FontAwesome.font,
    });

    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }
    return <RootLayoutNav />;
}

function RootLayoutNav() {
    return (
        <Provider store={store}>
            <RootNavigator />
        </Provider>
    );
}
