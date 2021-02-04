import * as React from "react";
import {ScrollView, StyleSheet, View} from "react-native";
import {Button, Checkbox, Dialog, HelperText, Modal, Portal, Text, TextInput,} from "react-native-paper";
import {colorScheme} from "../../../constants/Colors";
import GLOBAL_VAR from "../../../constants/Global";
import * as layout from "../../../constants/Layout";
import {CustomExistenceValidator} from "../../../utilities/validators/CustomExistenceValidator";
import {CustomFieldValidator} from "../../../utilities/validators/CustomFieldValidator";
import GlobalContext from "../../atoms/GlobalState";
import {TermsAndConditions} from "../../molecules/WelcomeScreen/TermsAndConditions";
import createAPI from "../../../api/user/create";

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
                    validation_obj = {...validation_obj, ...existence_obj};
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
        let user = {...this.state.user};
        user[property] = value;
        this.setState({user});
    };

    submitForm = () => {
        // check if form is valid, return if not
        if (!this.isFormValid()) {
            return;
        }
        // send request if valid
        createAPI(this.state.user.firstname, this.state.user.lastname, this.state.user.email, this.state.user.username, this.state.user.password)
            .then(([user, token]) => {
                this.context.updateGlobalState(
                    user,
                    token,
                    true
                );
            }).catch(e => console.log(`Error in SingUp ${e}`))
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
                    <View style={styles.oval}/>
                    <View style={styles.formContainer}>
                        <TextInput
                            label="Email"
                            mode="text"
                            autoCompleteType={"email"}
                            textContentType={"emailAddress"}
                            onChangeText={(text) =>
                                this.onChangeText(GLOBAL_VAR.FIELD_NAME.EMAIL, text)
                            }
                            onEndEditing={(e) =>
                                this.onEndEditing(GLOBAL_VAR.FIELD_NAME.EMAIL, e)
                            }
                            style={styles.inputStyle}
                            error={this.state.emailError}
                        />
                        <HelperText type="error" visible={this.state.emailError}>
                            {this.state.emailError}
                        </HelperText>

                        <TextInput
                            label="First Name"
                            mode="text"
                            textContentType={"givenName"}
                            onChangeText={(text) =>
                                this.onChangeText(GLOBAL_VAR.FIELD_NAME.FIRSTNAME, text)
                            }
                            autoCompleteType={"name"}
                            onEndEditing={(e) =>
                                this.onEndEditing(GLOBAL_VAR.FIELD_NAME.FIRSTNAME, e)
                            }
                            style={styles.inputStyle}
                            error={this.state.firstnameError}
                        />
                        <HelperText type="error" visible={this.state.firstnameError}>
                            {this.state.firstnameError}
                        </HelperText>

                        <TextInput
                            label="Last Name"
                            mode="text"
                            textContentType={"familyName"}
                            onChangeText={(text) =>
                                this.onChangeText(GLOBAL_VAR.FIELD_NAME.LASTNAME, text)
                            }
                            autoCompleteType={"name"}
                            onEndEditing={(e) =>
                                this.onEndEditing(GLOBAL_VAR.FIELD_NAME.LASTNAME, e)
                            }
                            style={styles.inputStyle}
                            error={this.state.lastnameError}
                        />
                        <HelperText type="error" visible={this.state.lastnameError}>
                            {this.state.lastnameError}
                        </HelperText>

                        <TextInput
                            label="Username"
                            mode="text"
                            onChangeText={(text) =>
                                this.onChangeText(GLOBAL_VAR.FIELD_NAME.USERNAME, text)
                            }
                            autoCompleteType={"username"}
                            textContentType={"username"}
                            onEndEditing={(e) =>
                                this.onEndEditing(GLOBAL_VAR.FIELD_NAME.USERNAME, e)
                            }
                            style={styles.inputStyle}
                            error={this.state.usernameError}
                        />
                        <HelperText type="error" visible={this.state.usernameError}>
                            {this.state.usernameError}
                        </HelperText>

                        <TextInput
                            label="Password"
                            mode="text"
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
                            style={styles.inputStyle}
                            error={this.state.passwordError}
                        />
                        <HelperText type="error" visible={this.state.passwordError}>
                            {this.state.passwordError}
                        </HelperText>

                        <View style={styles.licenseContainer}>
                            <Checkbox
                                status={this.state.agreedLicense ? "checked" : "unchecked"}
                                onPress={() => this.toggleLicenseAgreement()}
                                color={colorScheme.secondary}
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
                                    <ScrollView
                                        contentContainerStyle={
                                            styles.licenseDialogScrollViewContainer
                                        }
                                    >
                                        <TermsAndConditions/>
                                        <Button onPress={() => this.toggleLicenseDialog()}>
                                            OK
                                        </Button>
                                    </ScrollView>
                                </Dialog.ScrollArea>
                            </Dialog>
                        </Portal>

                        <View style={styles.submitContainer}>
                            <Button
                                mode="text"
                                uppercase={false}
                                onPress={() => {
                                    this.submitForm();
                                }}
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
        // top: layout.default.window.height / 35, // suggestion
        position: "relative",
        left: "-50%",
        width: "200%",
        height: layout.default.window.width * 1.3,
        // height: layout.default.window.width * 1.5, // suggestion
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
        transform: [{scaleX: 2}],
        backgroundColor: colorScheme.grey,
    },
    formContainer: {
        width: "50%",
        justifyContent: "space-around",
        alignItems: "center",
    },
    inputStyle: {
        // there is more space from HelperText component
        marginTop: "-3%",
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
    },
});
