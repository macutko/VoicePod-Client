import {StyleSheet} from "react-native";
import * as React from "react";
import GLOBAL_VAR from "../components/constants/Global";
import GlobalContext from "../GlobalState";
import {Button, Modal, Portal, TextInput} from "react-native-paper";
import {CustomFieldValidator} from "../components/helpers/validator/CustomFieldValidator";
import {CustomExistenceValidator} from "../components/helpers/validator/CustomExistenceValidator";
import {axiosInstance} from "../components/helpers/connectionInstances";
import {storeData} from "../components/helpers/utils";
import {colorScheme} from "../components/constants/Colors";


export class SignUpForm extends React.Component {
    static contextType = GlobalContext;

    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

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
                    validation_obj = {...validation_obj, ...existence_obj};
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
                this.context.updateGlobalState(response.data.user, response.data.token, true)
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
                    <TextInput
                        label="Email"
                        mode='outlined'
                        autoCompleteType={"email"}
                        textContentType={"emailAddress"}
                        onChangeText={(text) =>
                            this.setState({[GLOBAL_VAR.FIELD_NAME.EMAIL]: text})
                        }
                        onEndEditing={(e) =>
                            this.onEndEditing(GLOBAL_VAR.FIELD_NAME.EMAIL, e)
                        }
                        errorMessage={this.state.emailError}
                        style={styles.inputStyle}
                    />
                    <TextInput
                        label="First Name"
                        mode='outlined'
                        textContentType={"givenName"}
                        onChangeText={(text) =>
                            this.setState({[GLOBAL_VAR.FIELD_NAME.FIRSTNAME]: text})
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
                        mode='outlined'
                        textContentType={"familyName"}
                        onChangeText={(text) =>
                            this.setState({[GLOBAL_VAR.FIELD_NAME.LASTNAME]: text})
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
                        mode='outlined'
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
                        mode='outlined'
                        onChangeText={(text) =>
                            this.setState({[GLOBAL_VAR.FIELD_NAME.PASSWORD]: text})
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


                    <Button mode="outlined" onPress={() => this.submitForm()} style={styles.buttonStyle}>
                        Sign Up
                    </Button>
                </Modal>
            </Portal>
        );
    }
}

const styles = StyleSheet.create({
    errorMessage: {
        color: colorScheme.error,
    },
    inputStyle: {
        marginBottom: "5%",
    },
    buttonStyle: {
        alignItems: "center",
        justifyContent: "center",
    },
    containerStyle: {backgroundColor: 'white', padding: 20, marginHorizontal: "5%"}
});
