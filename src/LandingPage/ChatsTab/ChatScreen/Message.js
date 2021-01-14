import React from "react"
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {colorScheme} from "../../../constants/Colors";
import GlobalContext from "../../../GlobalState";
import * as RNFS from 'react-native-fs'
import Sound from "react-native-sound";

export default class Message extends React.Component {
    static contextType = GlobalContext
    playMessage = () => {
        // let buff = Buffer.Buffer.from(this.props.data.sound_bits, 'base64');
        let path = RNFS.DocumentDirectoryPath + `${this.props.data.id}.wav`;
        RNFS.writeFile(path, this.props.data.sound_bits, 'base64').then((res) => {

            Sound.setCategory('Playback');

            let whoosh = new Sound(path, Sound.MAIN_BUNDLE, (error) => {
                if (error) {
                    console.log('failed to load the sound', error);
                    return;
                }
                // loaded successfully
                console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());

                // Play the sound with an onEnd callback
                whoosh.play((success) => {
                    if (success) {
                        console.log('successfully finished playing');
                    } else {
                        console.log('playback failed due to audio decoding errors');
                    }
                });
            });

            // Release the audio player resource
            whoosh.release();


        }).catch((e) =>
            console.log(e))

    }

    render() {
        return (
            <>
                <View style={{flexDirection: "column"}}>
                    <View
                        style={this.context.globalState.user.email === this.props.data.from.email ? styles.container_own : styles.container_theirs}>
                        {this.props.data.sound ?
                            <TouchableOpacity onPress={() => this.playMessage()}>
                                <Text style={styles.text}>{this.props.data.message}</Text>
                            </TouchableOpacity>

                            :


                            <Text style={styles.text}>{this.props.data.message}</Text>}
                    </View>
                </View>
            </>
        );
    }

}


const styles = StyleSheet.create({
    container_theirs: {
        alignSelf: 'flex-start',
        textAlign: 'left',
        backgroundColor: colorScheme.containerColor,
        marginLeft: 15,
        marginTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        maxWidth: "75%",
        borderRadius: 50 / 2
    },
    container_own: {
        alignSelf: 'flex-end',
        textAlign: 'right',
        backgroundColor: colorScheme.divider,
        marginLeft: 15,
        marginTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        maxWidth: "75%",
        borderRadius: 50 / 2
    },
    text: {
        fontSize: 20,
        color: colorScheme.text
    }
});
