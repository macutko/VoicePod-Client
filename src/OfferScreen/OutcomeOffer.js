import Title from "react-native-paper/src/components/Typography/Title";
import React from "react";
import Text from "react-native-paper/src/components/Typography/Text";
import OfferTemplate from "./OfferTemplate";
import {StyleSheet} from "react-native";
import {colorScheme} from "../components/constants/Colors";


export default class OutcomeOffer extends React.Component {


    submit = (voiceClip) => {
        this.props.navigation.navigate('BudgetOffer', {
            ...this.props.route.params,
            intro: this.props.route.params.intro,
            problem: this.props.route.params.problem,
            advice: this.props.route.params.advice,
            outcome: voiceClip
        })
    }


    render() {
        return (
            <OfferTemplate {...this.props} submit={(voiceClip) => this.submit(voiceClip)} current={'OutcomeOffer'}
                           navTo={'BudgetOffer'} topPart={
                <>
                    <Title style={styles.title}>What outcome do you expect?</Title>
                    <Text style={styles.description}>This is similar to the previous one, but more on an expectation
                        leve. Less factual.
                        You might be expecting a solution to a problem, but also some comfort in hearing that what you
                        are experiencing is normal. This is the type of thing that makes your mate understand your
                        situation better.
                    </Text>
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
