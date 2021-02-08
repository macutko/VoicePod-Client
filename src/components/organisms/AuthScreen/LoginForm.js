import * as React from "react";
import * as layout from "../../../constants/Layout";

import {Button, HelperText, Modal, Portal, TextInput,} from "react-native-paper";
import {StyleSheet, View} from "react-native";

import GlobalContext from "../../atoms/GlobalState";
import {colorScheme} from "../../../constants/Colors";
import authenticateAPI from "../../../api/user/authenticate";

export default class LoginForm extends React.Component {
    static contextType = GlobalContext;

    constructor(props, context) {
        super(props, context);
        this._isMounted = false;
        this.state = {
            isVisible: false,
            isUsernameWrong: false,
            isPasswordWrong: false,
        };
    }

    componentDidMount() {
        this._isMounted = true
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    onChangeText = (text, name) => {
        this.setState({
            [name]: text,
            passwordError: undefined,
        });
    };

    submitForm = () => {
        authenticateAPI(this.state.username, this.state.password).then(([user, token]) => {
            this.context.updateGlobalState(
                user,
                token,
                true
            );
        }).catch(e => {
            if (this._isMounted) {
                this.setState({...e})
            }
        })
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
                            label="Username"
                            mode="flat"
                            autoCompleteType={"username"}
                            textContentType={"username"}
                            onChangeText={(text) => this.onChangeText(text, "username")}
                            style={styles.inputStyle}
                            error={this.state.isUsernameWrong}
                        />
                        <HelperText
                            style={styles.errorMessage}
                            type="error"
                            visible={this.state.isUsernameWrong}
                        >
                            {this.state.passwordError}
                        </HelperText>

                        <TextInput
                            label="Password"
                            mode="flat"
                            secureTextEntry={true}
                            textContentType={"password"}
                            autoCompleteType={"password"}
                            password={true}
                            error={this.state.isPasswordWrong}
                            onChangeText={(text) => this.onChangeText(text, "password")}
                            style={styles.inputStyle}
                        />
                        <HelperText
                            style={styles.errorMessage}
                            type="error"
                            visible={this.state.isPasswordWrong}
                        >
                            {this.state.passwordError}
                        </HelperText>

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
        // color: colorScheme.error,
    },
});
