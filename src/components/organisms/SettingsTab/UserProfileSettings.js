import {Text, Title} from "react-native-paper";
import React, {useContext, useEffect, useRef, useState} from "react";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import GlobalContext from "../../atoms/GlobalState";
import updateUserAPI from "../../../api/user/updateUserAPI";
import EditUserDescriptionModal from "../../molecules/SettingsTab/EditUserDescriptionModal";
import EditUserNameModal from "../../molecules/SettingsTab/EditUserNameModal";
import {EditUserProfilePicture} from "../../molecules/SettingsTab/EditUserProfilePicture";

export const UserProfileSettings = (props) => {
    const context = useContext(GlobalContext)
    const [nameModal, setNameModal] = useState(false)
    const [descriptionModal, setDescriptionModal] = useState(false)
    const _isMounted = useRef(true);


    useEffect(() => {
        return () => {
            _isMounted.current = false;
        }
    }, []);

    const submitUpdate = async (data) => {
        updateUserAPI(data, context.globalState.token)
            .then(r => context.refreshState(context.globalState.token))
            .catch(e => context.refreshState(context.globalState.token))

        if (_isMounted) {
            setDescriptionModal(false)
            setNameModal(false)
        }
    }


    return (
        <View style={styles.containerStyle}>

            <EditUserProfilePicture submit={submitUpdate}/>

            <Text style={styles.handle}>@{context.globalState.user.username}</Text>
            <TouchableOpacity onPress={() => {
                if (_isMounted) setNameModal(true)
            }}>
                <Title
                    style={styles.nameTag}>{context.globalState.user.firstName} {context.globalState.user.lastName}</Title>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
                this.setState({descriptionModal: true})
            }}>
                <Text style={styles.description}>{context.globalState.user.description}</Text>
            </TouchableOpacity>

            <EditUserNameModal visible={nameModal}
                               close={() => _isMounted ? setNameModal(false) : null}
                               submit={submitUpdate}/>


            <EditUserDescriptionModal visible={descriptionModal}
                                      close={() => _isMounted ? setDescriptionModal(false) : null}
                                      submit={submitUpdate}/>
        </View>);

}
export default UserProfileSettings

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
