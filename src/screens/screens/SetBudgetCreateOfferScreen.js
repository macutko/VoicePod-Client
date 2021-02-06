import React from "react";
import {Image, StyleSheet, View} from "react-native";
import {colorScheme} from "../../constants/Colors";
import Title from "react-native-paper/src/components/Typography/Title";
import Paragraph from "react-native-paper/src/components/Typography/Paragraph";
import CreateOfferButton from "../../components/molecules/CreateOfferScreen/CreateOfferButton";
import MinutesSlider from "../../components/molecules/CreateOfferScreen/MinutesSlider";
import {HoursSlider} from "../../components/molecules/CreateOfferScreen/HoursSlider";
import {getBusinessProfileAPI} from "../../api/getBusinessProfileAPI";

export default class SetBudgetCreateOfferScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            budget: 0,
            businessProfile: {},
        };
        this._isMounted = false;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidMount() {

        this._isMounted = true;

        getBusinessProfileAPI(this.props.socket, {
            username: this.props.route.params.username,
            email: this.props.route.params.email,
        }).then(res => {
            if (this._isMounted) {
                this.setState({
                    businessProfile: res,
                    budget: res.price * this.state.minutes,
                });
            }
        }).catch(e => {
            console.log(e)
        })
    }

    onChangeMinutes = (m) => {
        if (this._isMounted) {
            this.setState({
                budget: (this.state.hours * 60 + m) * (this.state.businessProfile.price ? this.state.businessProfile.price : 0),
                minutes: m
            })
        }
    }

    onChangeHours = (h) => {
        if (this._isMounted) {
            this.setState({
                budget: (h * 60 + this.state.minutes) * (this.state.businessProfile.price ? this.state.businessProfile.price : 0),
                hours: h
            })
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Title style={styles.title}>Budget</Title>
                <Paragraph style={styles.description}>
                    Set your maximum spending. In the end you pay only as
                    much as you use, and you can always agree to open a new offer and close this one.
                    Remember, you only pay for the time you speak and the offer must be resolved in 7 days.
                </Paragraph>
                <Image
                    style={styles.image}
                    source={require("../../assets/images/budget.png")}
                />

                <>
                    <MinutesSlider returnMinutes={this.onChangeMinutes}/>

                    <HoursSlider returnHours={this.onChangeHours}/>


                    <Title style={styles.budget}>{`${this.state.budget ? this.state.budget : 0} $`}</Title>

                    <CreateOfferButton navigation={this.props.navigation} username={this.props.route.params.username}
                                       budget={this.state.hours * 60 + this.state.minutes}
                                       intro={this.props.route.params.intro}
                                       problem={this.props.route.params.problem}/></>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-evenly",
        padding: "8%",
        backgroundColor: colorScheme.white,
    },
    title: {
        fontSize: 30,
    },
    description: {
        textAlign: "justify",
    },
    image: {
        flex: 0.6,
        resizeMode: "contain",
    },

    budget: {
        fontSize: 28,
        paddingVertical: "3%",
    },
});
