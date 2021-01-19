import React from "react";
import {StyleSheet, View} from "react-native";
import {colorScheme} from "../components/constants/Colors";
import Slider from '@react-native-community/slider';
import Title from "react-native-paper/src/components/Typography/Title";
import Paragraph from "react-native-paper/src/components/Typography/Paragraph";
import TextInput from "react-native-paper/src/components/TextInput/TextInput";
import {Button} from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";

export default class BudgetOffer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            budget: 5 * this.props.route.params.price,
            minutes: 5,
            hours: 0,
        }
        console.log(this.props.route.params.price)
    }


    submit = () => {
        this.props.socket.emit('offerProposition', {
            username: this.props.route.params.username,
            intro: this.props.route.params.intro,
            problem: this.props.route.params.problem,
            advice: this.props.route.params.advice,
            outcome: this.props.route.params.outcome,
            budget: (this.state.hours * 60) + this.state.minutes
        }, (err, res) => {
            if (err) console.log(`Error in Budget Offer ${err}`)
            if (res) {
                console.log(`Res from Budget Offer ${JSON.stringify(res)}`)
                this.props.navigation.navigate('LandingPage', {
                    screen: 'Chats'
                });
            }
        })

    }
    changeMinutes = (e) => {
        if (e > 60) {
            e = 60
        }
        if (e < 5) {
            e = 5
        }
        let m = Math.round(e)
        let budget = ((this.state.hours * 60) + m) * this.props.route.params.price
        this.setState({
            minutes: m,
            budget: budget
        }, () => console.log(this.state.minutes))
    }
    changeHours = (e) => {
        if (e > 10) {
            e = 10
        }
        if (e < 0) {
            e = 0
        }
        let h = Math.round(e)
        let budget = ((h * 60) + this.state.minutes) * this.props.route.params.price
        this.setState({
            hours: h,
            budget: budget
        }, () => console.log(this.state.hours))
    }

    render() {
        return (
            <View style={styles.background}>
                <Title style={styles.title}>Budget</Title>
                <Paragraph style={styles.description}>Set your maximum spending. Your mate might suggest a smaller
                    amount
                    if he decides the problem is more trivial. In the end you pay only as much as you use, and you can
                    always agree to extend the maximum. Remember, you only pay for the time you speak.</Paragraph>
                <View style={styles.row}>
                    <TextInput
                        style={styles.textInput}
                        label="Minutes"
                        type={'flat'}
                        keyboardType={'number-pad'}
                        value={this.state.minutes.toString()}
                        onChangeText={text => isNaN(text) ? null : this.changeMinutes(parseInt(text))}
                    />
                    <Slider
                        style={styles.slider}
                        minimumValue={5}
                        maximumValue={60}
                        value={this.state.minutes}
                        onValueChange={this.changeMinutes}
                        minimumTrackTintColor={colorScheme.background}
                        maximumTrackTintColor={colorScheme.accent}
                    />
                </View>
                <View style={styles.row}>
                    <TextInput
                        style={styles.textInput}
                        label="Hours"
                        type={'flat'}
                        keyboardType={'number-pad'}
                        value={this.state.hours.toString()}
                        onChangeText={text => isNaN(text) ? null : this.changeHours(parseInt(text))}
                    />
                    <Slider
                        style={styles.slider}
                        minimumValue={0}
                        maximumValue={10}
                        value={this.state.hours}
                        onValueChange={this.changeHours}
                        minimumTrackTintColor={colorScheme.background}
                        maximumTrackTintColor={colorScheme.accent}
                    />
                </View>

                <Title>{`${this.state.budget} of your currency`}</Title>
                <Button mode="contained"
                        labelStyle={styles.buttonStyle_label}
                        icon={props => <Ionicons {...props} name={'send'}/>}
                        onPress={() => this.submit()}
                        style={styles.buttonStyle}>
                    Submit Offer
                </Button>
            </View>

        )
            ;
    }
}


const styles = StyleSheet.create({
    slider: {width: "70%", height: 65},
    textInput: {
        width: "30%",
        textAlign: 'center',
        backgroundColor: colorScheme.primary
    },
    row: {
        justifyContent: 'center',
        flexDirection: 'row',
        width: "100%",
        marginTop: 10,
        alignItems: "center",
        marginBottom: 15,
    }, buttonStyle_label: {color: colorScheme.neutral,},
    buttonStyle: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: "auto",
        marginBottom: 10,
        backgroundColor: colorScheme.secondary,
        width: "80%"
    },
    background: {
        backgroundColor: colorScheme.primary,
        height: "100%",
        alignItems: "center",
        paddingTop: "10%",
        paddingHorizontal: '10%'
        // justifyContent: "center",
    },
    description: {
        textAlign: 'justify'
    }, title: {
        fontSize: 25
    },

});


