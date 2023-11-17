import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { EvolutionChain } from "pokenode-ts";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { PokemonCard } from "../components/PokemonCard";
import { ScrollView, Text, View } from "../components/Themed";
import { useLazyGetEvolutionByIdQuery } from "../redux/slices/api";
import { RootState } from "../redux/store";

export default function ModalScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();

    const [evolutionChain, setEvolutionChain] = useState<EvolutionChain>();

    const searchHistory = useSelector((state: RootState) => state.searchHistory.searchValues);
    const result = useMemo(() => searchHistory.find((item) => item.searchValue === params.searchName), [params.searchName, searchHistory]);

    const [getLazyEvolutionByIdQuery] = useLazyGetEvolutionByIdQuery();

    useEffect(() => {
        const bootstrapAsync = async () => {
            if (result) {
                try {
                    const queryResult = await getLazyEvolutionByIdQuery(result.searchResult.id).unwrap();
                    setEvolutionChain(queryResult);
                } catch (error) {
                    __DEV__ && console.log(error);
                }
            }
        };

        bootstrapAsync();
    }, [getLazyEvolutionByIdQuery, result]);

    const handleOnEvolutionChainPress = useCallback(() => {
        router.back();
        router.setParams({ searchName: evolutionChain?.chain.species.name ?? "" });
    }, [evolutionChain?.chain.species.name, router]);

    if (!result) return null;
    return (
        <ScrollView style={styles.container} alwaysBounceVertical={false}>
            <StatusBar style={"light"} />

            <PokemonCard pokemon={result.searchResult} />

            <View style={styles.divider} />
            <Text style={styles.titleText}>Evolution Details</Text>
            {evolutionChain?.chain.species.name ? (
                <React.Fragment>
                    <Text>The Pokémon species at this point in the evolution chain</Text>
                    <Text style={styles.linkText} onPress={handleOnEvolutionChainPress}>
                        {evolutionChain?.chain.species.name}
                    </Text>
                </React.Fragment>
            ) : (
                <Text>No Evolution details found.</Text>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    titleText: {
        fontSize: 16,
        fontWeight: "600",
        paddingVertical: 8,
    },
    divider: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: "lightgray",
        alignSelf: "stretch",
        marginVertical: 8,
    },
    linkText: {
        color: "#147efb"
    }
});
