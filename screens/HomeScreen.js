import { StyleSheet, Text, View, ScrollView } from "react-native";
import ShowCard from "./ShowCard";

const HomeScreen = () => {
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
        <ShowCard />
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
