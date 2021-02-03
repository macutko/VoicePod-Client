import React from "react";
import { Avatar, Divider, List, Searchbar } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import TextInputCustom from "../../components/atoms/TextInputCustom";
import OutlineTopScreen from "../../components/molecules/OutlineTopScreen";

class SearchTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
      results: [],
    };
  }

  onChangeSearch = (e) => {
    this.setState(
      {
        searchQuery: e,
      },
      () => {
        this.props.socket.emit(
          "search",
          { searchQuery: this.state.searchQuery },
          (error, response) => {
            if (error) console.log(`Error in Search ${error}`);
            if (response)
              this.setState({ results: response }, () =>
                console.log(`Length of response object ${response.length}`)
              );
          }
        );
      }
    );
  };

  render() {
    return (
      <OutlineTopScreen title={"Search"}>
        <TextInputCustom
          onChangeText={this.onChangeSearch}
          value={this.state.searchQuery}
          placeholder={"Search"}
        />
        <List.Section>
          {/*TODO: change to flatlist*/}
          {this.state.results.map((object, i) => (
            <View key={`wrapper_${i}`}>
              <List.Item
                titleStyle={styles.profileTitle}
                style={styles.container}
                descriptionStyle={styles.profileDesc}
                onPress={() =>
                  this.props.navigation.push("UserProfile", { ...object })
                }
                title={object.firstName + " " + object.lastName}
                description={object.description}
                descriptionNumberOfLines={2}
                key={i}
                left={(props) => (
                  <List.Icon
                    {...props}
                    style={styles.profilePic}
                    key={`icon_${i}`}
                    icon={(props) => (
                      <Avatar.Image
                        key={`avatar_${i}`}
                        source={{
                          uri: `data:image/${object.pictureType};base64,
                                                                                                  ${object.profilePicture}`,
                        }}
                      />
                    )}
                  />
                )}
              />
              <Divider key={`divider_${i}`} />
            </View>
          ))}
        </List.Section>
      </OutlineTopScreen>
    );
  }
}

export default SearchTab;

const styles = StyleSheet.create({
  container: {},
  profileTitle: {
    paddingLeft: 10,
    fontWeight: "bold",
  },
  profileDesc: {
    paddingLeft: 10,
  },
  profilePic: {
    paddingLeft: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});
