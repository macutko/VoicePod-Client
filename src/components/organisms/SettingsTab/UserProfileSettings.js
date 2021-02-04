import {Text, Title} from "react-native-paper";
import React from "react";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import GlobalContext from "../../atoms/GlobalState";
import updateAccountAPI from "../../../api/user/updateAccount";
import EditUserDescriptionModal from "../../molecules/SettingsTab/EditUserDescriptionModal";
import EditUserNameModal from "../../molecules/SettingsTab/EditUserNameModal";
import {EditUserProfilePicture} from "../../molecules/SettingsTab/EditUserProfilePicture";

export default class UserProfileSettings extends React.Component {
    static contextType = GlobalContext;

    constructor(props, context) {
        super(props, context);
        this.state = {
            nameModal: false,
            descriptionModal: false,
        }

    }


    submitUpdate = async (data) => {
        updateAccountAPI(data,this.context.globalState.token)
            .then(r => this.context.refreshState(this.context.globalState.token))
            .catch(e => this.context.refreshState(this.context.globalState.token))

        this.setState({
            nameModal: false,
            descriptionModal: false
        })
    }


    render() {
        return (
            <View style={styles.containerStyle}>

                <EditUserProfilePicture submit={this.submitUpdate}/>

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

                <EditUserNameModal visible={this.state.nameModal}
                                   close={() => this.setState({nameModal: false})}
                                   submit={this.submitUpdate}/>


                <EditUserDescriptionModal visible={this.state.descriptionModal}
                                          close={() => this.setState({descriptionModal: false})}
                                          submit={this.submitUpdate}/>
            </View>);
    }
}

const styles = StyleSheet.create({
    nameTag: {
        marginTop: 20,
        fontSize: 30
    },
    handle: {
        fontSize: 15,
        paddingTop: 10,
        fontStyle: 'italic'
    },
    containerStyle: {
        paddingTop: 20,
        alignItems: "center",
        justifyContent: "center"
    }
});
