import { useEffect, useState } from "react";
import { StyleSheet, RefreshControl, View } from "react-native";

import DraggableFlatList, {
  ScaleDecorator,
} from "react-native-draggable-flatlist";

import { useDispatch } from "react-redux";
import { editShowsOrder, fetchShows } from "../state/actions/user";

import ShowCard from "../components/ShowCard";

const ShowList = ({ type, showList, setSelectedShow, setInfoModalVisible }) => {
  const showListByType = showList.filter((s) => s.media_type === type);

  const [refreshing, setRefreshing] = useState(false);
  const [showListOrder, setShowListOrder] = useState(showListByType);

  const dispatch = useDispatch();

  useEffect(() => {
    // Keeps the on screen state in line with the redux/DB state when store is updated
    setShowListOrder(showList.filter((s) => s.media_type === type));
  }, [showList]);

  const handleDragEnd = ({ data }) => {
    // Updates on screen order quickly
    setShowListOrder(data.map((s, i) => ({ ...s, order: i })));
    // Saves the new order in the DB
    const shows = data.map((s, i) => ({ _id: s._id, order: i }));
    dispatch(editShowsOrder(shows));
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
        // borderWidth: 1,
        // borderColor: "blue",
        flex: 1,
      }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      data={showListOrder
        .filter((s) => !s.watched)
        .sort((a, b) => a.order > b.order)}
      renderItem={renderShowCard}
      keyExtractor={(item) => item._id}
      onDragEnd={handleDragEnd}
    />
  );
};

const styles = StyleSheet.create({});

export default ShowList;
