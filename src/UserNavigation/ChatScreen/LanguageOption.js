import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {colorScheme} from "../../constants/Colors";


export default class LanguageSelect extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <View style={styles.container}>
                    <TouchableOpacity onPress={() => {
                        this.props.close()
                        this.props.setLanguage(this.props.data)
                    }}>
                        <Text style={styles.text}>{this.props.data} </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.divider}/>
            </>
        );
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


});
