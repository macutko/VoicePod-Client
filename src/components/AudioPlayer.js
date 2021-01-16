import {Button} from "react-native-paper";
import React from "react";
import Sound from "react-native-sound";
import Ionicons from "react-native-vector-icons/Ionicons";
import {View} from "react-native";

export default class AudioPlayer extends React.Component {


    playSound = () => {
        // let buff = Buffer.Buffer.from(this.props.data.sound_bits, 'base64');
        // let path = RNFS.DocumentDirectoryPath + `${this.props.data.id}.wav`;
        let path = this.props.pathToSound


        Sound.setCategory('Playback');

        let s = new Sound(path, Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log('failed to load the sound', error);
                return;
            }

            // loaded successfully
            console.log('duration in seconds: ' + s.getDuration() + 'number of channels: ' + s.getNumberOfChannels());

            // Play the sound with an onEnd callback
            s.play((success) => {
                if (success) {
                    console.log('successfully finished playing');
                } else {
                    console.log('playback failed due to audio decoding errors');
                }
            });
        });

        // Release the audio player resource
        s.release();

    }

    render() {
        return (
            <View style={this.props.style}>
                <Button mode="contained"
                        icon={props => <Ionicons {...props} name={'play'}/>}
                        onPress={() => this.playSound()}>
                    Play
                </Button>
            </View>
        );
    }
}
