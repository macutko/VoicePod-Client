import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import * as React from "react";
import {Input} from "react-native-elements";
import {axiosInstance} from "../helpers/connectionInstances";
import {storeData} from "../helpers/utils"
import {colorScheme} from "../constants/Colors";
import GlobalContext from "../GlobalState";


export default class LoginForm extends React.Component {
    static contextType = GlobalContext;
    constructor(props,context) {
        super(props,context);
        this.state = {
            isVisible: false,
        };
    }

    onChangeText = (text, name) => {
        this.setState({
            [name]: text,
            passwordError: undefined
        });
    };

    submitForm = () => {

        try {
            axiosInstance
                .post("/user/authenticate", {
                    username: this.state.username,
                    password: this.state.password,
                })
                .then((response) => {
                    this.context.updateGlobalState(response.data.user,response.data.token)
                    storeData("token", response.data.token).then();
                    this.props.close();
                    this.props.navigation.navigate("ChatsAndMessagesWrapper");
                })
                .catch((error) => {
                    if (error.response == null) console.log(`Error in LoginForm ${error}`)
                    else if (error.response.status === 401) {
                        this.setState({
                            passwordError: error.response.data.message
                        }, () => {
                            setTimeout(() => {
                                this.setState({passwordError: undefined})
                            }, 3000)
                        })
                    } else {
                        console.log("Havent accounted for this error code");
                    }
                });
        } catch (TypeError) {
            this.setState({
                passwordError: "There seems to be an issue with the connection. Are you online?"
            }, () => {
                setTimeout(() => {
                    this.setState({passwordError: undefined})
                }, 3000)
            })
            console.log("Internet issue!");
        }
    };

    render() {
        return (
            <View style={{justifyContent: "center", alignItems: "center"}}>
                <Input
                    containerStyle={styles.inputOutterContainer}
                    inputContainerStyle={styles.inputContainer}
                    inputStyle={styles.textInputStyle}
                    placeholder="Username"
                    onChangeText={(text) => this.onChangeText(text, "username")}
                    autoCompleteType={"username"}
                    placeholderTextColor={colorScheme.FormText}
                />
                <Input
                    containerStyle={styles.inputOutterContainer}
                    inputContainerStyle={styles.inputContainer}
                    inputStyle={styles.textInputStyle}
                    placeholder="Password"
                    onChangeText={(text) => this.onChangeText(text, "password")}
                    autoCompleteType={"password"}
                    secureTextEntry={true}
                    textContentType={"password"}
                    placeholderTextColor={colorScheme.FormText}
                    errorMessage={this.state.passwordError}
                    errorStyle={styles.errorMessage}
                    password={true}
                />

                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={() => this.submitForm()}
                >
                    <Text style={styles.buttonText}>Log In</Text>
                </TouchableOpacity>
            </View>
        );
    }
}


const styles = StyleSheet.create({
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
    },
    buttonText: {
        color: colorScheme.welcomeScreenBackgroundButton,
        fontFamily: "DimboRegular",
        fontSize: 45,
    },
    errorMessage: {
        color: colorScheme.error,
    },
});


