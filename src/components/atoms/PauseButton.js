import {colorScheme} from "../../constants/Colors";
import React from "react";
import {IconButton} from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import {StyleSheet} from "react-native";

const PauseButton = ({sound}) => {

    const pause = () => {
        sound.pauseAsync().then().catch(e => console.log(e))
    }

    return (

        <IconButton
            style={styles.button}
            icon={(props) => (
                <Ionicons
                    {...props}
                    name={"pause"}
                    color={colorScheme.secondary}
                />
            )}
            onPress={() => pause()}
        />

    )
}
export default PauseButton


const styles = StyleSheet.create({
    button: {
        alignSelf: "center",
        color: colorScheme.secondary,
    },

});
