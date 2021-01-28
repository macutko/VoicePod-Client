import React from "react";
import { StyleSheet, View } from "react-native";
import { Appbar } from "react-native-paper";
import OfferMessage from "../Chat/OfferMessage";

export default class ViewOffer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const props = this.props.route.params;
    console.log(props);
    return (
      <>
        <Appbar.Header>
          <Appbar.BackAction
            onPress={() => this.props.navigation.goBack(null)}
          />
          <Appbar.Content
            title={
              props.route.params.firstName + " " + props.route.params.lastName
            }
            subtitle={
              `This is your ` +
              (this.props.route.params.consultant ? "consultant" : "client")
            }
          />
          <Appbar.Action
            icon="dots-vertical"
            onPress={() => {}}
          />
        </Appbar.Header>

      <View style={styles.offerMessageContainer}>
        <OfferMessage
            {...this.props}
            data={props.offer}
            accept={() =>
              this.setprops({
                offer: { ...props.offer, accepted: true },
              })
            }
            reject={() => props.navigation.goBack(null)}
            thisIsMyClient={props.thisIsMyClient}
          />
      </View>

      </>
    );
  }
}

const styles = StyleSheet.create({
  offerMessageContainer: {
    marginTop: 50,
  }
});
