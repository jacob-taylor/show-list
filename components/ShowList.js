import { useState } from "react";
import { StyleSheet, RefreshControl, View } from "react-native";

import DraggableFlatList, {
  ScaleDecorator,
} from "react-native-draggable-flatlist";

import { useDispatch } from "react-redux";
import { fetchShows } from "../state/actions/user";

import ShowCard from "../components/ShowCard";

const ShowList = ({ type, showList, setSelectedShow, setInfoModalVisible }) => {
  const [refreshing, setRefreshing] = useState(false);

  const showListByType = showList.filter((s) => s.media_type === type);

  const dispatch = useDispatch();

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

  const renderShowCard = ({ item, drag, isActive }) => {
    return (
      <ScaleDecorator>
        <ShowCard
          key={item._id}
          show={item}
          cardPressHandler={() => {
            setSelectedShow(item);
            setInfoModalVisible(true);
          }}
          longPressHandler={drag}
          isActive={isActive}
        />
      </ScaleDecorator>
    );
  };

  return (
    <DraggableFlatList
      containerStyle={{
        flex: 1,
      }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      data={showListByType.filter((s) => !s.watched)}
      renderItem={renderShowCard}
      keyExtractor={(item) => item._id}
      onDragEnd={({ data }) => {
        console.log("data", data);
      }}
    />
  );
};

const styles = StyleSheet.create({});

export default ShowList;
