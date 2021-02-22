import React from "react";
import { StyleSheet, View } from "react-native";
import { colorScheme } from "../../constants/Colors";
import AvatarCustom from "../atoms/AvatarCustom";
import Metrics from "../atoms/Metrics";
import StarRating from "../atoms/StarRating";
import TitleCustom from "../atoms/TitleCustom";

const UserProfileTemplate = (props) => {
  return (
    <View style={styles.containerStyle}>
      <View style={styles.backgroundColor} />
      <View style={styles.avatar}>
        <AvatarCustom size={180} />
      </View>
      <View style={styles.content}>
        <TitleCustom center space>
          {props.firstName} {props.lastName}
        </TitleCustom>
        <StarRating rating={props.rating} />
        <Metrics
          reviews={props.reviews}
          cases={props.cases}
          budget={props.budget}
        />
        {props.children}
      </View>
    </View>
  );
};
export default UserProfileTemplate;

const styles = StyleSheet.create({
  containerStyle: {
    alignItems: "center",
    backgroundColor: colorScheme.background,
  },
  content: {
    paddingHorizontal: 20,
    width: "100%",
    alignItems: "center",
  },
  backgroundColor: {
    backgroundColor: colorScheme.primary,
    height: 160,
    width: "100%",
  },

  avatar: {
    marginTop: -120,
  },
});
