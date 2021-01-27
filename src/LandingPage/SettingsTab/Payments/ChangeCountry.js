import {List, RadioButton} from "react-native-paper";
import React from "react";
import Portal from "react-native-paper/src/components/Portal/Portal";
import Dialog from "react-native-paper/src/components/Dialog/Dialog";
import Button from "react-native-paper/src/components/Button";
import {ScrollView} from "react-native";

export default class ChangeCountry extends React.Component {

    constructor(props) {
        super(props);
        this._isMounted = false
        this.state = {
            countries: [],
            menuVisible: false,
            country: null
        }
    }

    componentDidMount() {
        this._isMounted = true

        this.props.socket.emit('getBusinessCountry', {}, (err, res) => {
            if (err) console.log(`Error in CHange country ${err}`)
            else {
                console.log(`Res ${res}`)
                if (this._isMounted) {
                    this.setState({
                        country: res
                    })
                }
            }
        })
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    toggleMenu = () => {
        this.setState(prevState => ({
            menuVisible: !prevState.menuVisible
        }), () => {
            if (this.state.menuVisible) {
                this.props.socket.emit('getCountries', {}, (err, res) => {
                    if (err) console.log(`Error in change country ${err}`)
                    else {
                        if (this._isMounted) {
                            this.setState({
                                countries: res
                            })
                        }
                    }
                })
            }
        })
    }


    changeCountry = (value) => {
        if (this._isMounted) {
            this.setState({
                country: value
            })
        }
    }

    submitChange = () => {

        this.props.socket.emit('setBusinessCountry', {country: this.state.country}, (err, res) => {
            if (err) console.log(`Error in change price ${err}`)
            else {
                console.log(`Res ${res}`)

                this.toggleMenu()
            }
        })


    }

    render() {
        return (
            <>
                {!this.state.country ? null :
                    <List.Item
                        onPress={() => this.toggleMenu()}
                        title="Your country"
                        description={this.state.country}
                    />
                }


                <Portal>
                    <Dialog visible={this.state.menuVisible} onDismiss={() => this.toggleMenu()}>
                        <Dialog.Title>Choose your country of residence</Dialog.Title>

                        <Dialog.ScrollArea>
                            <ScrollView contentContainerStyle={{paddingHorizontal: 24}}>
                                {!this.state.countries ? null :
                                    <RadioButton.Group onValueChange={value => this.changeCountry(value)}
                                                       value={this.state.country}>
                                        {this.state.countries.map((object, i) =>
                                            <RadioButton.Item label={object.country} value={object.code} key={i}/>)
                                        }
                                    </RadioButton.Group>
                                }
                            </ScrollView>
                        </Dialog.ScrollArea>

                        <Dialog.Actions>
                            <Button onPress={() => this.submitChange()}>Done</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </>
        );
    }
}