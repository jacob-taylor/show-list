import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  SafeAreaView,
  Image,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SearchResults from "../components/SearchResults";
import ShowCard from "../components/ShowCard";
import { MOVIEDB_API_KEY, MOVIEDB_API_URL } from "../constants";

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

const HomeScreen = () => {
  const initialSearchState = "";

  const initialResState = [];

  const [showState, setShowState] = useState([]);
  const [searchState, setSearchState] = useState(initialSearchState);
  const [resState, setResState] = useState(initialResState);

  useEffect(() => {
    if (searchState) {
      fetch(
        MOVIEDB_API_URL +
          "search/multi?api_key=" +
          MOVIEDB_API_KEY +
          "&query=" +
          searchState
      )
        .then((response) => response.json())
        .then((res) => {
          if (res.results.length === 0)
            return setResState([{ title: "No Results Found", id: 0 }]);
          const resInfo = res.results.map((show) => {
            const info = {};
            // So this is totally a valid way to create an object, but in my opinion it's not as straight forward as just returning the object straight out of the function
            // I think part of it is just less typing/code but also it's less variables to deal with in the long run.
            // Also mapping over an array is so common that you'll be doing this exact code so much that all this extra isn't needed eventually.
            // * again this is totally valid, the main part is you figured it out and it works just as good! All my notes are just code optimization of how I like things
            info.id = show.id;
            info.media_type = show.media_type;
            // info.poster = show.poster_path;
            info.poster = show.backdrop_path; // * Switched to backdrop to better accomodate a square aspect ratio in modal
            info.title = show.media_type === "movie" ? show.title : show.name;
            info.date =
              show.media_type === "movie"
                ? show.release_date
                  ? show.release_date.split("-")[0]
                  : ""
                : show.first_air_date
                ? show.first_air_date.split("-")[0]
                : "";

            return info;
          });

          // Some food for thought, this is how I would write this map() function and just be aware of the differences
          // This just takes practice, because after the 100th map() function you write you start to try and see how little you need to for it work

          // const parsedResults = res.results.map((mov) => ({
          //   id: mov.id,
          //   media_type: mov.media_type,
          //   poster: mov.poster_path,
          //   title: mov.title,
          // }));
          // setResState(parsedResults);

          setResState(resInfo); // * This is exactly what I had in mind, nice work
        });
    } else {
      setResState([]);
    }
  }, [searchState]);

  const searchHandler = (search) => {
    setSearchState(search);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../assets/theatre-bg-10.png")}
        style={{
          position: "absolute",
          top: 0,
        }}
      />
      {searchState.length === 0 ? (
        <Image
          source={require("../assets/title.png")}
          style={{ height: screenHeight * 0.15, width: screenWidth * 0.9 }}
        />
      ) : null}
      <View style={styles.searchContainer}>
        <TextInput
          style={{ width: "80%" }}
          placeholder="Search for a Movie or Series..."
          onChangeText={(newText) => searchHandler(newText)}
        />
        <Ionicons name="search-outline" size={30} />
      </View>
      {searchState.length > 0 ? <SearchResults resState={resState} /> : null}
      <ScrollView>
        {showState.map((show, index) => (
          <ShowCard
            key={index}
            showIndex={index}
            showState={show}
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
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 25,
    borderWidth: 0.2,
    width: screenWidth * 0.8,
    height: 50,
    margin: 10,
    backgroundColor: "white",
  },
});

export default HomeScreen;
