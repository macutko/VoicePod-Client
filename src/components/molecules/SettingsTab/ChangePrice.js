import TextInput from "react-native-paper/src/components/TextInput/TextInput"
import {StyleSheet} from "react-native"
import React from "react"
import {colorScheme} from "../../../constants/Colors"

// TODO: REFACTOR
export default class ChangePrice extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            price: null,
            currency: null,
        }
        this._isMounted = false
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    componentDidMount() {
        this._isMounted = true
        this.props.socket.emit("getBusinessPrice", {}, (err, res) => {
            if (err) console.log(`Err in change price ${err}`)
            else {
                console.log(`res ${Object.keys(res)}`)
                if (this._isMounted) {
                    this.setState({
                        price: res.price,
                        currency: res.currency,
                    })
                }
            }
        })

    }


    onChangePrice = (text) => {
        if (this._isMounted) {
            this.setState({
                price: text,
            })
        }
    }

    onSubmitPrice = () => {
        if (this.state.price > 0) {
            this.props.socket.emit("setBusinessPrice", {price: this.state.price}, (err, res) => {
                if (err) console.log(`Error in change price ${err}`)
                else {
                    console.log(`Res ${res}`)
                }
            })
        }

    }


    render() {
        return (
            !this.state.price ? null :
                <TextInput
                    style={styles.textInput}
                    label="Price per minute"
                    type={"outlined"}
                    keyboardType={"number-pad"}
                    value={`${this.state.price.toString()}`}
                    onSubmitEditing={this.onSubmitPrice}
                    onChangeText={this.onChangePrice}
                />

        )
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        paddingTop: 20,
    },
    textInput: {
        width: "80%",
        paddingHorizontal: "10%",
        marginBottom: 5,
        backgroundColor: colorScheme.background,
    },
})
