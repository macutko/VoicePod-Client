import React from "react"
import {StyleSheet, Text, View} from "react-native";
import {colorScheme} from "../../constants/Colors";
import GlobalContext from "../../GlobalState";

export default class Message extends React.Component {
    static contextType = GlobalContext


    render() {
        return (
            <>
                <View style={{flexDirection: "column"}}>
                    <View
                        style={this.context.globalState.user.email === this.props.data.from.email ? styles.container_own : styles.container_theirs}>
                        <Text style={styles.text}>{this.props.data.message}</Text>
                    </View>
                </View>
            </>
        );
    }

}


const styles = StyleSheet.create({
    container_theirs: {
        alignSelf: 'flex-start',
        textAlign: 'left',
        backgroundColor: colorScheme.containerColor,
        marginLeft: 15,
        marginTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        maxWidth: "75%",
        borderRadius: 50 / 2
    },
    container_own: {
        alignSelf: 'flex-end',
        textAlign: 'right',
        backgroundColor: colorScheme.divider,
        marginLeft: 15,
        marginTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        maxWidth: "75%",
        borderRadius: 50 / 2
    },
    text: {
        fontSize: 20,
        color: colorScheme.text
    }
});
