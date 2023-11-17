import * as Crypto from "expo-crypto";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect, useState } from "react";
import { Alert, Keyboard, KeyboardAvoidingView, Linking, Platform, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ButtonPrimary } from "../components/ButtonPrimary";
import { ButtonSecondary } from "../components/ButtonSecondary";
import { SearchHistoryList } from "../components/SearchHistoryList";
import { TextInput, View } from "../components/Themed";
import { useLazyGetPokemonByNameQuery } from "../redux/slices/api";
import { selectColorScheme } from "../redux/slices/device";
import { addSearchValue, clearSearchValues } from "../redux/slices/searchHistory";
import { SafeAreaView } from "react-native-safe-area-context";

export default function IndexScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();

    const dispatch = useDispatch();

    const colorScheme = useSelector(selectColorScheme);
    const [getLazyPokemonByNameQuery] = useLazyGetPokemonByNameQuery();

    const [searchName, setSearchName] = useState<string>("");
    const [searchCompleted, setSearchCompleted] = useState(true);


    useEffect(() => {
        if (params?.searchName) setSearchName(params.searchName.toString());
    }, [params?.searchName]);

    const handleOnButtonSearchPress = useCallback(async () => {
        try {
            if (!searchName) return;

            setSearchCompleted(false); // disable the search button while searching
            const searchNameSanitized = searchName.trim().toLowerCase(); // sanitize the search name

            const pokemon = await getLazyPokemonByNameQuery(searchNameSanitized).unwrap();
            if (pokemon) {
                dispatch(addSearchValue({ searchId: Crypto.randomUUID(), searchValue: searchName, searchResult: pokemon })); // record search history
                router.push({ pathname: "/modal", params: { searchName } });
            }
        } catch (error) {
            __DEV__ && console.log(error);

            Alert.alert(
                "Oops!",
                "Pokemon with that name is not found. Please try again a different name or contact support if the issue persists.",
                [
                    { text: "OK", onPress: () => {}, style: "cancel" },
                    { text: "Contact Support", onPress: () => Linking.openURL("https://github.com/sergey-king") },
                ]
            );
        } finally {
            // clean up and re-nable the search button
            setSearchName("");
            setSearchCompleted(true);
        }
    }, [dispatch, getLazyPokemonByNameQuery, router, searchName]);

    const handleOnClearSearchHistory = useCallback(async () => {
        try {
            dispatch(clearSearchValues());
        } catch (error) {
            __DEV__ && console.log(error);
        }
    }, [dispatch]);

    return (
        <SafeAreaView style={styles.containerSafe} edges={["bottom"]}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.containerInner}>
                        <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />

                        <TextInput
                            style={styles.searchNameTextInput}
                            onChangeText={setSearchName}
                            value={searchName}
                            autoCapitalize={"none"}
                            placeholder="Search for any pokemon name"
                            placeholderTextColor={colorScheme === "dark" ? "gray" : "lightgray"}
                            clearButtonMode="always"
                        />

                        <SearchHistoryList />

                        <ButtonPrimary
                            title="Search"
                            onPress={handleOnButtonSearchPress}
                            isDisabled={searchName === ""}
                            isLoading={!searchCompleted}
                        />
                        <ButtonSecondary title="Clear Search History" onPress={handleOnClearSearchHistory} />
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    containerSafe: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
    },
    containerInner: {
        flex: 1,
        justifyContent: "center",
        padding: 16,
    },
    searchNameTextInput: {
        padding: 10,
        borderWidth: 1,
        width: "100%",
        borderRadius: 4,
        fontWeight: "600",
    },
});
