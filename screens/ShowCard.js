import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// TODO: Format card to look more appealing,, and make heart icon change on press
const ShowCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.showCard}>
        <View style={styles.imagePlaceHolder} />
        <Text>Title{"\n"}Subtitle</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity>
            <Ionicons name="heart" color="black" size={24} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="send" color="black" size={24} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="alarm" color="black" size={24} />
          </TouchableOpacity>
        </View>
      </View>
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
  showCard: {
    flexDirection: "row",
    marginBottom: 30,
    height: 60,
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 50,
    borderWidth: 0.2,
    width: 300,
    padding: 11,
  },
  imagePlaceHolder: {
    borderRadius: 25,
    borderWidth: 25,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default ShowCard;
