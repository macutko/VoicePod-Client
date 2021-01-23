import { StyleSheet, View } from "react-native";
import * as React from "react";
import GlobalContext from "../GlobalState";
import { Button, Modal, Portal, TextInput } from "react-native-paper";
import { axiosInstance } from "../components/helpers/connectionInstances";
import { colorScheme } from "../components/constants/Colors";
import { storeData } from "../components/helpers/utils";
import WelcomeScreenLogo from "./components/WelcomeScreenLogo";

export default class LoginForm extends React.Component {
  static contextType = GlobalContext;

  constructor(props, context) {
    super(props, context);
    this.state = {
      isVisible: false,
      passwordErrorBool: false,
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
        if (error.response == null) console.log(`Error in LoginForm ${error}`);
        else if (error.response.status === 401) {
          this.setState(
            {
              passwordError: error.response.data.message,
              passwordErrorBool: true,
            },
            () => {
              setTimeout(() => {
                this.setState({
                  passwordError: undefined,
                  passwordErrorBool: false,
                });
              }, 3000);
            }
          );
        } else {
          console.log("Havent accounted for this error code");
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
          <WelcomeScreenLogo />
          <View style={styles.formOutline}>
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
              error={this.state.passwordErrorBool}
              onChangeText={(text) => this.onChangeText(text, "password")}
              style={styles.inputStyle}
            />
            <Button
              mode="text"
              uppercase={false}
              onPress={() => this.submitForm()}
              style={styles.buttonStyle}
              labelStyle={styles.buttonLabelStyle}
            >
              Log In >>
            </Button>
          </View>
        </Modal>
      </Portal>
    );
  }
}

const styles = StyleSheet.create({
  formOutline: {
    backgroundColor: colorScheme.grey,
    height: "60%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    marginTop: 30,
  },
  inputStyle: {
    marginBottom: "5%",
    backgroundColor: colorScheme.white,
    width: "70%",
  },
  buttonStyle: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  buttonLabelStyle: {
    fontSize: 20,
  },
  containerStyle: {
    backgroundColor: "white",
    padding: 0,
    marginHorizontal: "5%",
  },
  errorMessage: {
    color: colorScheme.error,
  },
});
