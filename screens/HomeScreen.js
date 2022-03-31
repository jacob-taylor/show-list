import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  SafeAreaView,
} from "react-native";
import SearchResults from "../components/SearchResults";
import ShowCard from "../components/ShowCard";
import { MOVIEDB_API_KEY, MOVIEDB_API_URL } from "../constants";

const HomeScreen = () => {
  const shows = [];

  const initialShowState = shows.map((show) => ({
    checked: false,
    favorited: false,
    sent: false,
    reminded: false,
  }));

  const initialSearchState = {
    search: "",
  };

  const initialResState = [];

  const [showState, setShowState] = useState(initialShowState);
  const [searchState, setSearchState] = useState(initialSearchState);
  const [resState, setResState] = useState(initialResState);

  useEffect(() => {
    fetch(
      MOVIEDB_API_URL +
        "search/multi?api_key=" +
        MOVIEDB_API_KEY +
        "&query=" +
        searchState
    )
      .then((response) => response.json())
      .then((res) => {
        let resInfo = res.results.map((mov, i) => {
          let info = {};
          info.id = mov.id;
          info.media_type = mov.media_type;
          info.poster = mov.poster_path;
          info.title = mov.title;

          return info;
        });
        setResState(resInfo);
      });
  }, [searchState]);

  const searchHandler = (search) => {
    setSearchState(search);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>THE LIST</Text>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search for a Movie or Series..."
          onChangeText={(newText) => searchHandler(newText)}
        />
      </View>
      {/* Added as placeholder to remind me what's next */}
      {/* <SearchResults resState={resState} /> */}
      <ScrollView>
        {shows.map((show, index) => (
          <ShowCard
            key={index}
            showIndex={index}
            showState={showState[index]}
            setShowState={setShowState}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 50,
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    borderWidth: 0.2,
    width: 300,
    height: 50,
    margin: 10,
  },
});

export default HomeScreen;
