import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Pokemon } from "pokenode-ts";
import React, { useCallback } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "./Themed";

type Props = {
    searchValue: string;
    pokemon: Pokemon;
};

export function SearchHistoryListItem(props: Props) {
    const router = useRouter();

    const handleOnListItemPress = useCallback(() => {
        router.push({ pathname: "/modal", params: { searchName: props.searchValue } });
    }, [props.searchValue, router]);

    return (
        <TouchableOpacity onPress={handleOnListItemPress} style={styles.containerOuter}>
            <View style={styles.leftContainer}>
                <Image style={styles.image} source={props.pokemon.sprites.front_default} contentFit="contain" />

                <View style={styles.nameContainer}>
                    <Text style={styles.titleText}>{props.pokemon.name}</Text>
                </View>
            </View>

            <View style={styles.rightContainer}>
                <Ionicons name="chevron-forward" size={24} color="lightgray" />
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    containerOuter: {
        flexDirection: "row",
        flex: 1,
        borderRadius: 4,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: "lightgrey",
    },
    leftContainer: {
        flex: 1,
        flexDirection: "row",
    },
    nameContainer: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 16,
    },
    titleText: {
        fontSize: 14,
        fontWeight: "500",
        textTransform: "capitalize",
    },
    image: {
        height: 64,
        width: 64,
    },
    rightContainer: {
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 16,
    },
});
