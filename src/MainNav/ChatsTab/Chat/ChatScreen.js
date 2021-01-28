import React from "react";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import {
  Appbar,
  Button,
  Dialog,
  Paragraph,
  Portal,
  Menu,
  Divider,
} from "react-native-paper";
import OfferMessage from "./OfferMessage";
import Message from "./Message";
import RecordButton from "./RecordButton";
import { Dimensions } from "react-native";

export default class ChatScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      offer: null,
      menuVisible: false,
      isFetching: false,
      thisIsMyClient: !props.route.params.consultant,
      offerEndLifeCycleDialog: false,
    };
  }

  getMessages = () => {
    this.setState(
      {
        isFetching: true,
      },
      () =>
        this.props.socket.emit(
          "getMessages",
          { chatId: this.props.route.params.id },
          (err, res) => {
            if (err != null) console.log(`Error in Chat screen ${err}`);
            else {
              this.setState({
                messages: res.reverse(),
                isFetching: false,
              });
            }
          }
        )
    );
  };

  getOffer = () => {
    this.setState({ isFetching: true }, () =>
      this.props.socket.emit(
        "getOffer",
        { offerId: this.props.route.params.offerId },
        (err, res) => {
          if (err != null) console.log(`Error in Chat screen ${err}`);
          else {
            this.setState({
              offer: res,
              isFetching: false,
            });
          }
        }
      )
    );
  };

  onRefresh() {
    this.setState({ isFetching: true }, () => {
      this.getMessages();
    });
  }

  closeChat = () => {
    this.props.socket.emit(
      "closeChat",
      { chatId: this.props.route.params.id },
      (err, res) => {
        if (err) console.log(`Error in cHat screen on close chat ${err}`);
        else {
          if (res) {
            this.toggleOfferDialog();
          }
          console.log(`Res ${res}`);
        }
      }
    );
  };

  acceptOffer = () => {
    this.setState({
      offer: { ...this.state.offer, accepted: true },
    });
  };

  toggleOfferDialog = () => {
    this.setState((prevState) => ({
      offerEndLifeCycleDialog: !prevState.offerEndLifeCycleDialog,
    }));
  };

  toggleMenu = () => {
    this.setState((prevState) => ({
      menuVisible: !prevState.menuVisible,
    }));
  };

  componentDidMount() {
    this._isMounted = true;
    this.getMessages();
    this.getOffer();

    this.props.socket.emit(
      "joinChat",
      { chatId: this.props.route.params.id },
      (err, res) => {
        if (err) console.log(`Error in JoinCHat CHatscreen ${err}`);
      }
    );

    this.props.socket.on("newMessage", (data) => {
      if (data.chatId === this.props.route.params.id) {
        const joined = [data.message].concat(this.state.messages);
        if (this._isMounted) {
          this.setState((prevState) => ({
            messages: joined,
          }));
        }
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false; //TODO: antipattern BUT do not have a better solution yet for sockets
  }

  render() {
    return (
      <>
        <Appbar.Header>
          <Appbar.BackAction
            onPress={() => this.props.navigation.goBack(null)}
          />
          <Appbar.Content
            title={
              this.props.route.params.firstName +
              " " +
              this.props.route.params.lastName
            }
            subtitle={
              `This is your ` +
              (this.props.route.params.consultant ? "consultant" : "client")
            }
          />
          <Appbar.Action
            icon="dots-vertical"
            onPress={() => this.toggleMenu()}
          />
        </Appbar.Header>

        <Menu
          visible={this.state.menuVisible}
          onDismiss={() => this.toggleMenu()}
          // anchor could be also Appbar.Action button
          // to avoid nesting it into menu, absolute positioning is used
          anchor={{ x: Dimensions.get("window").width, y: 0 }}
        >
          <Menu.Item onPress={() => {}} title="Settings" />
          <Menu.Item onPress={() => {}} title="Search" />
          <Menu.Item onPress={() => {}} title="Block" />
          <Menu.Item onPress={() => {}} title="Report" />
          <Menu.Item onPress={() => {}} title="Media Links Docs" />
          <Menu.Item onPress={() => {}} title="Add to homescreen" />
          <Menu.Item onPress={() => {}} title="Mute notifications" />
          <Divider />
          <Menu.Item
            onPress={() => {
              this.props.navigation.navigate("ViewOffer", {
                ...this.state,
                ...this.props,
                accept: this.acceptOffer,
              });
              this.toggleMenu();
            }}
            title="View offer"
          />
        </Menu>

        <View style={{ flexDirection: "column" }}>
          {this.state.offer === null || this.state.offer.accepted ? (
            <>
              <FlatList
                data={this.state.messages}
                style={styles.messagesContainer}
                inverted={true}
                refreshControl={
                  <RefreshControl
                    // colors={["#9Bd35A", "#689F38"]}
                    refreshing={this.state.isFetching}
                    onRefresh={() => this.onRefresh()}
                  />
                }
                renderItem={({ item }) => (
                  <Message {...this.props} data={item} />
                )}
                keyExtractor={(item) => item.id}
              />
            </>
          ) : (
            <OfferMessage
              {...this.props}
              data={this.state.offer}
              accept={() => this.acceptOffer()}
              reject={() => this.props.navigation.goBack(null)}
              thisIsMyClient={this.state.thisIsMyClient}
            />
          )}
        </View>

        <View style={styles.bottom_container}>
          <RecordButton
            {...this.props}
            chatId={this.props.route.params.id}
            toggleOfferDialog={this.toggleOfferDialog}
          />

          {/*{this.state.isFetching ? null*/}
          {/*    :*/}
          {/*    (this.state.offer === null || this.state.offer.accepted ?*/}
          {/*            <>*/}

          {/*                /!*TODO: this causes a mem leak!!! /*/}
          {/*                */}

          {/*            </> :*/}
          {/*            null*/}
          {/*    )}*/}
        </View>

        <Portal>
          <Dialog
            visible={this.state.offerEndLifeCycleDialog}
            onDismiss={this.toggleOfferDialog}
          >
            <Dialog.Title>Your chat has ended</Dialog.Title>
            <Dialog.Content>
              <Paragraph>
                You need to start a new offer in case you are interested to
                continue this conversation
              </Paragraph>
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
    height: "20%",
  },
  messagesContainer: {
    height: "80%",
  },
});
