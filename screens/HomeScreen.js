import { useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import ShowCard from "./ShowCard";

const HomeScreen = () => {
  const shows = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  const initialShowState = shows.map((show) => ({
    checked: false,
    favorited: false,
    sent: false,
    reminded: false,
  }));

  const [showState, setShowState] = useState(initialShowState);

  return (
    <View style={styles.container}>
      <View>
        <Text>THE LIST</Text>
      </View>
      <View>
        {/* TODO: Implement Search Bar */}
        <Text>Searchbar Placeholder</Text>
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
    justifyContent: "center",
  },
});

export default HomeScreen;
