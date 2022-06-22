import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  Share,
  Alert,
} from "react-native";
import { MOVIEDB_POSTER_URL, SHARE_URL } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import RatingModal from "./modals/RatingModal";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useDispatch, useSelector } from "react-redux";
import { editShow, editShowReminder } from "../state/actions/user";
import { useNavigation } from "@react-navigation/native";

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

const ShowCard = ({ show, cardPressHandler, longPressHandler, isActive }) => {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const navigation = useNavigation();

  const initialCardState = {
    favorited: show?.favorited,
    rating: show?.rating,
  };

  const [cardState, setCardState] = useState(initialCardState);
  const [watchedState, setWatchedState] = useState(show?.watched);
  const [reminderDate, setReminderDate] = useState(show?.reminder_date);
  const [pickerVisible, setPickerVisible] = useState(false);
  const [ratingModalVisible, setRatingModalVisible] = useState(false);

  const isCardStateEqual = () => {
    return (
      initialCardState.favorited === cardState.favorited &&
      initialCardState.watched === cardState.watched &&
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

  useEffect(() => {
    if (show && reminderDate !== show?.reminder_date) {
      console.log("reminderDate changed, editing show", show.title);
      console.log(reminderDate.toString());
      dispatch(
        editShowReminder({
          _id: show._id,
          reminder_date: reminderDate,
        })
      );
    }
  }, [reminderDate]);

  const onDateChange = (selectedDate) => {
    setReminderDate(selectedDate);
    setPickerVisible(false);
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

  const sendHandler = () => {
    Share.share({
      url: `${SHARE_URL}?id=${show.id}&media=${show.media_type}`,
    });
  };

  const showDatetimeModal = () => {
    console.log("user.push_token", user.push_token);
    if (user.push_token) {
      setPickerVisible(true);
    } else {
      Alert.alert(
        "Push notifications must be enabled to use the reminder function",
        "",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Go to Settings",
            onPress: () => {
              navigation.navigate("Settings");
            },
          },
        ]
      );
    }
  };

  if (!show) {
    return <View></View>;
  }
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.85}
      onPress={cardPressHandler}
      onLongPress={longPressHandler}
      disabled={isActive}
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
        <TouchableOpacity onPress={showDatetimeModal}>
          <Ionicons
            name={
              new Date(reminderDate) >= new Date() ? "alarm" : "alarm-outline"
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
        mode="datetime"
        minuteInterval={15}
        date={reminderDate ? new Date(reminderDate) : new Date()}
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
    marginHorizontal: 10,
    marginVertical: 2,
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
    // borderRadius: 5,
    marginBottom: 10,
    marginTop: 10,
  },
});

export default ShowCard;
