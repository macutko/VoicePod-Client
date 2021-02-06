import {colorScheme} from "../../../constants/Colors";
import React from "react";
import {IconButton} from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import {StyleSheet} from "react-native";

const PlayButton = ({sound}) => {

    const play = () => {
        sound.playAsync().then().catch(e => console.log(e))
    }

    return (

        <IconButton
            style={styles.button}
            icon={(props) => (
                <Ionicons
                    {...props}
                    name={"play"}
                    color={colorScheme.secondary}
                />
            )}
            onPress={() => play()}
        />

    )
}
export default PlayButton


const styles = StyleSheet.create({
    button: {
        alignSelf: "center",
        color: colorScheme.secondary,
    },

});
