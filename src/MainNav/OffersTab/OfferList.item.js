import React from "react"
import {StyleSheet} from "react-native";
import {Avatar, Divider, List} from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import {colorScheme} from "../../components/constants/Colors";

export default class OfferListItem extends React.Component {
    constructor(props) {
        super(props);
        if (this.props.data.customer) {
            this.state = {
                user: {...this.props.data.customer, consultant: false}
            }
        } else {
            this.state = {
                user: {...this.props.data.consultant, consultant: true}
            }
        }
    }

    render() {
        return (
            <>
                <List.Item
                    titleStyle={styles.profileTitle_consultant}
                    style={styles.container_consultant}
                    descriptionStyle={styles.profileDesc_consultant}
                    onPress={() => this.props.mainNav.push('OfferScreen', {
                        ...this.props.data, ...this.state.user
                    })}
                    title={this.state.user.firstName + ' ' + this.state.user.lastName}
                    right={props => <List.Icon {...props}
                                               icon={props => <Ionicons {...props}
                                                                        style={this.state.user.consultant ? {color: colorScheme.background} : {color: colorScheme.neutral}}
                                                                        name={this.state.user.consultant ? 'book' : 'cash'}/>}/>}
                    left={props => <List.Icon {...props}
                                              style={styles.profilePic_noob}
                                              icon={props => <Avatar.Image source={{
                                                  uri: `data:image/${this.state.user.pictureType};base64,${this.state.user.profilePicture}`
                                              }}/>}/>}
                />
                <Divider style={styles.divider}/>
            </>


        )
    }
}


const styles = StyleSheet.create({
    divider: {
        height: 1
    },
    container_consultant: {
        backgroundColor: colorScheme.neutral,
        paddingVertical: 15
    },
    profileTitle_consultant: {
        paddingLeft: 10,
        color: colorScheme.background,
        fontWeight: "bold",
    },
    profileDesc_consultant: {
        paddingLeft: 10,
        color: colorScheme.background_subtle
    },
    profilePic_consultant: {
        paddingLeft: 5,
        alignItems: "center",
        justifyContent: "center",
    },


    container_noob: {
        backgroundColor: colorScheme.background,
    },
    profileTitle_noob: {
        paddingLeft: 10,
        fontWeight: "bold",
        color: colorScheme.neutral
    },
    profileDesc_noob: {
        paddingLeft: 10,
        color: colorScheme.neutral_subtle
    },
    profilePic_noob: {
        paddingLeft: 5,
        alignItems: "center",
        justifyContent: "center",
    }

});
