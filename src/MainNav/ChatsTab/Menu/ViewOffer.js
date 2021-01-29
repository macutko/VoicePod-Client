import React from "react";
import { StyleSheet, View } from "react-native";
import { Appbar } from "react-native-paper";
import OfferMessage from "../Chat/OfferMessage";

export default class ViewOffer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <Appbar.Header>
          <Appbar.BackAction
            onPress={() => this.props.navigation.goBack(null)}
          />
          <Appbar.Content
            title={"Offer"}
            // subtitle={}
          />
          {/*<Appbar.Action icon="dots-vertical" onPress={() => {}} />*/}
        </Appbar.Header>

        <View style={styles.offerMessageContainer}>
          <OfferMessage
            {...this.props}
            data={this.props.route.params.offer}
            accept={() => this.props.route.params.accept()}
            reject={() => props.navigation.goBack(null)}
            thisIsMyClient={this.props.route.params.thisIsMyClient}
          />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  offerMessageContainer: {
    marginTop: 50,
  },
});
