import {StyleSheet, View} from "react-native";
import {Title} from "react-native-paper";
import AudioPlayer from "../atoms/AudioPlayer";
import React from "react";

const Offer = ({data}) => {
    return (
        <View style={styles.offer_container}>
            <Title style={styles.container_theirs}>Who?</Title>
            <AudioPlayer
                soundBits={data.introSoundBits}
            />

            <Title style={styles.container_theirs}>Problem?</Title>
            <AudioPlayer
                soundBits={data.problemSoundBits}
            />
            <Title>Original budget: {data.budgetMinutes} minutes</Title>
        </View>
    );

}

const styles = StyleSheet.create({

    offer_container: {
        marginTop: 10,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
    },
    container_theirs: {
        borderRadius: 50 / 2,
    },
});

export default Offer
