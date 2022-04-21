import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Modal,
  Image,
  ScrollView,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  MOVIEDB_API_KEY,
  MOVIEDB_API_URL,
  MOVIEDB_POSTER_URL,
  IMDB_URL,
} from "../../constants";

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

const InfoModal = ({
  modalVisible,
  setModalVisible,
  info,
  onList,
  addShowToList,
  removeShowFromList,
  Linking,
}) => {
  const [watchProviders, setWatchProviders] = useState({});
  const [imdbLink, setImdbLink] = useState("");

  // TODO: Think about options for provider priority and ask client
  const DISPLAY_PRIORITY_CUTOFF = 36;

  useEffect(() => {
    if (modalVisible) {
      fetch(
        `${MOVIEDB_API_URL}${info.media_type}/${info.id}/watch/providers?api_key=${MOVIEDB_API_KEY}`
      )
        .then((response) => response.json())
        .then((res) => {
          // TODO: Ask client about other countries for settings down the road
          if (res?.results?.US) setWatchProviders(res.results.US);
        });

      fetch(
        `${MOVIEDB_API_URL}${info.media_type}/${info.id}/external_ids?api_key=${MOVIEDB_API_KEY}`
      )
        .then((response) => response.json())
        .then((res) => {
          if (res?.imdb_id) setImdbLink(`${IMDB_URL}${res.imdb_id}`);
        });
    }
  }, [modalVisible]);

  return (
    <Modal
      visible={modalVisible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <View style={styles.modalView}>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(false);
          }}
          style={styles.closeBtn}
        >
          <Ionicons name="close" color="white" size={30} />
        </TouchableOpacity>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => {
              console.log(imdbLink);
              //Linking.openURL(imdbLink);
            }}
          >
            <Image
              source={
                info.poster || info.backdrop
                  ? {
                      uri: MOVIEDB_POSTER_URL + (info.backdrop || info.poster),
                    }
                  : require("../../assets/empty-poster.png")
              }
              style={styles.streamingImg}
            />
          </TouchableOpacity>
          <Text
            style={{ fontSize: 38, fontWeight: "bold", textAlign: "center" }}
          >
            {info.title}
          </Text>
          <Text style={{ fontSize: 20, textAlign: "center", marginBottom: 10 }}>
            {info.date}
          </Text>
          <ScrollView
            contentContainerStyle={{
              flexDirection: "column",
            }}
            indicatorStyle="black"
          >
            {watchProviders
              ? // TODO: use .sort to sort by key name
                Object.entries(watchProviders)
                  .sort((a, b) => {
                    if (a[0] < b[0]) {
                      return -1;
                    }
                    if (a[0] > b[0]) {
                      return 1;
                    }
                    return 0;
                  })
                  .filter(([key, value]) => key !== "link")
                  .filter(
                    ([key, value]) =>
                      value.filter(
                        (v) => v.display_priority <= DISPLAY_PRIORITY_CUTOFF
                      ).length !== 0
                  )
                  .map(([key, value], index) => {
                    return (
                      <View
                        style={{
                          paddingVertical: 5,
                          width: screenWidth * 0.7,
                        }}
                        key={index}
                      >
                        <Text>{key.toUpperCase()}</Text>
                        <ScrollView
                          horizontal={true}
                          contentContainerStyle={{
                            flexDirection: "column",
                          }}
                          indicatorStyle="black"
                        >
                          <View style={{ flexDirection: "row" }}>
                            {value
                              .filter(
                                (provider) =>
                                  provider.display_priority <=
                                  DISPLAY_PRIORITY_CUTOFF
                              )
                              .map((provider) => {
                                return (
                                  <TouchableOpacity
                                    key={provider.provider_id}
                                    activeOpacity={1}
                                    onPress={() => {
                                      // TODO: Ask if client wants this
                                      // Linking.openURL(watchProviders.link);
                                    }}
                                  >
                                    <Image
                                      source={{
                                        uri:
                                          MOVIEDB_POSTER_URL +
                                          provider.logo_path,
                                      }}
                                      style={{
                                        height: 50,
                                        width: 50,
                                        marginHorizontal: 5,
                                      }}
                                    />
                                  </TouchableOpacity>
                                );
                              })}
                          </View>
                        </ScrollView>
                      </View>
                    );
                  })
              : null}
          </ScrollView>
          {onList ? (
            <TouchableOpacity
              style={[styles.btn, { backgroundColor: "#a4161a" }]}
              onPress={() => {
                removeShowFromList(info);
                setModalVisible(false);
              }}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>
                Remove from List
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.btn, { backgroundColor: "#0044D0" }]}
              onPress={() => {
                addShowToList(info);
              }}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>
                Add to List
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: "white",
    padding: 35,
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  btn: {
    borderRadius: 12,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.5,
    elevation: 10,
    marginTop: 10,
    width: "100%",
  },
  closeBtn: {
    backgroundColor: "black",
    borderRadius: 50,
    alignSelf: "flex-start",
  },
  streamingImg: {
    height: screenHeight * 0.3,
    width: screenWidth * 0.7,
    borderRadius: 20,
    marginTop: 20,
    alignSelf: "center",
  },
});
export default InfoModal;
