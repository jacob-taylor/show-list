import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  SafeAreaView,
  Image,
  Dimensions,
  Keyboard,
  RefreshControl,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import SearchResults from "../components/SearchResults";
import ShowCard from "../components/ShowCard";
import { MOVIEDB_API_KEY, MOVIEDB_API_URL } from "../constants";
import { addShow, fetchShows, removeShow } from "../state/actions/user";
import InfoModal from "../components/modals/InfoModal";

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

const HomeScreen = ({ incomingShow, setIncomingShow }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const showList = user.show_list || [];

  const initialSearchState = "";
  const initialResState = [];

  const [searchState, setSearchState] = useState(initialSearchState);
  const [resState, setResState] = useState(initialResState);
  const [selectedShow, setSelectedShow] = useState();
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (incomingShow) {
      const { id, mediaType } = incomingShow;

      fetch(`${MOVIEDB_API_URL}${mediaType}/${id}?api_key=${MOVIEDB_API_KEY}`)
        .then((response) => response.json())
        .then((show) => {
          if (show?.success === false) {
            setIncomingShow(null);
            return Alert.alert("Unable to find movie or show that was shared");
          }

          const showInfo = {
            id: show.id,
            media_type: mediaType,
            poster: show.poster_path,
            backdrop: show.backdrop_path,
            title: mediaType === "movie" ? show.title : show.name,
            date:
              mediaType === "movie"
                ? show.release_date
                  ? show.release_date.split("-")[0]
                  : ""
                : show.first_air_date
                ? show.first_air_date.split("-")[0]
                : "",
            favorited: false,
            watched: false,
            rating: 0,
          };

          if (showList.map((s) => s.id).includes(showInfo.id)) {
            setIncomingShow(null);
            return Alert.alert(`${showInfo.title} is already on your list`);
          }

          setSelectedShow(showInfo);
          setInfoModalVisible(true);
          setIncomingShow(null);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [incomingShow]);

  useEffect(() => {
    if (searchState) {
      fetch(
        MOVIEDB_API_URL +
          "search/multi?api_key=" +
          MOVIEDB_API_KEY +
          "&query=" +
          searchState
      )
        .then((response) => response.json())
        .then((res) => {
          if (res.results.length === 0)
            return setResState([
              {
                title: "No Results Found",
                id: 0,
                date: "(Press To Add Show Manually)",
              },
            ]);
          const resInfo = res.results
            .map((show) => {
              const info = {};

              info.id = show.id;
              info.media_type = show.media_type;
              info.poster = show.poster_path;
              info.backdrop = show.backdrop_path;
              info.title = show.media_type === "movie" ? show.title : show.name;
              info.date =
                show.media_type === "movie"
                  ? show.release_date
                    ? show.release_date.split("-")[0]
                    : ""
                  : show.first_air_date
                  ? show.first_air_date.split("-")[0]
                  : "";
              info.favorited = false;
              info.watched = false;
              info.rating = 0;

              return info;
            })
            .filter((show) => !showList.map((s) => s.id).includes(show.id))
            .filter((show) => show.media_type !== "person");

          setResState(resInfo);
        });
    } else {
      setResState([]);
    }
  }, [searchState]);

  const addShowToList = async (show) => {
    await dispatch(addShow(show));
    setResState([]);
    setSearchState("");
    Keyboard.dismiss();
  };

  const searchHandler = (search) => {
    setSearchState(search);
  };

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(fetchShows())
      .then(() => {
        setRefreshing(false);
      })
      .catch((err) => {
        setRefreshing(false);
        console.log(err);
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <Image
        source={require("../assets/theatre-bg.png")}
        style={{
          flex: 1,
          position: "absolute",
          top: 0,
          bottom: 0,
          width: screenWidth,
          height: screenHeight,
        }}
      />
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.3)",
          position: "absolute",
          top: 0,
          bottom: 0,
          width: screenWidth,
          height: screenHeight,
        }}
        pointerEvents="none"
      ></View>
      <SafeAreaView style={styles.container}>
        {searchState.length === 0 ? (
          <Image
            source={require("../assets/title.png")}
            style={{ height: screenHeight * 0.15, width: screenWidth * 0.9 }}
          />
        ) : null}
        <View style={styles.searchContainer}>
          <TextInput
            style={{ width: "80%", height: "100%" }}
            placeholder="Search for a Movie or Series..."
            placeholderTextColor="gray"
            value={searchState}
            onChangeText={(newText) => searchHandler(newText)}
          />
          <Ionicons name="search-outline" size={30} />
        </View>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {showList
            .filter((s) => !s.watched)
            .map((show) => (
              <ShowCard
                key={show._id}
                show={show}
                cardPressHandler={() => {
                  setSelectedShow(show);
                  setInfoModalVisible(true);
                }}
              />
            ))}
        </ScrollView>
        {searchState.length > 0 ? (
          <SearchResults resState={resState} addShowToList={addShowToList} />
        ) : null}
      </SafeAreaView>
      {infoModalVisible ? (
        <InfoModal
          modalVisible={infoModalVisible}
          setModalVisible={setInfoModalVisible}
          info={selectedShow}
          onList={showList.map((s) => s.id).includes(selectedShow?.id)}
          addShowToList={addShowToList}
          onHomeScreen={true}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    alignItems: "center",
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 25,
    borderWidth: 0.2,
    width: screenWidth * 0.8,
    height: 50,
    margin: 10,
    backgroundColor: "white",
  },
});

export default HomeScreen;
