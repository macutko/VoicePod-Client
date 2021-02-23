import React, { useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { ActivityIndicator, Appbar } from "react-native-paper";
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

    return (
        <>
            <Appbar.Header statusBarHeight={0}>
                <SearchboxCustom
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                    placeholder={"Search"}
                    clearInput={() => clearInput()}
                />
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
    activityIndicator: {
        marginTop: "50%",
    },
});
