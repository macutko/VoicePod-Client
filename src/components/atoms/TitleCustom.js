import React from "react";
import { StyleSheet, Text} from "react-native";
import { Title } from "react-native-paper";

const TitleCustom = (props) => {
  return (
    <Title style={styles.title}>
        {props.children}
    </Title>

  );
};
export default TitleCustom;

const styles = StyleSheet.create({
    title: {
      fontSize: 40,
      lineHeight: 40,
      fontFamily: "Asap-Regular"
    }
});