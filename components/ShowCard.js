import { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ShowCard = ({ showState, setShowState, showIndex }) => {
  const pressHandler = (press) => {
    setShowState((showState) =>
      showState.map((show, i) => {
        if (showIndex === i) {
          return { ...show, [press]: !show[press] };
        }
        return show;
      })
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <View style={styles.checkBox}>
          <TouchableOpacity onPress={() => pressHandler("checked")}>
            <Ionicons
              name="checkmark"
              color={showState.checked ? "black" : "white"}
              size={32}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.showCard}>
          <View style={styles.imagePlaceHolder} />
          <Text>Title{"\n"}Subtitle</Text>
          <TouchableOpacity onPress={() => pressHandler("favorited")}>
            <Ionicons
              name={showState.favorited ? "heart" : "heart-outline"}
              color="red"
              size={32}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => pressHandler("sent")}>
            <Ionicons name="send" color="orange" size={32} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => pressHandler("reminded")}>
            <Ionicons
              name={showState.reminded ? "alarm" : "alarm-outline"}
              color="blue"
              size={32}
            />
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
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 1,
    borderWidth: 0.2,
    width: 300,
    height: 60,
    padding: 10,
    marginLeft: 20,
  },
  imagePlaceHolder: {
    borderRadius: 25,
    borderWidth: 25,
  },
  checkBox: {
    borderRadius: 3,
    borderWidth: 1,
  },

  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 10,
  },
});

export default ShowCard;
