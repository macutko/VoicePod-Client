import React from "react";
import { Image, StyleSheet } from "react-native";
import Title from "react-native-paper/src/components/Typography/Title";
import { colorScheme } from "../../constants/Colors";
import OfferTemplate from "./OfferTemplate";

export default class ProblemOffer extends React.Component {
  submit = (voiceClip) => {
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
        style={styles.container}
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