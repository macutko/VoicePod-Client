import React from "react"
import {FlatList, RefreshControl, StyleSheet, View} from "react-native";
import {Appbar} from "react-native-paper";
import OfferMessage from "./OfferMessage";
import Message from "./Message";
import RecordButton from "./RecordButton";

export default class ChatScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            offer: null,
            isFetching: false,
            thisIsMyClient: !props.route.params.consultant
        }

    }

    getMessages = () => {
        this.props.socket.emit('getMessages', {chatId: this.props.route.params.id}, (err, res) => {
            if (err != null) console.log(`Error in Chat screen ${err}`)
            else {
                this.setState({
                    messages: res
                })
            }
        })
    }

    getOffer = () => {
        this.props.socket.emit('getOffer', {offerId: this.props.route.params.offerId}, (err, res) => {
            if (err != null) console.log(`Error in Chat screen ${err}`)
            else {
                this.setState({
                    offer: res
                })
            }
        })
    }

    onRefresh() {
        this.setState({isFetching: true}, () => {
            this.getMessages();
        });
    }

    componentDidMount() {
        this.getMessages()

        if ((this.props.route.params.lastMessage === null)) {
            this.getOffer()
        }

    }


    render() {
        return (
            <>
                <Appbar.Header>
                    <Appbar.BackAction onPress={() => this.props.navigation.goBack(null)}/>
                    <Appbar.Content title={this.props.route.params.firstName + " " + this.props.route.params.lastName}
                                    subtitle={
                                        `This is your ` + (this.props.route.params.consultant ? 'consultant' : 'client')
                                    }/>
                    <Appbar.Action icon="dots-vertical" onPress={() => console.log('press')}/>
                </Appbar.Header>


                <View style={{flexDirection: "column"}}>
                    {this.state.offer === null || this.state.offer.accepted ?
                        <>
                            <FlatList
                                data={this.state.messages}
                                refreshControl={<RefreshControl
                                    // colors={["#9Bd35A", "#689F38"]}
                                    refreshing={this.state.isFetching}
                                    onRefresh={() => this.onRefresh()}/>}
                                renderItem={({item}) => <Message {...this.props} data={item}/>}
                                keyExtractor={item => item.id}
                            />
                        </>
                        :
                        <OfferMessage {...this.props} data={this.state.offer}
                                      thisIsMyClient={this.state.thisIsMyClient}/>}
                </View>


                {this.state.offer === null || this.state.offer.accepted ?

                    <>
                        <View style={styles.bottom_container}>
                            <RecordButton {...this.props} chatId={this.props.route.params.id}/>

                        </View>


                    </> :
                    null
                }


            </>
        );
    }
}


const styles = StyleSheet.create({
    bottom_container: {
        marginTop: "auto",
        alignItems: "center",
        justifyContent: "center",
    }
})