import * as React from "react";

import {Button} from "react-native-paper";
import {StyleSheet} from "react-native";
import {colorScheme} from "../../../constants/Colors";

const AuthScreenButton = (props) => {
    return (
        <Button
            mode={props.type === 'signup' ? 'contained' : 'outlined'}
            onPress={props.onPress}
            style={[styles.button, styles[props.type]]}
            labelStyle={[
                styles.labelStyle,
                props.type !== 'signup' && {color: colorScheme.black},
            ]}
            contentStyle={styles.contentStyle}
        >
            {props.children}
        </Button>
    );
};

const styles = StyleSheet.create({
    contentStyle: {
        height: "100%",
        width: "100%",
    },
    labelStyle: {
        fontSize: 20,
    },
    button: {
        justifyContent: "center",
        width: "100%",
        borderRadius: 6,
        maxHeight: 80,
        fontSize: 3,
    },
    login: {
        backgroundColor: colorScheme.white
    },
    signup: {},// in case well need specific stying for each
    social: {
        width: "45%",
        backgroundColor: colorScheme.white
    },
});

export default AuthScreenButton;
