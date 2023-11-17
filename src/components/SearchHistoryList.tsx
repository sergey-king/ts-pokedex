import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useCallback, useMemo } from "react";
import { FlatList, ListRenderItemInfo, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { SearchHistoryListItem } from "../components/SearchHistoryListItem";
import { SearchRecord, selectSearchHistory } from "../redux/slices/searchHistory";
import { Text, View } from "./Themed";

export function SearchHistoryList() {
    const searchHistoryValues = useSelector(selectSearchHistory);

    const keyExtractor = useCallback((item: SearchRecord) => {
        return item.searchId;
    }, []);

    const renderItem = useCallback((itemInfo: ListRenderItemInfo<SearchRecord>) => {
        return <SearchHistoryListItem searchValue={itemInfo.item.searchValue} pokemon={itemInfo.item.searchResult} />;
    }, []);

    const renderListHeaderComponent = useCallback(() => {
        return (
            <View style={styles.listHeaderContainer} lightColor="lightgray" darkColor="#12131F">
                <Text style={styles.listHeaderTitle}>Search History</Text>
                <Text style={styles.listHeaderTitle}>{searchHistoryValues.length}</Text>
            </View>
        );
    }, [searchHistoryValues.length]);

    const renderListEmptyComponent = useCallback(() => {
        return (
            <View style={styles.listEmptyContainer}>
                <Text style={styles.listEmptyTitle}>Search History Empty</Text>
                <Ionicons name="list-circle-outline" size={64} color="lightgray" />
            </View>
        );
    }, []);

    const reversedPokemonList = useMemo(() => [...searchHistoryValues].reverse(), [searchHistoryValues]);

    return (
        <FlatList
            data={reversedPokemonList}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            windowSize={21} // performane optimization setting
            initialNumToRender={10} // performane optimization setting
            maxToRenderPerBatch={10} // performane optimization setting
            stickyHeaderIndices={[0]}
            alwaysBounceVertical={false}
            ListHeaderComponent={renderListHeaderComponent}
            ListEmptyComponent={renderListEmptyComponent}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 16,
        marginBottom: 16,
    },
    contentContainer: {
        flexGrow: 1,
    },
    listEmptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
    },
    listEmptyTitle: {
        color: "lightgray",
        fontSize: 16,
        fontWeight: "500",
        paddingVertical: 8,
    },
    listHeaderTitle: {
        fontSize: 14,
        fontWeight: "500",
    },
    listHeaderContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 8,
        borderRadius: 4,
    },
});
