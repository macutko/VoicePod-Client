import React from "react";
import { StyleSheet, Image } from "react-native";
import Text from "react-native-paper/src/components/Typography/Text";
import Title from "react-native-paper/src/components/Typography/Title";
import { colorScheme } from "../../constants/Colors";
import OfferTemplate from "./OfferTemplate";

export default class ProblemOffer extends React.Component {
  submit = (voiceClip) => {
    console.log("here");
    this.props.navigation.navigate("BudgetOffer", {
      ...this.props.route.params,
      intro: this.props.route.params.intro,
      problem: voiceClip,
    });
  };

  render() {
    return (
      <OfferTemplate
        {...this.props}
        current={"ProblemOffer"}
        submit={(voiceClip) => this.submit(voiceClip)}
        description={"Try to be as factual and as specific as possible."}
        title={"Problem"}
      >
        <>
          <Image
            style={styles.image}
            source={require("../../assets/images/problem.png")}
          />
          <Title style={styles.title}>What is your problem?</Title>
        </>
      </OfferTemplate>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    aspectRatio: 0.8, 
    resizeMode: 'contain',
    height: 380
  },
  title: {
    marginTop: -10, // I am not sure how to position image 
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
