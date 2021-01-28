import React from "react";
import Text from "react-native-paper/src/components/Typography/Text";
import { StyleSheet } from "react-native";
import { colorScheme } from "../../../components/constants/Colors";
import OfferMessage from "../Chat/OfferMessage";

export default class ViewOffer extends React.Component {
  render() {
    console.log(this.props);

    return (
      <Text>View Offer</Text>
      // <OfferMessage></OfferMessage>
    );

  }
}

const styles = StyleSheet.create({});
