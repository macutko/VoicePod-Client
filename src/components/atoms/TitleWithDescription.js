import React from "react";
import { StyleSheet, View } from "react-native";
import TitleCustom from "./TitleCustom";

const TitleWithDescription = (props) => {
  return (
    <View style={[styles.wrapper, props.center && styles.center]}>
      <TitleCustom>{props.children}</TitleCustom>
      <TitleCustom secondary>{props.description}</TitleCustom>
    </View>
  );
};
export default TitleWithDescription;

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: "flex-start",
  },
  center: {
    alignSelf: "center",
  },
});
