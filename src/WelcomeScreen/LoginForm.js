import {StyleSheet} from "react-native";
import * as React from "react";
import {axiosInstance} from "../helpers/connectionInstances";
import {storeData} from "../helpers/utils"
import GlobalContext from "../GlobalState";
import {Button, Modal, Portal, TextInput} from "react-native-paper";
import {colorScheme} from "../constants/Colors";


export default class LoginForm extends React.Component {
    static contextType = GlobalContext;

    constructor(props, context) {
        super(props, context);
        this.state = {
            isVisible: false,
            passwordErrorBool: false
        };
    }

    onChangeText = (text, name) => {
        this.setState({
            [name]: text,
            passwordError: undefined
        });
    };

    submitForm = () => {

        axiosInstance
            .post("/user/authenticate", {
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
                if (error.response == null) console.log(`Error in LoginForm ${error}`)
                else if (error.response.status === 401) {
                    this.setState({
                        passwordError: error.response.data.message,
                        passwordErrorBool: true
                    }, () => {
                        setTimeout(() => {
                            this.setState({passwordError: undefined, passwordErrorBool: false})
                        }, 3000)
                    })
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
                    <TextInput
                        label="Username"
                        mode='outlined'
                        autoCompleteType={"username"}
                        textContentType={"username"}
                        onChangeText={(text) => this.onChangeText(text, "username")}
                        style={styles.inputStyle}
                    />
                    <TextInput
                        label="Password"
                        mode='outlined'
                        secureTextEntry={true}
                        textContentType={"password"}
                        autoCompleteType={"password"}
                        password={true}
                        errorMessage={this.state.passwordError}
                        error={this.state.passwordErrorBool}
                        onChangeText={(text) => this.onChangeText(text, "password")}
                        style={styles.inputStyle}
                    />
                    <Button mode="outlined" onPress={() => this.submitForm()} style={styles.buttonStyle}>
                        Log In
                    </Button>

                </Modal>
            </Portal>
        );
    }
}


const styles = StyleSheet.create({
    inputStyle: {
        marginBottom: "5%",
    },
    buttonStyle: {
        alignItems: "center",
        justifyContent: "center",
    },
    containerStyle: {backgroundColor: 'white', padding: 20, marginHorizontal: "5%"},
    errorMessage: {
        color: colorScheme.error,
    },
});


