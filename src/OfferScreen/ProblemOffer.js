import Title from "react-native-paper/src/components/Typography/Title";
import React from "react";
import Text from "react-native-paper/src/components/Typography/Text";
import OfferTemplate from "./OfferTemplate";
import {StyleSheet} from "react-native";
import {colorScheme} from "../components/constants/Colors";


export default class ProblemOffer extends React.Component {

    submit = (voiceClip) => {
        this.props.navigation.navigate('AdviceOffer', {...this.props.route.params,intro: this.props.route.params.intro, problem: voiceClip})
    }


    render() {
        return (
            <OfferTemplate {...this.props} current={'ProblemOffer'} submit={(voiceClip) => this.submit(voiceClip)}
                           navTo={'AdviceOffer'} topPart={
                <>
                    <Title style={styles.title}>What is your problem?</Title>
                    <Text style={styles.description}>Try to be as factual and as specific as possible for the other side
                        to understand your issue</Text>
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
