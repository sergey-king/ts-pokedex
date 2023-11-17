import { Image } from "expo-image";
import { Pokemon } from "pokenode-ts";
import React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { PokemonCardAbilities } from "./PokemonCardAbilities";

type Props = {
    pokemon: Pokemon;
};

export function PokemonCard(props: Props) {
    return (
        <View style={styles.container}>
            <View>
                <Image style={styles.image} source={props.pokemon.sprites.front_default} contentFit="contain" />
            </View>

            <View style={styles.statContainer}>
                <Text style={styles.titleText}>Name: {props.pokemon.name}</Text>
                <Text style={styles.titleText}>Height: {props.pokemon.height}</Text>
                <Text style={styles.titleText}>Weight: {props.pokemon.weight}</Text>

                <PokemonCardAbilities abilities={props.pokemon.abilities} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
    },
    image: {
        height: 128,
        width: 128,
    },
    titleText: {
        fontSize: 14,
        fontWeight: "500",
        textTransform: "capitalize",
    },
    statContainer: {
        flex: 1,
        justifyContent: "center",
    },
});
