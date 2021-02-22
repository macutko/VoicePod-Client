import React from "react";
import {StyleSheet} from "react-native";

import Main from "./src/Main";
import {configureFonts, DefaultTheme, Provider as PaperProvider,} from "react-native-paper";
import {colorScheme} from "./src/constants/Colors";

const fontConfig = {
    default: {
        regular: {
            fontFamily: "Asap-Regular",
            fontWeight: "normal",
        },
        medium: {
            fontFamily: "Asap-Regular",
            fontWeight: "normal",
        },
        light: {
            fontFamily: "Asap-Regular",
            fontWeight: "normal",
        },
        thin: {
            fontFamily: "Asap-Regular",
            fontWeight: "normal",
        },
    },
};

const theme = {
    ...DefaultTheme,
    roundness: 2,
    mode: "adaptive",
    colors: {
        ...DefaultTheme.colors,
        primary: colorScheme.primary,
        accent: colorScheme.accent,
        background: colorScheme.background,
        surface: colorScheme.surface,
        text: colorScheme.text,
        placeholder: colorScheme.placeholder,
    },
    fonts: configureFonts(fontConfig),
};

export default function App() {
    return (
        <PaperProvider theme={theme}>
            <Main/>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
