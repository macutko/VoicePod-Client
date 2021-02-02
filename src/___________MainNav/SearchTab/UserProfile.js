import React from "react";
import {FlatList, RefreshControl, StyleSheet, View} from "react-native";
import {Avatar, Button, Paragraph, Title} from "react-native-paper";
import Text from "react-native-paper/src/components/Typography/Text";
import Ionicons from "react-native-vector-icons/Ionicons";
import Portal from "react-native-paper/src/components/Portal/Portal";
import Dialog from "react-native-paper/src/components/Dialog/Dialog";
import Review from "./Review";

export default class UserProfile extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            showDialog: false,
            fetchingReviews: true
        }
        this._isMounted = false

    }

    componentWillUnmount() {
        this._isMounted = false
    }

    componentDidMount() {
        this._isMounted = true
        this.getReviews()
    }

    navigateToOfferCreation = () => {
        this.props.socket.emit('checkDefaultPaymentMethod', {}, (err, res) => {
            if (err != null) console.log(`Error in BusinessProfile ${err}`)
            else {
                console.log(`REs ${res}`)
                if (res) {
                    this.props.mainNav.navigate('IntroOffer', {...this.props.route.params})
                } else {
                    this.toggleDialog()
                }
            }
        })


    }

    toggleDialog = () => {
        if (this._isMounted) {
            this.setState(prevState => ({
                showDialog: !prevState.showDialog
            }))
        }
    }

    getReviews = () => {
        this.props.socket.emit('getReviewsOfUser', {username: this.props.route.params.username}, (err, res) => {
            if (err) console.log(`Error in getting Reviews ${err}`)
            else {
                console.log(`Res ${JSON.stringify(res)}`)
                this.setState({
                    reviews: res,
                    fetchingReviews: false
                })
            }
        })
    }

    onRefresh() {
        this.setState({fetchingReviews: true}, () => {
            this.getReviews();
        });
    }


    render() {
        return (
            <View style={styles.containerStyle}>

                <Avatar.Image size={200}
                              source={{uri: `data:image/${this.props.route.params.pictureType};base64,${this.props.route.params.profilePicture}`}}/>

                <Text style={styles.handle}>@{this.props.route.params.username}</Text>
                <Title
                    style={styles.nameTag}>{this.props.route.params.firstName} {this.props.route.params.lastName}</Title>

                <Text style={styles.description}>{this.props.route.params.description}</Text>
                <Button mode="contained" icon={props => <Ionicons {...props} name={'send'}/>}
                        onPress={() => this.navigateToOfferCreation()} style={styles.buttonStyle}>
                    Send Offer
                </Button>
                <Title> Reviews</Title>
                {!this.state.fetchingReviews ?
                    <>
                        <FlatList
                            data={this.state.reviews}
                            style={styles.reviewContainer}
                            // inverted={true}
                            refreshControl={
                                <RefreshControl
                                    // colors={["#9Bd35A", "#689F38"]}
                                    refreshing={this.state.fetchingReviews}
                                    onRefresh={() => this.onRefresh()}
                                />
                            }
                            renderItem={({item}) => (
                                <Review {...this.props} data={item}/>
                            )}
                            keyExtractor={(item) => item.id}
                        />
                    </>
                    : null}

                <Portal>
                    <Dialog visible={this.state.showDialog} onDismiss={() => this.toggleDialog()}>
                        <Dialog.Title>No payment method</Dialog.Title>

                        <Dialog.Content>
                            <Paragraph>We are sorry, but first setup a default payment method in settings</Paragraph>
                        </Dialog.Content>

                        <Dialog.Actions>
                            <Button onPress={() => {
                                this.toggleDialog()
                                this.props.navigation.navigate('SettingsTab', {
                                    screen: 'Payments'
                                })
                            }}>Ok</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>


            </View>);
    }
}

const styles = StyleSheet.create({
    buttonStyle: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 15,
        width: "80%"
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
    description: {
        paddingTop: 10,
        fontSize: 20,
        width: "80%",
        textAlign: 'justify'
    },
    containerStyle: {
        paddingTop: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    reviewContainer: {
        width: "100%",

    }
});
