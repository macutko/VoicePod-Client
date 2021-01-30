import Title from "react-native-paper/src/components/Typography/Title";
import React from "react";
import Text from "react-native-paper/src/components/Typography/Text";
import OfferTemplate from "./OfferTemplate";
import { StyleSheet, Image } from "react-native";
import { colorScheme } from "../../components/constants/Colors";
import { Appbar } from "react-native-paper";

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
    paddingTop: 10,
    fontSize: 15,
    fontStyle: "italic",
    color: colorScheme.neutral_subtle,
    width: "80%",
    textAlign: "justify",
  },
});
