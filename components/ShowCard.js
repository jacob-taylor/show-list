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
import RatingModal from "./modals/RatingModal";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useSelector } from "react-redux";

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

const ShowCard = ({ show, showIndex, removeShowFromList }) => {
  const initialCardState = {
    checked: show.watched,
    favorited: show.favorited,
    reminded: !!show.reminder_date,
  };
  const [cardState, setCardState] = useState(initialCardState);
  const [pickerVisible, setPickerVisible] = useState(false);
  const [reminderDate, setReminderDate] = useState(new Date());
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [ratingModalVisible, setRatingModalVisible] = useState(false);

  const onDateChange = (selectedDate) => {
    setPickerVisible(false);
    setReminderDate(selectedDate);
  };

  //TODO: Check for sent and return conditional before it gets to the card state better to wait until date picker working
  const pressHandler = (press) => {
    if (press === "checked" && !cardState.checked) {
      setRatingModalVisible(true);
    }

    setCardState((cardState) => {
      return { ...cardState, [press]: !cardState[press] };
    });
  };

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.85}
      onPress={() => {
        setInfoModalVisible(true);
      }}
    >
      <View style={styles.checkBox}>
        <TouchableOpacity onPress={() => pressHandler("checked")}>
          <Ionicons
            name="checkmark"
            color={cardState.checked ? "black" : "white"}
            size={32}
          />
        </TouchableOpacity>
      </View>
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

        <View
          style={{
            width: screenWidth * 0.3,
            justifyContent: "center",
            marginLeft: 10,
          }}
        >
          <Text numberOfLines={1}>{show.title}</Text>
          <Text numberOfLines={1}>{show.date}</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          width: screenWidth * 0.3,
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity onPress={() => pressHandler("favorited")}>
          <Ionicons
            name={cardState.favorited ? "heart" : "heart-outline"}
            color="red"
            size={28}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => pressHandler("sent")}>
          <Ionicons name="send" color="orange" size={28} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setPickerVisible(true)}>
          <Ionicons
            name={cardState.reminded ? "alarm" : "alarm-outline"}
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
      <RatingModal
        modalVisible={ratingModalVisible}
        setModalVisible={setRatingModalVisible}
        show={show}
      />
      <DateTimePickerModal
        isVisible={pickerVisible}
        mode="date"
        date={reminderDate}
        onConfirm={onDateChange}
        onCancel={() => {
          setPickerVisible(false);
        }}
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
    height: screenHeight * 0.1,
    width: 60,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 10,
  },
});

export default ShowCard;
