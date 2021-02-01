import Slider from "@react-native-community/slider";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import TextInput from "react-native-paper/src/components/TextInput/TextInput";
import Paragraph from "react-native-paper/src/components/Typography/Paragraph";
import Title from "react-native-paper/src/components/Typography/Title";
import stripe from "tipsi-stripe";
import { colorScheme } from "../../components/constants/Colors";

stripe.setOptions({
  publishableKey:
    "pk_test_51IDSTZECU7HrwjM1mvfNnY2spqwoSGu9rAKZYia8Egd4QRruVp9S6HIUaPi1WEWWDM8sEcNMN5r4fioXDibqBvi4008TNJG6Xe",
  androidPayMode: "test", // Android only
});

export default class BudgetOffer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      budget: 0,
      minutes: 5,
      hours: 0,
      isFetching: false,
      businessProfile: {},
    };
    this._isMounted = false;
    console.log(Object.keys(this.props.route.params));
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    this.props.socket.emit(
      "getBusinessProfile",
      {
        username: this.props.route.params.username,
        email: this.props.route.params.email,
      },
      (err, res) => {
        if (err) console.log(`Error in budget offer ${err}`);
        else {
          if (this._isMounted) {
            this.setState({
              businessProfile: res,
              budget: res.price * this.state.minutes,
            });
          }
        }
      }
    );
  }

  submit = () => {
    console.log();
    this.props.socket.emit(
      "createOffer",
      {
        username: this.props.route.params.username,
        intro: this.props.route.params.intro,
        problem: this.props.route.params.problem,
        budget: this.state.hours * 60 + this.state.minutes,
      },
      (err, res) => {
        if (err) console.log(`Error in Budget Offer ${err}`);
        if (res) {
          console.log(`Res from Budget Offer ${JSON.stringify(res)}`);

          stripe
            .confirmPaymentIntent({ clientSecret: res.clientSecret })
            .then((r) => {
              console.log(r);
              this.props.navigation.navigate("TabNavWrapper", {
                screen: "ChatsTab",
              });
            })
            .catch((e) => {
              console.log(e);
            });
        }
      }
    );
  };
  changeMinutes = (e) => {
    if (e > 60) {
      e = 60;
    }
    if (e < 5) {
      e = 5;
    }
    let m = Math.round(e);
    let budget =
      (this.state.hours * 60 + m) *
      (this.state.businessProfile.price ? this.state.businessProfile.price : 0);
    this.setState(
      {
        minutes: m,
        budget: budget,
      },
      () => console.log(this.state.minutes)
    );
  };
  changeHours = (e) => {
    if (e > 10) {
      e = 10;
    }
    if (e < 0) {
      e = 0;
    }
    let h = Math.round(e);
    let budget =
      (h * 60 + this.state.minutes) *
      (this.state.businessProfile.price ? this.state.businessProfile.price : 0);
    this.setState(
      {
        hours: h,
        budget: budget,
      },
      () => console.log(this.state.hours)
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Title style={styles.title}>Budget</Title>
        <Paragraph style={styles.description}>
          Set your maximum spending. Your mate might suggest a smaller amount if
          he decides the problem is more trivial. In the end you pay only as
          much as you use, and you can always agree to extend the maximum.
          Remember, you only pay for the time you speak.
        </Paragraph>
        <Image
          style={styles.image}
          source={require("../../assets/images/budget.png")}
        />

        <View>
          {/* TODO : outsource */}
          <View style={styles.row}>
            <TextInput
              style={styles.textInput}
              underlineColor={"transparent"}
              label="Minutes"
              type={"flat"}
              keyboardType={"number-pad"}
              value={this.state.minutes.toString()}
              onChangeText={(text) =>
                isNaN(text) ? null : this.changeMinutes(parseInt(text))
              }
            />
            <Slider
              style={styles.slider}
              minimumValue={5}
              maximumValue={60}
              value={this.state.minutes}
              onValueChange={this.changeMinutes}
              minimumTrackTintColor={colorScheme.background}
              maximumTrackTintColor={colorScheme.accent}
              minimumTrackTintColor={colorScheme.secondary}
              maximumTrackTintColor={colorScheme.primary}
              thumbTintColor={colorScheme.secondary}
            />
          </View>
          <View style={styles.row}>
            <TextInput
              style={styles.textInput}
              underlineColor={"transparent"}
              label="Hours"
              type={"flat"}
              keyboardType={"number-pad"}
              value={this.state.hours.toString()}
              onChangeText={(text) =>
                isNaN(text) ? null : this.changeHours(parseInt(text))
              }
            />
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={10}
              value={this.state.hours}
              onValueChange={this.changeHours}
              minimumTrackTintColor={colorScheme.secondary}
              maximumTrackTintColor={colorScheme.primary}
              thumbTintColor={colorScheme.secondary}
            />
          </View>
        </View>

        <Title style={styles.budget}>{`${this.state.budget} $`}</Title>

        <Button
          mode="contained"
          labelStyle={styles.buttonStyleLabel}
          onPress={() => this.submit()}
          style={styles.buttonStyle}
          color={colorScheme.secondary}
          contentStyle={styles.buttonContentStyle}
        >
          Submit Offer
        </Button>
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
  row: {
    justifyContent: "space-between",
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    marginBottom: -15,
  },
  slider: {
    width: "72%",
    height: 30,
    marginTop: 18,
  },
  textInput: {
    width: "28%",
    textAlign: "center",
    backgroundColor: "transparent",
  },
  budget: {
    fontSize: 28,
    paddingVertical: "3%",
  },
  buttonStyle: {
    width: 200,
    height: 50,
    borderRadius: 10,
  },
  buttonStyleLabel: {
    fontSize: 18,
  },
});
