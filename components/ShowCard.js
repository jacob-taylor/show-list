import { useEffect, useState } from "react";
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
import RatingModal from "./modals/RatingModal";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useDispatch } from "react-redux";
import { editShow } from "../state/actions/user";

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

const ShowCard = ({ show, cardPressHandler }) => {
  const dispatch = useDispatch();

  const initialCardState = {
    watched: show?.watched,
    favorited: show?.favorited,
    reminder_date: show?.reminder_date,
    rating: show?.rating,
  };

  const [cardState, setCardState] = useState(initialCardState);
  const [pickerVisible, setPickerVisible] = useState(false);
  const [ratingModalVisible, setRatingModalVisible] = useState(false);

  const isCardStateEqual = () => {
    return (
      initialCardState.favorited === cardState.favorited &&
      initialCardState.watched === cardState.watched &&
      initialCardState.reminder_date === cardState.reminder_date &&
      initialCardState.rating === cardState.rating
    );
  };

  useEffect(() => {
    if (!isCardStateEqual()) {
      dispatch(
        editShow({
          id: show.id,
          ...cardState,
        })
      );
    }
  }, [cardState]);

  const onDateChange = (selectedDate) => {
    setPickerVisible(false);
    setCardState((cardState) => ({
      ...cardState,
      reminder_date: selectedDate,
    }));
  };

  const watchedHandler = () => {
    if (!cardState.watched) {
      setRatingModalVisible(true);
    }
    setCardState((cardState) => ({
      ...cardState,
      watched: !cardState.watched,
    }));
  };

  const favoriteHandler = () => {
    setCardState((cardState) => {
      return { ...cardState, favorited: !cardState.favorited };
    });
  };

  const ratingHandler = (num) => {
    setCardState((cardState) => ({
      ...cardState,
      rating: num,
    }));
  };

  const sendHandler = () => {};

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.85}
      onPress={cardPressHandler}
    >
      <View style={styles.checkBox}>
        <TouchableOpacity onPress={watchedHandler}>
          <Ionicons
            name="checkmark"
            color={cardState.watched ? "black" : "white"}
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
        <TouchableOpacity onPress={favoriteHandler}>
          <Ionicons
            name={cardState.favorited ? "heart" : "heart-outline"}
            color="red"
            size={28}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={sendHandler}>
          <Ionicons name="send" color="orange" size={28} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setPickerVisible(true)}>
          <Ionicons
            name={
              new Date(Date.parse(cardState.reminder_date)) > new Date()
                ? "alarm"
                : "alarm-outline"
            }
            color="blue"
            size={28}
          />
        </TouchableOpacity>
      </View>
      <RatingModal
        modalVisible={ratingModalVisible}
        setModalVisible={setRatingModalVisible}
        show={show}
        cardState={cardState}
        ratingHandler={ratingHandler}
      />
      <DateTimePickerModal
        isVisible={pickerVisible}
        mode="date"
        date={
          cardState.reminder_date
            ? new Date(Date.parse(cardState.reminder_date))
            : new Date()
        }
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
