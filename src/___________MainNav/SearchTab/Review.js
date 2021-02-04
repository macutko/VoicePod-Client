import {Avatar, Divider, List} from "react-native-paper";
import React from "react";
import {StyleSheet} from "react-native";

export default class Review extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <List.Item titleStyle={styles.profileTitle}
                           style={styles.container}
                           descriptionStyle={styles.profileDesc}
                           title={this.props.data.from.firstName + ' ' + this.props.data.from.lastName}
                           description={this.props.data.review}
                           descriptionNumberOfLines={2}
                           left={props => <List.Icon {...props}
                                                     style={styles.profilePic}
                                                     icon={props => <Avatar.Image
                                                         source={{uri: `data:image/${this.props.data.from.pictureType};base64,${this.props.data.from.profilePicture}`}}/>}/>}
                />
                <Divider/>
            </>
        );
    }
}


const styles = StyleSheet.create({
    description: {
        paddingTop: 10,
        fontSize: 20,
        width: "80%",
        textAlign: 'justify'
    },
    containerStyle: {
        paddingTop: 20,
    }
});
