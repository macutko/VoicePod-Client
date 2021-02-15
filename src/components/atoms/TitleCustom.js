import React from "react";
import { StyleSheet} from "react-native";
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
      fontSize: 30,
      // color: "red"
    }
});