import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Modal,
  ScrollView,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import ShowCard from "../ShowCard";
import InfoModal from "./InfoModal";
import { fetchShows } from "../../state/actions/user";

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

const ShowStatusModal = ({
  modalVisible,
  setModalVisible,
  status,
  setStatus,
}) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const showList = user.show_list || [];
  const title = status === "watched" ? "Previously Wathced" : "My Favorites";

  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedShow, setSelectedShow] = useState();

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
    <Modal
      visible={modalVisible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity
          onPress={() => {
            setStatus("");
            setModalVisible(false);
          }}
          style={styles.closeBtn}
        >
          <Ionicons name="close" color="white" size={30} />
        </TouchableOpacity>
        <Text style={{ fontWeight: "bold", fontSize: 32, padding: 10 }}>
          {title}
        </Text>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {showList
            .filter((s) => s[status])
            .map((show, index) => (
              <ShowCard
                key={index}
                showIndex={index}
                show={show}
                cardPressHandler={() => {
                  setSelectedShow(show);
                  setInfoModalVisible(true);
                }}
              />
            ))}
        </ScrollView>
        {infoModalVisible ? (
          <InfoModal
            modalVisible={infoModalVisible}
            setModalVisible={setInfoModalVisible}
            info={selectedShow}
            onList={showList.map((s) => s.id).includes(selectedShow?.id)}
            //addShowToList={addShowToList}
            onHomeScreen={true}
          />
        ) : null}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: "white",
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  closeBtn: {
    backgroundColor: "black",
    borderRadius: 50,
    alignSelf: "flex-start",
    margin: 10,
  },
});

export default ShowStatusModal;
