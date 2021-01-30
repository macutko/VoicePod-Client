import React from "react";
import {
  Image, PermissionsAndroid,
  StyleSheet,
  TouchableOpacity, View
} from "react-native";
import AudioRecord from "react-native-audio-record";
import * as RNFS from "react-native-fs";
import { Appbar, Text } from "react-native-paper";
import AudioPlayer from "../../components/AudioPlayer";
import { colorScheme } from "../../components/constants/Colors";
import { recordingSettings } from "../../components/constants/Recording";

export default class OfferTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      voiceClip: null,
      recording: false,
      pathToFile: null,
      counter: 0,
      timer: null,
    };
  }

  async componentDidMount() {
    await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    ]);
    AudioRecord.init({
      ...recordingSettings,
      wavFile: `${this.props.current}.wav`,
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  tick = () => {
    if (this.state.counter >= 60) {
      this.record();
    } else {
      this.setState({
        counter: this.state.counter + 1,
      });
    }
  };

  record = () => {
    if (!this.state.recording) {
      // start recording
      let timer = setInterval(this.tick, 1000);
      this.setState(
        {
          recording: true,
          timer: timer,
        },
        () => AudioRecord.start()
      );
    } else {
      // stop recording
      AudioRecord.stop().then((r) => {
        console.log(r);
        clearInterval(this.state.timer);
        RNFS.readFile(r, "base64").then((data) => {
          this.setState({
            voiceClip: data,
            recording: false,
            pathToFile: r,
            counter: 0,
          });
        });
      });
    }
  };

  submit = () => {
    this.props.navigation.navigate("ProblemOffer", {
      who: this.state.voiceClip,
    });
  };

  render() {
    return (
      <>
        <Appbar.Header>
          <Appbar.BackAction
            onPress={() => this.props.navigation.goBack(null)}
          />
          <Appbar.Content
            title={"Intro"}
            //   subtitle={""}
          />
          <Appbar.Action icon="arrow-right" onPress={() => this.submit()} />
        </Appbar.Header>

        <View style={styles.background}>
          {this.props.children}

          {/* <IconButton
            icon={(props) => <Ionicons {...props} name={"mic"} />}
            color={colorScheme.accent}
            size={40}
            onPress={() => this.record()}
          /> */}
          <TouchableOpacity onPress={() => this.record()}>
            <Image
              style={styles.mic}
              source={require("../../assets/images/mic.png")}
            />
          </TouchableOpacity>

          <Text style={styles.counter}>{this.state.counter}</Text>

          {this.props.bottomPart ? (
            this.props.bottomPart
          ) : (
            <Text style={styles.description}>
              Press the microphone and speak for 1 minute.
            </Text>
          )}

          {this.state.voiceClip == null || this.state.recording ? null : (
            <AudioPlayer
              style={styles.player}
              pathToSound={this.state.pathToFile}
            />
          )}

          {/* <Button
            mode="contained"
            labelStyle={styles.buttonStyle_label}
            icon={(props) => <Ionicons {...props} name={"send"} />}
            disabled={this.state.voiceClip == null || this.state.recording}
            onPress={() => this.props.submit(this.state.voiceClip)}
            style={
              this.state.voiceClip == null || this.state.recording
                ? styles.buttonStyle_disabled
                : styles.buttonStyle
            }
          >
            Next
          </Button> */}
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  mic: {
    width: 50,
    height: 100,
    // flex: 1,
    // aspectRatio: 0.1,
    resizeMode: "contain",
  },
  counter: {
    color: colorScheme.secondary,
  },
  player: {
    // marginTop: 20,
  },
  background: {
    backgroundColor: colorScheme.white,
    height: "100%",
    alignItems: "center",
  },
  buttonStyle_label: { color: colorScheme.neutral },
  buttonStyle_disabled: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: "auto",
    marginBottom: 10,
    backgroundColor: colorScheme.neutral_subtle,
    width: "80%",
  },
  buttonStyle: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: "auto",
    marginBottom: 10,
    backgroundColor: colorScheme.secondary,
    width: "80%",
  },
  description: {
    paddingTop: 10,
    fontSize: 13,
    color: colorScheme.neutral_subtle,
    width: "80%",
    textAlign: "center",
  },
});
