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
  // Noting here that the shows array and initalShowState will not be used once this app is done
  const initialShowState = shows.map((show) => ({
    checked: false,
    favorited: false,
    sent: false,
    reminded: false,
  }));

  // this can probably just be a string by itself, no need to make a whole object for one property
  const initialSearchState = {
    search: "",
  };

  const initialResState = [];

  const [showState, setShowState] = useState(initialShowState);
  const [searchState, setSearchState] = useState(initialSearchState);
  const [resState, setResState] = useState(initialResState);

  useEffect(() => {
    //if searchstate is not an empty string do fetch, else clear resState
    fetch(
      MOVIEDB_API_URL +
        "search/multi?api_key=" +
        MOVIEDB_API_KEY +
        "&query=" +
        searchState
    ) // * Great job on formatting this endpoint and doing the promises
      .then((response) => response.json())
      .then((res) => {
        const resInfo = res.results.map((mov) => {
          const info = {};
          // So this is totally a valid way to create an object, but in my opinion it's not as straight forward as just returning the object straight out of the function
          // I think part of it is just less typing/code but also it's less variables to deal with in the long run.
          // Also mapping over an array is so common that you'll be doing this exact code so much that all this extra isn't needed eventually.
          // * again this is totally valid, the main part is you figured it out and it works just as good! All my notes are just code optimization of how I like things
          info.id = mov.id;
          info.media_type = mov.media_type;
          info.poster = mov.poster_path;
          info.title = mov.title;
          info.release_date = mov.date;

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
        <SearchResults resState={resState} />
        {/* Create dropdwo with CSS, potentially use absolute positon so the results don't 
          move the LIST 
            PRO TIP- inline style, if any letters in search state then show if empty hide
        
            Notes on what is to come with the <SearchResults /> component.
            When a user presses a result it should automatically be put into
            the list of Showcards (added to the shows state). And the list should 
            disappear to show the list of Showcards again. Eventually this will 
            also be saved in a DB but for now it should all be done with state
            since the DB save will be an after affect of the state change anyway.
      */}
      </View>

      <ScrollView>
        {/* I feel like we should be mapping over showState here
            instead of the shows array since the shows array is really
            just used to help us test the cards without manually
            adding them from search results */}
        {shows.map((show, index) => (
          <ShowCard
            key={index}
            showIndex={index}
            showState={showState[index]} // mapping over showState will also let us do this
            // showState={show} instead of calling the array interation using the index
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
