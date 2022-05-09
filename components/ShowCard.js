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
import { getDateWithNoTime } from "../utils";

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

const ShowCard = ({ show, cardPressHandler }) => {
  const dispatch = useDispatch();

  const initialCardState = {
    favorited: show?.favorited,
    reminder_date: show?.reminder_date,
    rating: show?.rating,
  };

  const [cardState, setCardState] = useState(initialCardState);
  const [watchedState, setWatchedState] = useState(show?.watched);
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
      console.log("Something changed, editing show", show.title);
      dispatch(
        editShow({
          _id: show._id,
          ...cardState,
        })
      );
    }
  }, [cardState]);

  useEffect(() => {
    if (show && !watchedState && cardState.rating !== 0) {
      console.log("watchedState changed, editing show", show.title);
      dispatch(
        editShow({
          _id: show._id,
          watched: watchedState,
        })
      );
    }
  }, [watchedState]);

  const onDateChange = (selectedDate) => {
    console.log(selectedDate);

    setPickerVisible(false);
    setCardState((cardState) => ({
      ...cardState,
      reminder_date: selectedDate,
    }));
  };

  const watchedHandler = () => {
    if (!watchedState) {
      setRatingModalVisible(true);
    }
    setWatchedState(!watchedState);
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
      watched: !cardState.watched,
    }));
  };

  const sendHandler = () => {};

  if (!show) {
    return <View></View>;
  }
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
            color={watchedState ? "black" : "white"}
            size={32}
          />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Image
          source={
            show?.poster || show?.backdrop
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
              getDateWithNoTime(new Date(cardState.reminder_date)).getDate() >=
              getDateWithNoTime().getDate()
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
            ? getDateWithNoTime(new Date(cardState.reminder_date))
            : getDateWithNoTime()
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
