import {Avatar, Button, Modal, Portal, Text, TextInput, Title} from "react-native-paper";
import React from "react";
import {PermissionsAndroid, StyleSheet, TouchableOpacity, View} from "react-native";
import GlobalContext from "../../GlobalState";
import {launchImageLibrary} from 'react-native-image-picker';
import * as RNFS from "react-native-fs";
import {log} from "react-native-reanimated";
import {axiosInstance} from "../../components/helpers/connectionInstances";

export default class UserProfile extends React.Component {
    static contextType = GlobalContext;

    constructor(props, context) {
        super(props, context);
        this.state = {
            nameModal: false,
            firstNameInput: context.globalState.user.firstName,
            lastNameInput: context.globalState.user.lastName,
            descriptionModal: false,
            descriptionInput: context.globalState.user.description
        }

    }

    requestPermissions = async () => {
        PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.CAMERA,
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ]).then().catch(e => console.log(`Error in UserProfile ${e}`));
    }

    submitUpdate = async (data) => {
        await axiosInstance
            .post("/user/updateAccount", data, {
                headers: {
                    Authorization: `Bearer ${this.context.globalState.token}`
                },
            })
            .then((response) => {
                console.log(`Response form UserProfile ${response.status}`)
            })
            .catch((error) => {
                console.log(`Error in UserProfile ${error}`)
            });
        this.setState({
            nameModal: false,
            descriptionModal: false
        }, () => {
            this.context.refreshState(this.context.globalState.token)
        })
    }

    newImage = async () => {
        if (!await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA)) await this.requestPermissions()
        if (!await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE)) await this.requestPermissions()
        if (!await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE)) await this.requestPermissions()

        launchImageLibrary({}, res => {
            console.log('Response = ', res);

            if (res.error) {
                console.log('ImagePicker Error: ', res.error);
            } else {
                let picType = res.uri.split(".")
                picType = picType[picType.length - 1]
                RNFS.readFile(res.uri, 'base64')
                    .then((data) => {
                        this.submitUpdate({profilePicture: data, pictureType: picType})
                    }).catch(e => log(`Error in UserProfile ${e}`))


            }
        });
    }

    render() {
        return (
            <View style={styles.containerStyle}>
                <TouchableOpacity onPress={this.newImage}>
                    <Avatar.Image size={200}
                                  source={{uri: `data:image/${this.context.globalState.user.pictureType};base64,${this.context.globalState.user.profilePicture}`}}/>
                </TouchableOpacity>
                <Text style={styles.handle}>@{this.context.globalState.user.username}</Text>
                <TouchableOpacity onPress={() => {
                    this.setState({nameModal: true})
                }}>
                    <Title
                        style={styles.nameTag}>{this.context.globalState.user.firstName} {this.context.globalState.user.lastName}</Title>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    this.setState({descriptionModal: true})
                }}>
                    <Text style={styles.description}>{this.context.globalState.user.description}</Text>
                </TouchableOpacity>

                <Portal>
                    <Modal
                        visible={this.state.nameModal}
                        onDismiss={() => this.setState({nameModal: false})}
                        animationType="fade"
                        contentContainerStyle={styles.modalStyle}
                    >
                        <TextInput
                            label="First Name"
                            mode='outlined'
                            textContentType={"givenName"}
                            onChangeText={(text) =>
                                this.setState({firstNameInput: text})
                            }
                            autoCompleteType={"name"}
                            style={styles.inputStyle}
                            value={this.state.firstNameInput}
                        />
                        <TextInput
                            label="Last Name"
                            mode='outlined'
                            textContentType={"familyName"}
                            onChangeText={(text) =>
                                this.setState({lastNameInput: text})
                            }
                            autoCompleteType={"name"}
                            style={styles.inputStyle}
                            value={this.state.lastNameInput}
                        />
                        <Button mode="outlined" onPress={() => this.submitUpdate({
                            firstName: this.state.firstNameInput,
                            lastName: this.state.lastNameInput
                        })} style={styles.buttonStyle}>
                            Update
                        </Button>

                    </Modal>
                </Portal>


                <Portal>
                    <Modal
                        visible={this.state.descriptionModal}
                        onDismiss={() => this.setState({descriptionModal: false})}
                        animationType="fade"
                        contentContainerStyle={styles.modalStyle}
                    >
                        <TextInput
                            multiline={true}
                            label="BIO"
                            mode='outlined'
                            onChangeText={(text) =>
                                this.setState({descriptionInput: text})
                            }
                            autoCompleteType={"off"}
                            style={styles.inputStyle}
                            value={this.state.descriptionInput}
                        />

                        <Button mode="outlined" onPress={() => this.submitUpdate({
                            description: this.state.descriptionInput,
                        })} style={styles.buttonStyle}>
                            Update
                        </Button>

                    </Modal>
                </Portal>
            </View>);
    }
}

const styles = StyleSheet.create({
    modalStyle: {backgroundColor: 'white', padding: 20, marginHorizontal: "5%"},
    buttonStyle: {
        alignItems: "center",
        justifyContent: "center",
    },
    nameTag: {
        marginTop: 20,
        fontSize: 30
    },
    handle: {
        fontSize: 15,
        paddingTop: 10,
        fontStyle: 'italic'
    },
    inputStyle: {
        marginBottom: "5%",
    },
    description: {
        paddingTop: 10,
        fontSize: 20,
        paddingHorizontal: "10%",
        textAlign: 'justify'
    },
    containerStyle: {
        paddingTop: 20,
        alignItems: "center",
        justifyContent: "center"
    }
});
