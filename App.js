import React from 'react';
import {StyleSheet} from 'react-native';

import Main from "./src/Main";
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {colorScheme} from "./src/constants/Colors";

const theme = {
    ...DefaultTheme,
    roundness: 2,
    mode: 'adaptive',
    colors: {
        ...DefaultTheme.colors,
        primary: colorScheme.primary,
        accent: colorScheme.accent,
    },
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
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
