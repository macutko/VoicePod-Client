import React, { useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { ActivityIndicator, Appbar } from "react-native-paper";
import SwitchSelector from "react-native-switch-selector";
import { searchUserAPI } from "../../api/user/searchUserAPI";
import SearchboxCustom from "../../components/molecules/SearchTab/SearchboxCustom";
import UserCard from "../../components/molecules/SearchTab/UserCard";
import { colorScheme } from "../../constants/Colors";

export const SearchTab = (props) => {
    const [isFetching, setIsFetching] = useState(false);
    // the search query is an empty string so it does a search on that
    // havent decided yet whether that is good or not
    // pros: no empty screen
    // cons: might be a security issue
    const [searchQuery, setSearchQuery] = useState("");
    const [results, setResults] = useState([]);
    const _isMounted = useRef(true);

    useEffect(() => {
        return () => {
            _isMounted.current = false;
        };
    }, []);

    const onChangeSearch = (e) => {
        if (_isMounted) {
            setSearchQuery(e);
            setIsFetching(true);
        }
    };

    const clearInput = () => {
        setSearchQuery("");
    };

    useEffect(() => {
        if (isFetching) {
            searchUserAPI({
                socket: props.socket,
                data: { searchQuery: searchQuery },
            })
                .then((r) => {
                    if (_isMounted) {
                        setResults(r);
                        setIsFetching(false);
                    }
                })
                .catch((e) => (_isMounted ? setIsFetching(false) : null));
        }
    }, [isFetching]);

    const options = [
        {
            label: "",
            value: "1",
            imageIcon: require("../../assets/images/users-icon.png"),
        },
        {
            label: "",
            value: "1",
            imageIcon: require("../../assets/images/dolar-icon.png"),
        },
    ];

    //   const options = [
    //     { label: "Standard", value: "standard"},
    //     { label: "Business", value: "busines"},
    //   ];

    return (
        <>
            <Appbar.Header statusBarHeight={0}>
                <View style={styles.appbarContainer}>
                    <SearchboxCustom
                        onChangeText={onChangeSearch}
                        value={searchQuery}
                        placeholder={"Search"}
                        clearInput={() => clearInput()}
                    />
                    <View style={styles.switch}>
                        <SwitchSelector
                            options={options}
                            initial={0}
                            onPress={(value) =>
                                console.log(`Call onPress with value: ${value}`)
                            }
                            textColor={colorScheme.background} //'#7a44cf'
                            selectedColor={colorScheme.background}
                            buttonColor={colorScheme.accent}
                            borderColor={colorScheme.background}
                            height={30}
                            imageStyle={{
                                flex: 0.6,
                                resizeMode: "contain",
                                marginBottom: 1,
                            }}
                            hasPadding
                        />
                    </View>
                </View>
            </Appbar.Header>

            <View style={styles.container}>
                {!isFetching ? (
                    <FlatList
                        data={results}
                        renderItem={({ item, index }) => (
                            <UserCard
                                user={item}
                                key={index}
                                onPress={() => {
                                    props.navigation.push("UserProfile", {
                                        ...item,
                                    });
                                }}
                            />
                        )}
                        keyExtractor={(item) => item.username}
                    />
                ) : (
                    <ActivityIndicator
                        animating={true}
                        color={colorScheme.accent}
                        style={styles.activityIndicator}
                    />
                )}
            </View>
        </>
    );
};

export default SearchTab;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
    },
    appbarContainer: {
        // width: "100%",
        flex: 1,
        paddingRight: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    activityIndicator: {
        marginTop: "50%",
    },
    switch: {
        width: 70,
    },
});
