//TODO: REFACTOR
import React from "react"
import {StyleSheet, View} from "react-native";
import {Appbar, Button, Dialog, Paragraph, Portal, Title} from "react-native-paper";
import OfferMenu from "../../components/molecules/OffersTab/OfferMenu";
import Ionicons from "react-native-vector-icons/Ionicons";
import {colorScheme} from "../../constants/Colors";
import AudioPlayer from "../../components/atoms/AudioPlayer/AudioPlayer";

export default class OfferScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openMenu: false,
            isFetching: false,
            thisIsMyClient: !props.route.params.consultant,
            offerEndLifeCycleDialog: false
        }
    }


    componentDidMount() {
        this._isMounted = true
        console.log(Object.keys(this.props.route.params))

    }

    acceptOffer = () => {
        this.props.socket.emit('acceptOffer', {offerId: this.props.route.params.id}, (err, res) => {
            if (err) console.log(`Err in offer screen ${err}`)
            else {
                console.log(`Res ${Object.keys(res)}`)
                this.props.navigation.navigate('OffersTab')
            }
        })
    }

    rejectOffer = () => {
        this.props.socket.emit('rejectOrCancelOffer', {offerId: this.props.route.params.id}, (err, res) => {
            if (err) console.log(`Err in offer screen ${err}`)
            else {
                this.props.navigation.navigate('OffersTab')
            }
        })

    }

    toggleMenu = () => {
        this.setState(prevState => ({openMenu: !prevState.openMenu}))
    }

    toggleOfferDialog = () => {
        this.setState(prevState => ({offerEndLifeCycleDialog: !prevState.offerEndLifeCycleDialog}))
    }

    componentWillUnmount() {
        this._isMounted = false //TODO: antipattern BUT do not have a better solution yet for sockets

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
                    <Appbar.Action icon="dots-vertical" onPress={() => this.setState({
                        openMenu: true
                    })}/>

                </Appbar.Header>

                <OfferMenu toggleModal={this.toggleMenu} visible={this.state.openMenu}/>


                <View style={{flexDirection: "column"}}>


                    <View style={styles.offer_container}>
                        <Title style={styles.container_theirs}>Who?</Title>
                        <AudioPlayer soundBits={this.props.route.params.introSoundBits}
                                     fileName={`intro_offer_${this.props.route.params.id}`}/>
                        <Title style={styles.container_theirs}>Advice?</Title>
                        <AudioPlayer soundBits={this.props.route.params.adviceSoundBits}
                                     fileName={`advice_offer_${this.props.route.params.id}`}/>
                        <Title style={styles.container_theirs}>Problem?</Title>
                        <AudioPlayer soundBits={this.props.route.params.problemSoundBits}
                                     fileName={`problem_offer_${this.props.route.params.id}`}/>
                        <Title style={styles.container_theirs}>Outcome?</Title>
                        <AudioPlayer soundBits={this.props.route.params.outcomeSoundBits}
                                     fileName={`outcome_offer_${this.props.route.params.id}`}/>

                        {this.state.thisIsMyClient ?
                            <View style={styles.mainContainer}>
                                <View style={styles.container}>
                                    <Button style={styles.button}
                                            icon={props => <Ionicons {...props} name={'checkmark-circle'}/>}
                                            mode="outlined"
                                            onPress={() => this.acceptOffer()}>
                                        Accept
                                    </Button>
                                    <Button style={styles.button}
                                            icon={props => <Ionicons {...props} name={'close-circle'}/>}
                                            mode="outlined"
                                            onPress={() => this.rejectOffer()}>
                                        Reject
                                    </Button>
                                </View>
                            </View>
                            : <>
                                {this.props.route.params.accepted ? <>
                                        <Title>
                                            Consultant accepted but the payment must have not gone through. Please try to
                                            pay again by pressing....</Title> <Button style={styles.button}
                                                                                      icon={props => <Ionicons {...props}
                                                                                                               name={'close-circle'}/>}
                                                                                      mode="outlined"
                                                                                      onPress={() => this.rejectOffer()}>
                                        Or cancel
                                    </Button> </> :
                                    <>
                                        <Title>Need to wait for your consultant to accept </Title>
                                        <Button style={styles.button}
                                                icon={props => <Ionicons {...props} name={'close-circle'}/>}
                                                mode="outlined"
                                                onPress={() => this.rejectOffer()}>
                                            Or cancel
                                        </Button>

                                    </>}
                            </>}
                    </View>


                </View>


                <Portal>
                    <Dialog visible={this.state.offerEndLifeCycleDialog} onDismiss={this.toggleOfferDialog}>
                        <Dialog.Title>Your chat has ended</Dialog.Title>
                        <Dialog.Content>
                            <Paragraph>You need to start a new offer in case you are interested to continue this
                                conversation</Paragraph>
                        </Dialog.Content>
                        <Dialog.Actions>
                            {/*<Button onPress={() => console.log('increase budget')}>Increase budget</Button>*/}
                            <Button onPress={() => this.closeChat()}>Close</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </>
        );
    }
}


const styles = StyleSheet.create({
    bottom_container: {
        alignItems: "center",
        height: "20%"
    },

    messagesContainer: {
        height: "80%"
    },
    offer_container: {
        marginTop: 10,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        width: "75%",
    },
    container_theirs: {
        borderRadius: 50 / 2
    },
    slider: {
        height: 65,
        width: "90%",
    },
    button: {
        alignSelf: "center",
        backgroundColor: colorScheme.background
    },
    mainContainer: {
        alignContent: 'center',
        justifyContent: 'center',
        width: "100%",
        paddingHorizontal: "5%",
        marginTop: 20
    },
    container: {
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
})
