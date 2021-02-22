import * as React from "react";
import { StyleSheet, View } from "react-native";
import {
  Checkbox,



  Text
} from "react-native-paper";
import createUserAPI from "../../../api/user/createUserAPI";
import { colorScheme } from "../../../constants/Colors";
import GLOBAL_VAR from "../../../constants/Global";
import { CustomExistenceValidator } from "../../../utilities/validators/CustomExistenceValidator";
import { CustomFieldValidator } from "../../../utilities/validators/CustomFieldValidator";
import ButtonCustom from "../../atoms/ButtomCustom";
import GlobalContext from "../../atoms/GlobalState";
import TextInputCustom from "../../atoms/TextInputCustom";
import LicenseDialog from "../../molecules/AuthScreen/LicenseDialog";

export default class SignUpForm extends React.Component {
  static contextType = GlobalContext;

  constructor(props, context) {
    super(props, context);
    this.state = {
      user: {
        firstname: "",
        lastname: "",
        email: "",
        username: "",
        password: "",
      },
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

  isFormValid = () => {
    let valid = true;
    // validate each field
    Object.values(GLOBAL_VAR.FIELD_NAME).forEach((field_name) => {
      const validation_obj = this.validateField(
        field_name,
        this.state.user[field_name]
      );
      if (!validation_obj.isValid) {
        valid = false;
      }
    });

    // check the license agreement
    if (!this.state.agreedLicense) {
      this.setState({
        licenseError: true,
      });
      valid = false;
    } else {
      this.setState({
        licenseError: false,
      });
    }
    return valid;
  };

  validateField(field_name, text) {
    let validation_obj = CustomFieldValidator(field_name, text);
    if (
      validation_obj.isValid &&
      (field_name === GLOBAL_VAR.FIELD_NAME.USERNAME ||
        field_name === GLOBAL_VAR.FIELD_NAME.EMAIL)
    ) {
      CustomExistenceValidator(field_name, text)
        .then((existence_obj) => {
          validation_obj = { ...validation_obj, ...existence_obj };
          this.setState(validation_obj);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      this.setState(validation_obj);
    }
    return validation_obj;
  }

  onEndEditing = (field_name, event) => {
    const text = event.nativeEvent.text;
    const validation_obj = this.validateField(field_name, text);
    this.setState(validation_obj);
  };

  onChangeText = (property, value) => {
    let user = { ...this.state.user };
    user[property] = value;
    this.setState({ user });
  };

  submitForm = () => {
    // check if form is valid, return if not
    if (!this.isFormValid()) {
      return;
    }
    // send request if valid
    createUserAPI(
      this.state.user.firstname,
      this.state.user.lastname,
      this.state.user.email,
      this.state.user.username,
      this.state.user.password
    )
      .then(([user, token]) => {
        this.context.updateGlobalState(user, token, true);
      })
      .catch((e) => console.log(`Error in SingUp ${e}`));
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInputCustom
          label="Email"
          autoCompleteType={"email"}
          textContentType={"emailAddress"}
          onChangeText={(text) =>
            this.onChangeText(GLOBAL_VAR.FIELD_NAME.EMAIL, text)
          }
          onEndEditing={(e) =>
            this.onEndEditing(GLOBAL_VAR.FIELD_NAME.EMAIL, e)
          }
          error={this.state.emailError}
          errorMessage={this.state.emailError}
        />

        <TextInputCustom
          label="First Name"
          textContentType={"givenName"}
          onChangeText={(text) =>
            this.onChangeText(GLOBAL_VAR.FIELD_NAME.FIRSTNAME, text)
          }
          autoCompleteType={"name"}
          onEndEditing={(e) =>
            this.onEndEditing(GLOBAL_VAR.FIELD_NAME.FIRSTNAME, e)
          }
          error={this.state.firstnameError}
          errorMessage={this.state.firstnameError}
        />

        <TextInputCustom
          label="Last Name"
          textContentType={"familyName"}
          onChangeText={(text) =>
            this.onChangeText(GLOBAL_VAR.FIELD_NAME.LASTNAME, text)
          }
          autoCompleteType={"name"}
          onEndEditing={(e) =>
            this.onEndEditing(GLOBAL_VAR.FIELD_NAME.LASTNAME, e)
          }
          error={this.state.lastnameError}
          errorMessage={this.state.lastnameError}
        />

        <TextInputCustom
          label="Username"
          onChangeText={(text) =>
            this.onChangeText(GLOBAL_VAR.FIELD_NAME.USERNAME, text)
          }
          autoCompleteType={"username"}
          textContentType={"username"}
          onEndEditing={(e) =>
            this.onEndEditing(GLOBAL_VAR.FIELD_NAME.USERNAME, e)
          }
          error={this.state.usernameError}
          errorMessage={this.state.usernameError}
        />

        <TextInputCustom
          label="Password"
          onChangeText={(text) =>
            this.onChangeText(GLOBAL_VAR.FIELD_NAME.PASSWORD, text)
          }
          autoCompleteType={"password"}
          secureTextEntry={true}
          textContentType={"newPassword"}
          password={true}
          onEndEditing={(e) =>
            this.onEndEditing(GLOBAL_VAR.FIELD_NAME.PASSWORD, e)
          }
          error={this.state.passwordError}
          errorMessage={this.state.passwordError}
        />

        <View style={styles.licenseWrapper}>
          <Checkbox
            status={this.state.agreedLicense ? "checked" : "unchecked"}
            onPress={() => this.toggleLicenseAgreement()}
            color={colorScheme.accent}
            style={styles.licenseCheckbox}
          />

          <Text style={this.state.licenseError && styles.errorMessage}>
            I accept the
          </Text>

          <Text
            style={
              this.state.licenseError
                ? styles.errorMessage
                : styles.licenseAnchor
            }
            onPress={() => this.toggleLicenseDialog()}
          >
            {" Terms and Conditions"}
          </Text>
        </View>

        <LicenseDialog
          toggleLicenseDialog={this.toggleLicenseDialog}
          visible={this.state.licenseDialogVisible}
        />

        <ButtonCustom onPress={() => this.submitForm()} spaced>
          Continue
        </ButtonCustom>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  licenseWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  errorMessage: {
    color: colorScheme.error,
  },
  licenseAnchor: {
    fontWeight: "bold",
    color: colorScheme.accent,
  },
});
