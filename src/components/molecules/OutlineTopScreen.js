import React from "react";
import { StyleSheet, View, Text } from "react-native";
import * as layout from "../../constants/Layout";
import { colorScheme } from "../../constants/Colors";

const OutlineTopScreen = (props) => {
    return (
        <>
            <View style={styles.ovalContainer}>
                <View style={styles.oval} />
                <Text style={styles.title}>{props.title}</Text>
            </View>
            <View style={styles.contentContainer}>{props.children}</View>
        </>
    );
};

export default OutlineTopScreen;

const styles = StyleSheet.create({
    ovalContainer: {
        alignItems: "center",
        position: "absolute",
        top: -200,
        left: 0,
        right: 0,
        bottom: 0,
    },
    oval: {
        width: layout.default.window.width / 1.4,
        height: 300,
        borderRadius: layout.default.window.width * 0.6,
        transform: [{ scaleX: 2 }],
        backgroundColor: colorScheme.secondary,
    },
    contentContainer: {
        top: 100,
        paddingHorizontal: "3%"
    },
    title: {
        color: colorScheme.white,
        fontSize: 45,
        fontFamily: "Cutive-Regular",
        top: -layout.default.window.height / 8,
    },
});
