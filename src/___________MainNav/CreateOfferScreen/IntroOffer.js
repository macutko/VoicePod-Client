import Title from "react-native-paper/src/components/Typography/Title";
import React from "react";
import OfferTemplate from "./OfferTemplate";
import {Image, StyleSheet} from "react-native";
import {colorScheme} from "../../constants/Colors";

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
                        source={require('../../assets/images/intro.png')}
                    />
                    <Title style={styles.title}>Who are you?</Title>
                    {/* <Text style={styles.description}>
            Let the other side know how to connect with you! It will make the
            process easier.
          </Text> */}
                </>
            </OfferTemplate>
        );
    }
}

const styles = StyleSheet.create({
    image: {
        aspectRatio: 0.9,
        resizeMode: 'contain',
        height: 400
    },
    title: {
        marginTop: -40, // I am not sure how to position image
        fontSize: 30,
    },
    description: {
        paddingTop: 40,
        fontSize: 13,
        color: colorScheme.neutral_subtle,
        width: "80%",
        textAlign: "center",
    },
});
