import { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, TextInput } from "react-native";
import ShowCard from "../components/ShowCard";

const HomeScreen = () => {
  const shows = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  const initialShowState = shows.map((show) => ({
    checked: false,
    favorited: false,
    sent: false,
    reminded: false,
  }));

  const initialSearchState = {
    search: "",
  };

  const [showState, setShowState] = useState(initialShowState);
  const [searchState, setSearchState] = useState(initialSearchState);

  const searchHandler = (search) => {
    setSearchState(search);
  };

  console.log(searchState);
  return (
    <View style={styles.container}>
      <View>
        <Text>THE LIST</Text>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search for a Movie or Series..."
          onChangeText={(newText) => searchHandler(newText)}
        />
      </View>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
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
