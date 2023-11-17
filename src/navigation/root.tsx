import Ionicons from "@expo/vector-icons/Ionicons";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack, useRouter } from "expo-router";
import React, { useCallback } from "react";
import { Switch } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { selectColorScheme, setColorScheme } from "../redux/slices/device";
export { ErrorBoundary } from "expo-router";

export default function RootNavigator() {
    const router = useRouter();

    const dispatch = useDispatch();
    const colorScheme = useSelector(selectColorScheme);

    const handleOnToggleTheme = useCallback(() => {
        const nextColorScheme = colorScheme === "light" ? "dark" : "light";
        dispatch(setColorScheme(nextColorScheme));
    }, [colorScheme, dispatch]);

    const isDarkModeEnabled = colorScheme === "dark";
    return (
        <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
            <Stack>
                <Stack.Screen
                    name="index"
                    options={{
                        headerTitle: "Pokédex",
                        headerRight: () => {
                            return (
                                <Switch
                                    trackColor={{ false: "#767577", true: "lightgray" }}
                                    thumbColor={isDarkModeEnabled ? "#7514F5" : "white"}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={handleOnToggleTheme}
                                    value={isDarkModeEnabled}
                                />
                            );
                        },
                    }}
                />
                <Stack.Screen
                    name="modal"
                    options={{
                        presentation: "modal",
                        headerTitle: "Pokemon Info",
                        headerRight: () => {
                            return (
                                <Ionicons
                                    name="close-circle"
                                    size={32}
                                    color={colorScheme === "light" ? "black" : "white"}
                                    onPress={() => router.back()}
                                />
                            );
                        },
                    }}
                />
            </Stack>
        </ThemeProvider>
    );
}
