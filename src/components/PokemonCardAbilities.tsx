import { PokemonAbility } from "pokenode-ts";
import React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";

type Props = {
    abilities: PokemonAbility[];
};

export function PokemonCardAbilities({ abilities }: Props) {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.titleText}>Abilities: </Text>
            </View>

            <View style={styles.innerContainer}>
                <Text style={styles.titleText}>{abilities.map((ability) => ability.ability.name + " ")}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
    },
    innerContainer: {
        flex: 1,
        flexDirection: "row",
    },
    titleText: {
        fontSize: 14,
        fontWeight: "500",
        textTransform: "capitalize",
    },
});
