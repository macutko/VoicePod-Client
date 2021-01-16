import Title from "react-native-paper/src/components/Typography/Title";
import React from "react";
import Text from "react-native-paper/src/components/Typography/Text";
import OfferTemplate from "./OfferTemplate";
import {StyleSheet} from "react-native";
import {colorScheme} from "../components/constants/Colors";


export default class IntroOffer extends React.Component {

    submit = (voiceClip) => {
        this.props.navigation.navigate('ProblemOffer', {intro: voiceClip})
    }

    render() {
        return (
            <OfferTemplate {...this.props} submit={(voiceClip) => this.submit(voiceClip)} current={'IntroOffer'} navTo={'ProblemOffer'}
                           topPart={
                               <>
                                   <Title style={styles.title}>Who are you</Title>
                                   <Text style={styles.description}>Let the other side know how to connect with you! It
                                       will make the
                                       process easier</Text>
                               </>
                           }
            />

        );
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 25
    },
    description: {
        paddingTop: 10,
        fontSize: 15,
        fontStyle: 'italic',
        color: colorScheme.neutral_subtle,
        width: "80%",
        textAlign: 'justify'
    },
});
