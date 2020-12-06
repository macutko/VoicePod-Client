import React from "react"
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {colorScheme} from "../../constants/Colors";

export default class ChatListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    toChat = () => {
        this.props.navigation.navigate("ChatScreen", {data: this.props.data})
    }

    render = () => {
        return (
            <>
                <TouchableOpacity onPress={() => this.toChat()}>
                    <View style={styles.container}>
                        <View style={{flex: 1}}>
                            <Text style={styles.profilePic}/>
                        </View>
                        <View style={{flex: 2}}>
                            <Text style={styles.text}>{this.props.data.username}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={styles.divider}/>
            </>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        // backgroundColor: colorScheme.containerColor,
        paddingTop: 7,
        paddingBottom: 5,
        alignSelf: 'stretch',
        textAlign: 'center',
        flexDirection: "row"
    },
    text: {
        fontSize: 30,

    },
    divider: {
        backgroundColor: colorScheme.divider,
        alignSelf: 'stretch',
        textAlign: 'center',
        minHeight: 1
    },
    profilePic: {
        backgroundColor: colorScheme.divider,
        marginLeft: 15,
        width: 50,
        height: 50,
        borderRadius: 50 / 2
    }


});
