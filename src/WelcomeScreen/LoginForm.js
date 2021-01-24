import * as React from "react";
import * as layout from "../components/constants/Layout";

import { Button, Modal, Portal, Text, TextInput } from "react-native-paper";
import { StyleSheet, View } from "react-native";

import GlobalContext from "../GlobalState";
import { axiosInstance } from "../components/helpers/connectionInstances";
import { colorScheme } from "../components/constants/Colors";
import { storeData } from "../components/helpers/utils";

export default class LoginForm extends React.Component {
  static contextType = GlobalContext;

  constructor(props, context) {
    super(props, context);
    this.state = {
      isVisible: false,
      isUsernameWrong: false,
      isPasswordWrong: false,
    };
  }

  onChangeText = (text, name) => {
    this.setState({
      [name]: text,
      passwordError: undefined,
    });
  };

  submitForm = () => {
    axiosInstance
      .post("/user/authenticate", {
        username: this.state.username,
        password: this.state.password,
      })
      .then((response) => {
        storeData("token", response.data.token).then();
        this.context.updateGlobalState(
          response.data.user,
          response.data.token,
          true
        );
        // this.props.close();
      })
      .catch((error) => {
        if (error.response == null) {
          console.log(`Error in LoginForm ${error}`);
          return;
        }
        switch (error.response.status) {
          case 401:
            this.setState(
              {
                passwordError: error.response.data.message,
                isUsernameWrong: false,
                isPasswordWrong: true,
              }
            );
            break;
            case 404:
              this.setState(
                {
                  passwordError: error.response.data.message,
                  isUsernameWrong: true,
                  isPasswordWrong: false,
                }
              );
              break;
          default:
            console.log("Havent accounted for this error code");
            break;
        }
      });
  };

  render() {
    return (
      <Portal>
        <Modal
          visible={this.props.visible}
          onDismiss={this.props.close}
          animationType="fade"
          contentContainerStyle={styles.containerStyle}
        >
          <View style={styles.oval}></View>
          <View style={styles.formContainer}>
            <Text>{this.state.isPasswordWrong || this.state.isUsernameWrong 
                    ? this.state.passwordError 
                    : ''}</Text>
            <TextInput
              label="Username"
              mode="flat"
              autoCompleteType={"username"}
              textContentType={"username"}
              onChangeText={(text) => this.onChangeText(text, "username")}
              style={styles.inputStyle}
            />
            <TextInput
              label="Password"
              mode="flat"
              secureTextEntry={true}
              textContentType={"password"}
              autoCompleteType={"password"}
              password={true}
              errorMessage={this.state.passwordError}
              error={this.state.isPasswordWrong}
              onChangeText={(text) => this.onChangeText(text, "password")}
              style={styles.inputStyle}
            />
            <View style={styles.submitContainer}>
              <Button
                mode="text"
                uppercase={false}
                onPress={() => this.submitForm()}
                labelStyle={styles.buttonLabelStyle}
              >
                Log In &gt;&gt;
              </Button>
            </View>
          </View>
        </Modal>
      </Portal>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    top: layout.default.window.height / 7,
    backgroundColor: "transparent",
    position: "relative",
    left: "-50%",
    width: "200%",
    height: layout.default.window.width,
    padding: 0,
    justifyContent: "center",
    alignItems: "center"
  },
  oval: {
    position: "absolute",
    left: layout.default.window.width / 2,
    width: layout.default.window.width,
    height: "100%",
    borderRadius: layout.default.window.width*2,
    transform: [{ scaleX: 2 }],
    backgroundColor: colorScheme.grey
  },
  formContainer: {
    width: "50%",
    justifyContent: "space-around",
    alignItems: "center",
  },
  inputStyle: {
    marginBottom: "5%",
    backgroundColor: "transparent",
    width: "85%",
  },
  submitContainer: {
    width: "85%",
    flexDirection: "row-reverse"
  },
  buttonLabelStyle: {
    fontSize: 20,
  },
  
  errorMessage: {
    color: colorScheme.error,
  },
});
