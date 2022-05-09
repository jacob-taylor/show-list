import { useEffect, useState } from "react";
import * as Linking from "expo-linking";

// React Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Redux
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider, useSelector, useDispatch } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PersistGate } from "redux-persist/integration/react";
import ReduxThunk from "redux-thunk";

// Reducers
import userReducer from "./state/reducers/user";

// Actions
import { fetchShows } from "./state/actions/user";

// Components
import HomeScreen from "./screens/HomeScreen";
import SettingsScreen from "./screens/SettingsScreen";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";

import { Ionicons } from "@expo/vector-icons";
import { registerForPushNotificationsAsync } from "./utils";

const rootReducer = combineReducers({
  user: userReducer,
});

// Middleware: Redux Persist Config
const persistConfig = {
  // Root
  key: "root",
  // Storage Method (React Native)
  storage: AsyncStorage,
  // Whitelist (Save Specific Reducers)
  whitelist: ["user"],
  // Blacklist (Don't Save Specific Reducers)
  blacklist: [],
};

// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(ReduxThunk));
// const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

// Middleware: Redux Persist Persister
const persistor = persistStore(store);

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const LoginStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerTitle: "", headerTransparent: true }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ headerTitle: "", headerTransparent: true }}
      />
    </Stack.Navigator>
  );
};

const TabScreen = ({ incomingShow, setIncomingShow }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "list" : "list-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        // tabBarStyle: { height: 100 },
        tabBarHideOnKeyboard: true,
      })}
    >
      <Tab.Screen name="Home" options={{ headerShown: false }}>
        {() => (
          <HomeScreen
            incomingShow={incomingShow}
            setIncomingShow={setIncomingShow}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  const [incomingShow, setIncomingShow] = useState(null);

  const handleUrl = ({ url }) => {
    const { path, queryParams } = Linking.parse(url);
    const { showId, media } = queryParams;

    if (
      path === "info" &&
      showId !== "null" &&
      (media === "movie" || media === "tv")
    ) {
      console.log("Valid link shared, opening incoming show", showId);

      setIncomingShow({
        id: showId,
        mediaType: media,
      });
    }
  };

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    Linking.addEventListener("url", handleUrl);
    if (user.loggedIn) {
      console.log("User logged in, running startup jobs");
      registerForPushNotificationsAsync();
      dispatch(fetchShows());
    }
  }, [user.loggedIn]);

  return (
    <NavigationContainer>
      {user.loggedIn ? (
        <TabScreen
          incomingShow={incomingShow}
          setIncomingShow={setIncomingShow}
        />
      ) : (
        <LoginStackScreen />
      )}
    </NavigationContainer>
  );
};

export default function AppWrapper() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
}
