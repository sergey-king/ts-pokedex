import React from "react";
import { ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "../components/Themed";

type Props = {
    title: string;
    onPress: () => void;
    isLoading?: boolean;
    isDisabled?: boolean;
};

export function ButtonPrimary({ title, onPress, isLoading, isDisabled }: Props) {
    return (
        <TouchableOpacity onPress={onPress} disabled={isDisabled || isLoading}>
            <View
                lightColor="#7514F5"
                darkColor="#7514F5"
                style={isDisabled || isLoading ? [styles.searchButton, styles.disabled] : styles.searchButton}>
                {isLoading ? (
                    <ActivityIndicator color={"white"} />
                ) : (
                    <Text lightColor="white" darkColor="white" style={styles.titleText}>
                        {title}
                    </Text>
                )}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    searchButton: {
        padding: 16,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
    },
    titleText: {
        fontSize: 16,
        fontWeight: "600",
    },
    disabled: {
        opacity: 0.5,
    },
});
