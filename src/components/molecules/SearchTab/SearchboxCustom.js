import React from "react";
import { StyleSheet, View } from "react-native";
import { TextInput } from "react-native";
import { colorScheme } from "../../../constants/Colors";
import Ionicons from "react-native-vector-icons/Ionicons";

const SearchboxCustom = (props) => {
    return (
        <View style={styles.searchSection}>
            <Ionicons style={styles.searchIcon} name="ios-search" />
            <TextInput
                value={props.value}
                onChangeText={props.onChangeText}
                style={styles.input}
                placeholder={props.placeholder}
                placeholderTextColor={colorScheme.surface}
                selectionColor={colorScheme.surface}
            />
            <Ionicons
                style={styles.deleteIcon}
                name="close"
                onPress={props.clearInput}
            />
        </View>
    );
};

export default SearchboxCustom;

const styles = StyleSheet.create({
    searchSection: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        marginVertical: 10,
        backgroundColor: "transparent",
    },
    searchIcon: {
        padding: 10,
        color: colorScheme.surface,
        fontSize: 30,
    },
    deleteIcon: {
        padding: 10,
        color: colorScheme.surface,
        fontSize: 30,
    },
    input: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        height: 50,
        backgroundColor: "transparent",
        fontSize: 19,
        color: colorScheme.surface,
    },
});
