import React from "react";
import {StyleSheet, View} from "react-native";
import {Title} from "react-native-paper";
import {colorScheme} from "../../../constants/Colors";

import Button from "react-native-paper/src/components/Button";
import Ionicons from "react-native-vector-icons/Ionicons";
import AudioPlayer from "../../atoms/AudioPlayer/AudioPlayer";
//TODO: REFACTOR
export default class OfferMessage extends React.Component {
    acceptOffer = () => {
        this.props.socket.emit(
            "acceptOffer",
            {offerId: this.props.data.id},
            (err, res) => {
                if (err) console.log(`Error in OfferMessage ${err}`);
                if (res) {
                    console.log(`Res Offer ${res}`);
                }
            }
        );
        this.props.accept();
    };
    rejectOffer = () => {
        this.props.reject();
    };

    render() {
        return (
            <View style={styles.offer_container}>
                <Title style={styles.container_theirs}>Who?</Title>
                <AudioPlayer
                    soundBits={this.props.data.introSoundBits}
                    fileName={`intro_offer_${this.props.data.id}`}
                />
                <Title style={styles.container_theirs}>Advice?</Title>
                <AudioPlayer
                    soundBits={this.props.data.adviceSoundBits}
                    fileName={`advice_offer_${this.props.data.id}`}
                />
                <Title style={styles.container_theirs}>Problem?</Title>
                <AudioPlayer
                    soundBits={this.props.data.problemSoundBits}
                    fileName={`problem_offer_${this.props.data.id}`}
                />
                <Title style={styles.container_theirs}>Outcome?</Title>
                <AudioPlayer
                    soundBits={this.props.data.outcomeSoundBits}
                    fileName={`outcome_offer_${this.props.data.id}`}
                />

                {this.props.thisIsMyClient && !this.props.data.accepted ? (
                    <View style={styles.mainContainer}>
                        <View style={styles.container}>
                            <Button
                                style={styles.button}
                                icon={(props) => (
                                    <Ionicons {...props} name={"checkmark-circle"}/>
                                )}
                                mode="outlined"
                                onPress={() => this.acceptOffer()}
                            >
                                Accept
                            </Button>
                            <Button
                                style={styles.button}
                                icon={(props) => <Ionicons {...props} name={"close-circle"}/>}
                                mode="outlined"
                                onPress={() => this.rejectOffer()}
                            >
                                Reject
                            </Button>
                        </View>
                    </View>
                ) : null}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    offer_container: {
        marginTop: 10,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        width: "75%",
    },
    container_theirs: {
        borderRadius: 50 / 2,
    },
    slider: {
        height: 65,
        width: "90%",
    },
    button: {
        alignSelf: "center",
        backgroundColor: colorScheme.background,
    },
    mainContainer: {
        alignContent: "center",
        justifyContent: "center",
        width: "100%",
        paddingHorizontal: "5%",
        marginTop: 20,
    },
    container: {
        justifyContent: "space-between",
        flexDirection: "row",
    },
});
