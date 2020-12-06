import {Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import * as React from "react";
import {colorScheme} from "../constants/Colors";

export class FormOverlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {children} = this.props;

    return <Modal
      visible={this.props.visible}
      transparent={true}
      animationType="fade"
    >
      <View style={styles.modalDim}>
        <View style={styles.modalView}>
          <View style={{ flexDirection: "row-reverse" }}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={this.props.close}
            >
              <Text style={styles.closeIcon}>X</Text>
            </TouchableOpacity>
          </View>
          {React.cloneElement(children, {...this.props})}
        </View>
      </View>
    </Modal>;
  }
}

const styles = StyleSheet.create({
  closeButton: {
    width: 50,
  },
  closeIcon: {
    color: colorScheme.modalBorderColor,
    fontSize: 45,
    fontFamily: "SuperMario256",
  },
  modalDim: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
  },
  modalView: {
    paddingTop: 20,
    flexDirection: "column",
    margin: 20,
    backgroundColor: colorScheme.modalBG,
    borderRadius: 20,
    borderColor: colorScheme.modalBorderColor,
    borderWidth: 5,
    paddingLeft: 10,
    paddingRight: 10,
    elevation: 10,
  },
});
