import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { MOVIEDB_POSTER_URL } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import InfoModal from "./modals/InfoModal";

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

const ShowCard = ({ show, setShowState, showIndex, removeShowFromList }) => {
  const [infoModalVisible, setInfoModalVisible] = useState(false);

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
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.85}
      onLongPress={() => {
        setInfoModalVisible(true);
      }}
    >
      <View style={styles.checkBox}>
        <TouchableOpacity onPress={() => pressHandler("checked")}>
          <Ionicons
            name="checkmark"
            color={show.checked ? "black" : "white"}
            size={32}
          />
        </TouchableOpacity>
      </View>
      {/* Wrapped image and title together in a view */}
      <View style={{ flexDirection: "row" }}>
        <Image
          source={
            show.poster || show.backdrop
              ? {
                  uri: MOVIEDB_POSTER_URL + (show.poster || show.backdrop),
                }
              : require("../assets/empty-poster.png")
          }
          style={styles.streamingImg}
        />

        {/* Try using screenWidth * X for width values here and the button container below */}
        <View
          style={{
            width: screenWidth * 0.3,
            justifyContent: "center",
            marginLeft: 10,
          }}
        >
          {/* numberOfLines makes the text truncate with a ... */}
          <Text numberOfLines={1}>{show.title}</Text>
          <Text numberOfLines={1}>{show.date}</Text>
        </View>
      </View>

      {/* By wrapping the buttons in their own container we can mess with the width values of the title and buttons seperately */}
      <View
        style={{
          flexDirection: "row",
          width: screenWidth * 0.3,
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity onPress={() => pressHandler("favorited")}>
          <Ionicons
            name={show.favorited ? "heart" : "heart-outline"}
            color="red"
            size={28}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => pressHandler("sent")}>
          <Ionicons name="send" color="orange" size={28} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => pressHandler("reminded")}>
          <Ionicons
            name={show.reminded ? "alarm" : "alarm-outline"}
            color="blue"
            size={28}
          />
        </TouchableOpacity>
      </View>
      <InfoModal
        modalVisible={infoModalVisible}
        setModalVisible={setInfoModalVisible}
        info={show}
        onList={true}
        removeShowFromList={removeShowFromList}
      />
    </TouchableOpacity>
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
    height: screenHeight * 0.1,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.5,
    elevation: 10,
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
  streamingImg: {
    height: 80,
    width: 60,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 10,
  },
});

export default ShowCard;
