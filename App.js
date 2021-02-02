import React from 'react';

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

const App: () => React$Node = () => {
    return (
        <>
            <PaperProvider theme={theme}>
                <Main/>
            </PaperProvider>
        </>
    );
};
export default App;
