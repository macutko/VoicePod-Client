import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import * as React from "react";
import {Input} from "react-native-elements";
import {axiosInstance} from "../helpers/connectionInstances";
import {storeData} from "../helpers/utils"
import GLOBAL_VAR from "../constants/Global";
import {CustomFieldValidator} from "../helpers/validator/CustomFieldValidator";
import {CustomExistenceValidator} from "../helpers/validator/CustomExistenceValidator";
import {colorScheme} from "../constants/Colors";
import GlobalContext from "../GlobalState";


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
                this.context.updateGlobalState(response.data.user, response.data.token)
                storeData("token", response.data.token).then();
                this.props.close();
                this.props.navigation.navigate("ChatsAndMessagesWrapper");
            })
            .catch((error) => {
                console.log(`Error in Signup Form ${error}`);
            });
    };

    render() {
        return (
            <View style={{justifyContent: "center", alignItems: "center"}}>
                <Input
                    containerStyle={styles.inputOutterContainer}
                    inputContainerStyle={styles.inputContainer}
                    inputStyle={styles.textInputStyle}
                    placeholder="Email"
                    onChangeText={(text) =>
                        this.setState({[GLOBAL_VAR.FIELD_NAME.EMAIL]: text})
                    }
                    autoCompleteType={"email"}
                    onEndEditing={(e) =>
                        this.onEndEditing(GLOBAL_VAR.FIELD_NAME.EMAIL, e)
                    }
                    errorMessage={this.state.emailError}
                    errorStyle={styles.errorMessage}
                    placeholderTextColor={colorScheme.FormText}
                />
                <Input
                    containerStyle={styles.inputOutterContainer}
                    inputContainerStyle={styles.inputContainer}
                    inputStyle={styles.textInputStyle}
                    placeholder="First Name"
                    onChangeText={(text) =>
                        this.setState({[GLOBAL_VAR.FIELD_NAME.FIRSTNAME]: text})
                    }
                    autoCompleteType={"name"}
                    onEndEditing={(e) =>
                        this.onEndEditing(GLOBAL_VAR.FIELD_NAME.FIRSTNAME, e)
                    }
                    errorMessage={this.state.firstnameError}
                    errorStyle={styles.errorMessage}
                    placeholderTextColor={colorScheme.FormText}
                />
                <Input
                    containerStyle={styles.inputOutterContainer}
                    inputContainerStyle={styles.inputContainer}
                    inputStyle={styles.textInputStyle}
                    placeholder="Last Name"
                    onChangeText={(text) =>
                        this.setState({[GLOBAL_VAR.FIELD_NAME.LASTNAME]: text})
                    }
                    autoCompleteType={"name"}
                    onEndEditing={(e) =>
                        this.onEndEditing(GLOBAL_VAR.FIELD_NAME.LASTNAME, e)
                    }
                    errorMessage={this.state.lastnameError}
                    errorStyle={styles.errorMessage}
                    placeholderTextColor={colorScheme.FormText}
                />
                <Input
                    containerStyle={styles.inputOutterContainer}
                    inputContainerStyle={styles.inputContainer}
                    inputStyle={styles.textInputStyle}
                    placeholder="Username"
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
                    errorStyle={styles.errorMessage}
                    placeholderTextColor={colorScheme.FormText}
                />
                <Input
                    containerStyle={styles.inputOutterContainer}
                    inputContainerStyle={styles.inputContainer}
                    inputStyle={[styles.textInputStyle]}
                    placeholder="Password"
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
                    errorStyle={styles.errorMessage}
                    placeholderTextColor={colorScheme.FormText}
                />

                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={() => this.submitForm()}
                >
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    errorMessage: {
        color: colorScheme.error,
    },
    inputOutterContainer: {
        marginBottom: 10,
        marginTop: 10,
    },
    inputContainer: {
        width: "100%",
        borderColor: colorScheme.FormText,
    },
    textInputStyle: {
        fontSize: 25,
        fontFamily: "DimboRegular",
        color: colorScheme.FormText,
    },
    buttonContainer: {
        alignItems: "center",
        justifyContent: "center",
        width: "75%",
        marginBottom: "7%",
        marginTop: "7%",
        height: 70,
        borderRadius: 50,
        borderColor: colorScheme.welcomeScreenBackgroundButton,
        backgroundColor: colorScheme.welcomeScreenText,
        borderWidth: 5,
        elevation: 10,
    },
    buttonText: {
        color: colorScheme.welcomeScreenBackgroundButton,
        fontFamily: "DimboRegular",
        fontSize: 45,
    },
});
