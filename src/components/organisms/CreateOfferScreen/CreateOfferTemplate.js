import React from "react"
import {Image, StyleSheet, View} from "react-native"
import {Text} from "react-native-paper"

import {colorScheme} from "../../../constants/Colors"
import CreateOfferStatusBar from "../../molecules/CreateOfferScreen/CreateOfferStatusBar"
import RecordButton from "../../atoms/RecordButton"
import AudioPlayer from "../../atoms/AudioPlayer"


export default class CreateOfferTemplate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            voiceClip: null,
            pathToFile: null,
            counter: 0,
        }
    }

    async componentDidMount() {
        console.log("Loading audiorecord")
    }

    returnData = (r) => {
        this.setState(r)
    }
    returnSeconds = (s) => {
        this.setState({
            counter: s,
        })
    }

    render() {
        return (
            <>
                <CreateOfferStatusBar navigation={this.props.navigation}
                    submit={() => this.props.submit(this.state.voiceClip)}
                    allowSubmit={!!this.state.voiceClip} title={this.props.title}/>

                <View style={styles.container}>
                    {this.props.children}

                    <RecordButton returnData={this.returnData} returnSeconds={this.returnSeconds} limit={60}>
                        <Image
                            style={styles.mic}
                            source={require("../../../assets/images/mic.png")}
                        />
                    </RecordButton>

                    <Text style={styles.counter}>{this.state.counter}</Text>

                    {!this.state.voiceClip ? (
                        <Text style={styles.description}>{this.props.description}</Text>
                    ) : (
                        <AudioPlayer
                            pathToSound={this.state.pathToFile}
                            width={"60%"}
                        />
                    )}
                </View>
            </>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colorScheme.white,
        flex: 1,
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    mic: {
        width: 60,
        height: 140,
        resizeMode: "contain",
    },
    counter: {
        color: colorScheme.secondary,
        fontWeight: "bold",
        fontSize: 25,
    },
    description: {
        fontSize: 13,
        lineHeight: 50,
    },
})
