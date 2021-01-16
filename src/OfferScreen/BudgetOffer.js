import React from "react";
import {StyleSheet, View} from "react-native";
import {colorScheme} from "../components/constants/Colors";
import Slider from '@react-native-community/slider';
import Title from "react-native-paper/src/components/Typography/Title";
import Subheading from "react-native-paper/src/components/Typography/Subheading";
import Paragraph from "react-native-paper/src/components/Typography/Paragraph";
import TextInput from "react-native-paper/src/components/TextInput/TextInput";


export default class BudgetOffer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            budget: 150,
            minutes: 0,
            hours: 0,
        }
    }


    submit = () => {

        for (const key in Object.keys(this.props.route.params)) {
            if (this.props.route[key] == null) this.props.navigation.navigate('IntroOffer')
        }

        // this.props.navigation.navigate('BudgetOffer', {
        //     intro: this.props.route.params.who,
        //     problem: this.props.route.params.problem,
        //     advice: this.props.route.params.advice,
        //     budget: this.state.budget
        // })
    }
    changeMinutes = (e) => {
        console.log(e)
        this.setState({
            minutes: Math.round(e)
        })
    }
    changeHours = (e) => {
        console.log(e)
        this.setState({
            hours: Math.round(e)
        })
    }

    render() {
        return (
            <View style={styles.background}>
                <Title style={styles.title}>Budget</Title>
                <Paragraph style={styles.description}>Set your maximum spending. Your mate might suggest a smaller
                    amount
                    if he decides the problem is more trivial. In the end you pay only as much as you use, and you can
                    always agree to extend the maximum. Remember, you only pay for the time you speak.</Paragraph>

                <TextInput
                    label="Minutes"
                    type={'flat'}
                    value={this.state.minutes}
                    onChangeText={text => isNaN(text) ? null : this.setState({minutes: parseInt(text)})}
                />
                <Slider
                    style={{width: "100%", height: 65}}
                    minimumValue={0}
                    maximumValue={60}
                    value={this.state.minutes}
                    onValueChange={this.changeMinutes}
                    minimumTrackTintColor={colorScheme.background}
                    maximumTrackTintColor={colorScheme.accent}
                />

                <Subheading>Hours</Subheading>
                <Slider
                    style={{width: "100%", height: 65}}
                    minimumValue={0}
                    maximumValue={10}
                    value={this.state.hours}
                    onValueChange={this.changeHours}
                    minimumTrackTintColor={colorScheme.background}
                    maximumTrackTintColor={colorScheme.accent}
                />

            </View>

        );
    }
}


const styles = StyleSheet.create({

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


