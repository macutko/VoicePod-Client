import * as React from "react";
import * as layout from "../components/constants/Layout";

import {
  Button,
  Modal,
  Dialog,
  Portal,
  TextInput,
  Checkbox,
  Text,
} from "react-native-paper";
import { StyleSheet, View, ScrollView } from "react-native";

import { CustomExistenceValidator } from "../components/helpers/validator/CustomExistenceValidator";
import { CustomFieldValidator } from "../components/helpers/validator/CustomFieldValidator";
import GLOBAL_VAR from "../components/constants/Global";
import GlobalContext from "../GlobalState";
import { axiosInstance } from "../components/helpers/connectionInstances";
import { colorScheme } from "../components/constants/Colors";
import { storeData } from "../components/helpers/utils";
import { TermsAndConditions } from "./TermsAndConditions";

export default class SignUpForm extends React.Component {
  static contextType = GlobalContext;

  constructor(props, context) {
    super(props, context);
    this.state = {
      agreedLicense: false,
      licenseDialogVisible: false,
    };
  }

  toggleLicenseAgreement = () => {
    this.setState((prevState) => ({
      agreedLicense: !prevState.agreedLicense,
    }));
  };

  toggleLicenseDialog = () => {
    this.setState((prevState) => ({
      licenseDialogVisible: !prevState.licenseDialogVisible,
    }));
  };

  onEndEditingAfter = (validation_obj) => {
    this.setState(validation_obj);
  };

  onEndEditing = (field_name, event) => {
    const text = event.nativeEvent.text;
    let validation_obj = CustomFieldValidator.validate(field_name, text);
    if (
      validation_obj.isValid &&
      (field_name === GLOBAL_VAR.FIELD_NAME.USERNAME ||
        field_name === GLOBAL_VAR.FIELD_NAME.EMAIL)
    ) {
      CustomExistenceValidator.validate(field_name, text)
        .then((existence_obj) => {
          validation_obj = { ...validation_obj, ...existence_obj };
          this.onEndEditingAfter(validation_obj);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      this.onEndEditingAfter(validation_obj);
    }
  };

  submitForm = () => {
    axiosInstance
      .post("/user/create", {
        firstName: this.state.firstname,
        lastName: this.state.lastname,
        email: this.state.email,
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
        console.log(`Error in Signup Form ${error}`);
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
            <TextInput
              label="Email"
              mode="text"
              autoCompleteType={"email"}
              textContentType={"emailAddress"}
              onChangeText={(text) =>
                this.setState({ [GLOBAL_VAR.FIELD_NAME.EMAIL]: text })
              }
              onEndEditing={(e) =>
                this.onEndEditing(GLOBAL_VAR.FIELD_NAME.EMAIL, e)
              }
              errorMessage={this.state.emailError}
              style={styles.inputStyle}
            />
            <TextInput
              label="First Name"
              mode="text"
              textContentType={"givenName"}
              onChangeText={(text) =>
                this.setState({ [GLOBAL_VAR.FIELD_NAME.FIRSTNAME]: text })
              }
              autoCompleteType={"name"}
              onEndEditing={(e) =>
                this.onEndEditing(GLOBAL_VAR.FIELD_NAME.FIRSTNAME, e)
              }
              errorMessage={this.state.firstnameError}
              style={styles.inputStyle}
            />

            <TextInput
              label="Last Name"
              mode="text"
              textContentType={"familyName"}
              onChangeText={(text) =>
                this.setState({ [GLOBAL_VAR.FIELD_NAME.LASTNAME]: text })
              }
              autoCompleteType={"name"}
              onEndEditing={(e) =>
                this.onEndEditing(GLOBAL_VAR.FIELD_NAME.LASTNAME, e)
              }
              errorMessage={this.state.firstnameError}
              style={styles.inputStyle}
            />

            <TextInput
              label="Username"
              mode="text"
              onChangeText={(text) =>
                this.setState({
                  [GLOBAL_VAR.FIELD_NAME.USERNAME]: text.toLowerCase(),
                })
              }
              autoCompleteType={"username"}
              textContentType={"username"}
              onEndEditing={(e) =>
                this.onEndEditing(GLOBAL_VAR.FIELD_NAME.USERNAME, e)
              }
              errorMessage={this.state.usernameError}
              style={styles.inputStyle}
            />
            <TextInput
              label="Password"
              mode="text"
              onChangeText={(text) =>
                this.setState({ [GLOBAL_VAR.FIELD_NAME.PASSWORD]: text })
              }
              autoCompleteType={"password"}
              secureTextEntry={true}
              textContentType={"newPassword"}
              password={true}
              onEndEditing={(e) =>
                this.onEndEditing(GLOBAL_VAR.FIELD_NAME.PASSWORD, e)
              }
              errorMessage={this.state.passwordError}
              style={styles.inputStyle}
            />

            <View style={styles.licenseContainer}>
              <Checkbox
                status={this.state.agreedLicense ? "checked" : "unchecked"}
                onPress={() => this.toggleLicenseAgreement()}
                color={colorScheme.secondary}
                style={styles.licenseCheckbox}
              />
              <Text>I accept the </Text>
              <Text
                style={styles.licenseAnchor}
                onPress={() => this.toggleLicenseDialog()}
              >
                Terms and Conditions
              </Text>
            </View>

            {/* License Dialog - not sure where to put it */}
            <Portal>
              <Dialog
                visible={this.state.licenseDialogVisible}
                onDismiss={() => this.toggleLicenseDialog()}
                style={styles.licenseDialog}
              >
                <Dialog.ScrollArea>
                  <ScrollView contentContainerStyle={styles.licenseDialogScrollViewContainer}>
                    <TermsAndConditions />
                  </ScrollView>
                </Dialog.ScrollArea>
              </Dialog>
            </Portal>

            <View style={styles.submitContainer}>
              <Button
                mode="text"
                uppercase={false}
                onPress={() => this.submitForm()}
              >
                Sign Up &gt;&gt;
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
    top: layout.default.window.height / 30, // suggestion
    position: "relative",
    left: "-50%",
    width: "200%",
    height: layout.default.window.width * 1.3,
    height: layout.default.window.width * 1.5, // suggestion
    padding: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  oval: {
    position: "absolute",
    left: layout.default.window.width / 2,
    width: layout.default.window.width,
    height: "100%",
    borderRadius: layout.default.window.width * 2,
    transform: [{ scaleX: 2 }],
    backgroundColor: colorScheme.grey,
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
    flexDirection: "row-reverse",
  },
  buttonLabelStyle: {
    fontSize: 20,
  },
  errorMessage: {
    color: colorScheme.error,
  },
  licenseContainer: {
    flexDirection: "row",
    width: "90%",
    alignItems: "center",
  },
  licenseAnchor: {
    color: colorScheme.secondary,
  },
  licenseCheckbox: {
    marginBottom: 10,
  },
  licenseDialogScrollViewContainer: {
    padding: 10,
  }
});
