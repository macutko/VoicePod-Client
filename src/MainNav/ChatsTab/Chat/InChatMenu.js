import {List, Modal, Portal} from "react-native-paper";
import * as React from "react";
import {Animated, StyleSheet} from "react-native";

export default class InChatMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fadeAnim: new Animated.Value(0),
            fadeAnimOffer: new Animated.Value(0),
            offerVisible: false
        };
    }

    fadeIn = (name) => {
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.timing(this.state[name], {
            toValue: 1,
            duration: 2500,
            useNativeDriver: true
        }).start();
    };

    fadeOut = (name) => {
        // Will change fadeAnim value to 0 in 5 seconds
        Animated.timing(this.state[name], {
            toValue: 0,
            duration: 2500,
            useNativeDriver: true
        }).start();
    };

    componentDidMount() {
        this.fadeIn('fadeAnim')
    }

    toggleOffer = () => {
        this.setState(prevState => ({
            offerVisible: !prevState.offerVisible
        }), () => {
            if (this.state.offerVisible) {
                this.fadeOut("fadeAnim")
                this.fadeIn("fadeAnimOffer")
            } else {
                this.fadeOut("fadeAnimOffer")
                this.fadeIn("fadeAnim")
            }
        })

    }

    render() {
        return (
            <Portal>
                <Modal
                    visible={this.props.visible}
                    onDismiss={this.props.toggleModal}
                    animationType="fade"
                    contentContainerStyle={styles.containerStyle}
                >
                    {!this.state.offerVisible ?
                        <Animated.View
                            style={[
                                {
                                    opacity: this.state.fadeAnim // Bind opacity to animated value
                                }
                            ]}
                        >

                            <List.Item
                                title="View Offerer"
                                onPress={() => this.toggleOffer()}/>
                        </Animated.View>
                        :
                        <Animated.View style={[
                            {
                                opacity: this.state.fadeAnimOffer // Bind opacity to animated value
                            }]}>

                            <List.Item
                                title="Offer Display here!"
                                description={"Press to go back"}
                                onPress={() => this.toggleOffer()}/>
                        </Animated.View>
                    }

                </Modal>
            </Portal>
        );
    }
}


const styles = StyleSheet.create({
    containerStyle: {backgroundColor: 'white', padding: 20, marginHorizontal: "5%"},
});


