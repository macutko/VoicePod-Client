import React from "react";
import { StyleSheet } from "react-native";
import { Avatar } from "react-native-paper";

const AvatarCustom = (props) => {
  return (
    <Avatar.Image
      style={styles.avatar}
      size={props.size}
      source={
        props.profilePicture
          ? {
              uri: `data:image/${props.pictureType};base64,${props.profilePicture}`,
            }
          : require("../../assets/images/avatar.png")
      }
    />
  );
};

export default AvatarCustom;

const styles = StyleSheet.create({
  avatar: {},
});
