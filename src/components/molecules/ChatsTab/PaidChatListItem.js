import React, {useContext, useEffect, useRef, useState} from "react"
import {StyleSheet} from "react-native";
import {Avatar, Divider, List} from "react-native-paper";
import {getOtherPartyDetailsByChatIdAPI} from "../../../api/chat/getOtherPartyDetailsByChatIdAPI";
import {SocketContext} from "../../atoms/SocketContext";
import Ionicons from "react-native-vector-icons/Ionicons";
import {colorScheme} from "../../../constants/Colors";

const PaidChatListItem = ({mainNav, data}) => {
    const _isMounted = useRef(true);
    const context = useContext(SocketContext);
    const [user, setUser] = useState(null)

    useEffect(() => {
        getOtherPartyDetailsByChatIdAPI(context.socket, {chatId: data.id}).then(res => {
            if (_isMounted) setUser(res)
            console.log(`Paid chat list item keys ${Object.keys(res)}`)
        }).catch(e => console.log(e))
        return () => {
            _isMounted.current = false;
        }
    }, []);

    return (user !== null ?
            <>

                <List.Item
                    titleStyle={!user.customer ? styles.profileTitle_consultant : styles.profileTitle_noob}
                    style={!user.customer ? styles.container_consultant : styles.container_noob}
                    description={!user.customer ? 'Advisor' : 'Client'}
                    descriptionStyle={!user.customer ? styles.profileDesc_consultant : styles.profileDesc_noob}
                    onPress={() => mainNav.push('ChatScreen', {
                        chatId: data.id
                    })}
                    title={user.firstName + ' ' + user.lastName}
                    right={props => <List.Icon {...props}
                                               icon={props => <Ionicons {...props}
                                                                        style={!user.customer ? {color: colorScheme.background} : {color: colorScheme.neutral}}
                                                                        name={!user.customer ? 'book' : 'cash'}/>}/>}
                    left={props => <List.Icon {...props}
                                              style={styles.profilePic_noob}
                                              icon={props => <Avatar.Image source={{
                                                  uri: `data:image/${user.pictureType};base64,${user.profilePicture}`
                                              }}/>}/>}
                />

                <Divider style={styles.divider}/>
            </> : null
    )

}
export default PaidChatListItem;


const styles = StyleSheet.create({
    //TODO: rename this more appropriatelly
    divider: {
        height: 1
    },
    container_consultant: {
        paddingVertical: 15
    },
    profileTitle_consultant: {
        paddingLeft: 10,
        fontWeight: "bold",
    },
    profileDesc_consultant: {
        paddingLeft: 10,
    },
    profilePic_consultant: {
        paddingLeft: 5,
        alignItems: "center",
        justifyContent: "center",
    },

    container_noob: {},
    profileTitle_noob: {
        paddingLeft: 10,
        fontWeight: "bold",
    },
    profileDesc_noob: {
        paddingLeft: 10,
    },
    profilePic_noob: {
        paddingLeft: 5,
        alignItems: "center",
        justifyContent: "center",
    }

});

