import React from "react";
import {StyleSheet, View} from "react-native";
import {Title} from "react-native-paper";
import {colorScheme} from "../../../components/constants/Colors";
import AudioPlayer from "../../../components/AudioPlayer";
import Button from "react-native-paper/src/components/Button";
import Ionicons from "react-native-vector-icons/Ionicons";

export default class OfferMessage extends React.Component {
    acceptOffer = () => {
        this.props.socket.emit('acceptOffer', {offerId: this.props.data.id}, (err, res) => {
            if (err) console.log(`Error in OfferMessage ${err}`)
            if (res) {
                console.log(`Res Offer ${res}`)
            }
        })

    }
    rejectOffer = () => {

    }

    render() {
        return (
            <View style={styles.offer_container}>
                <Title style={styles.container_theirs}>Who?</Title>
                <AudioPlayer soundBits={this.props.data.introSoundBits}
                             pathToSound={`intro_offer_${this.props.data.id}`}/>
                <Title style={styles.container_theirs}>Advice?</Title>
                <AudioPlayer soundBits={this.props.data.adviceSoundBits}
                             pathToSound={`advice_offer_${this.props.data.id}`}/>
                <Title style={styles.container_theirs}>Problem?</Title>
                <AudioPlayer soundBits={this.props.data.problemSoundBits}
                             pathToSound={`problem_offer_${this.props.data.id}`}/>
                <Title style={styles.container_theirs}>Outcome?</Title>
                <AudioPlayer soundBits={this.props.data.outcomeSoundBits}
                             pathToSound={`outcome_offer_${this.props.data.id}`}/>

                {this.props.thisIsMyClient ?
                    <View style={styles.mainContainer}>
                        <View style={styles.container}>
                            <Button style={styles.button}
                                    icon={props => <Ionicons {...props} name={'checkmark-circle'}/>}
                                    mode="outlined"
                                    onPress={() => this.acceptOffer()}>
                                Accept
                            </Button>
                            <Button style={styles.button} icon={props => <Ionicons {...props} name={'close-circle'}/>}
                                    mode="outlined"
                                    onPress={() => this.rejectOffer()}>
                                Reject
                            </Button>
                        </View>
                    </View>
                    : null}
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
        borderRadius: 50 / 2
    },
    slider: {
        height: 65,
        width: "90%",
    },
    button: {
        alignSelf: "center",
        backgroundColor: colorScheme.background
    },
    mainContainer: {
        alignContent: 'center',
        justifyContent: 'center',
        width: "100%",
        paddingHorizontal: "5%",
        marginTop: 20
    },
    container: {
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
});
