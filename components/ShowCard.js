import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const screenWidth = Dimensions.get("screen").width;

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
      <View style={styles.checkBox}>
        <TouchableOpacity onPress={() => pressHandler("checked")}>
          <Ionicons
            name="checkmark"
            color={showState.checked ? "black" : "white"}
            size={32}
          />
        </TouchableOpacity>
      </View>
      {/* Wrapped image and title together in a view */}
      <View style={{ flexDirection: "row" }}>
        <View style={styles.imagePlaceHolder} />
        {/* Try using screenWidth * X for width values here and the button container below */}
        <View style={{ width: screenWidth * (1 / 3) }}>
          {/* numberOfLines makes the text truncate with a ... */}
          <Text numberOfLines={1}>Avengers: End Game</Text>
          <Text numberOfLines={1}>I am inevitable</Text>
        </View>
      </View>

      {/* By wrapping the buttons in their own container we can mess with the width values of the title and buttons seperately */}
      <View
        style={{
          flexDirection: "row",
          width: 100, //* use screenWidth * X
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity onPress={() => pressHandler("favorited")}>
          <Ionicons
            name={showState.favorited ? "heart" : "heart-outline"}
            color="red"
            size={28}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => pressHandler("sent")}>
          <Ionicons name="send" color="orange" size={28} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => pressHandler("reminded")}>
          <Ionicons
            name={showState.reminded ? "alarm" : "alarm-outline"}
            color="blue"
            size={28}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 10,
    margin: 10,
    height: 60,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.5,
    elevation: 10,
  },
  imagePlaceHolder: {
    borderRadius: 25,
    borderWidth: 25,
    marginRight: 5,
  },
  checkBox: {
    borderRadius: 3,
    borderWidth: 1,
    marginRight: 10,
  },

  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 10,
  },
});

export default ShowCard;
