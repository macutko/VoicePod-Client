import React from "react";
import {Image, StyleSheet} from "react-native";
import Title from "react-native-paper/src/components/Typography/Title";
import OfferTemplate from "./OfferTemplate";

export default class IntroOffer extends React.Component {
    constructor(props) {
        super(props);
    }

    submit = (voiceClip) => {
        this.props.navigation.navigate("ProblemOffer", {
            ...this.props.route.params,
            intro: voiceClip,
        });
    };

    render() {
        return (
            <OfferTemplate
                {...this.props}
                submit={(voiceClip) => this.submit(voiceClip)}
                current={"IntroOffer"}
                description={"Press the microphone and speak for 1 minute."}
                title={"Intro"}
            >
                <>
                    <Image
                        style={styles.image}
                        source={require("../../assets/images/intro.png")}
                    />
                    <Title style={styles.title}>Who are you?</Title>
                </>
            </OfferTemplate>
        );
    }
}

const styles = StyleSheet.create({
    image: {
        resizeMode: "contain",
        flex: 0.7,
    },
    title: {
        fontSize: 30,
    },
    description: {
        fontSize: 13,
    },
});
