import React from "react";
import { StyleSheet } from "react-native";
import { Title } from "react-native-paper";
import { colorScheme } from "../../constants/Colors";

const TitleCustom = (props) => {
  return (
    <Title style={[styles.title, props.secondary && { ...styles.secondary }]}>
      {props.children}
    </Title>
  );
};
export default TitleCustom;

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    lineHeight: 40,
    fontFamily: "Asap-Regular",
  },
  secondary: {
    fontSize: 20,
    color: colorScheme.placeholder,
  },
});
