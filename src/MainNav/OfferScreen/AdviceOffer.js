import Title from "react-native-paper/src/components/Typography/Title";
import React from "react";
import Text from "react-native-paper/src/components/Typography/Text";
import OfferTemplate from "./OfferTemplate";
import {StyleSheet} from "react-native";
import {colorScheme} from "../../components/constants/Colors";


export default class AdviceOffer extends React.Component {


    submit = (voiceClip) => {
        this.props.navigation.navigate('OutcomeOffer', {
            ...this.props.route.params,
            intro: this.props.route.params.intro,
            problem: this.props.route.params.problem,
            advice: voiceClip
        })
    }


    render() {
        return (
            <OfferTemplate {...this.props} submit={(voiceClip) => this.submit(voiceClip)} current={'AdviceOffer'}
                           navTo={'OutcomeOffer'} topPart={
                <>
                    <Title style={styles.title}>What type of advice are you hoping to get?</Title>
                    <Text style={styles.description}>Try to understand the background your mate. A rocket scientist
                        might not be the best person to ask for plumbing advice</Text>
                </>
            }
            />

        );
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 25,
        width: "80%",
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
