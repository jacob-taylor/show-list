import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { EMAIL_PATTERN } from "./constants";

export const isEmailValid = (email) => EMAIL_PATTERN.test(email);

export const registerForPushNotificationsAsync = async () => {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      return;
    }
    token = (
      await Notifications.getExpoPushTokenAsync({
        experienceId: "@the-list-group/the-list",
      })
    ).data;
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
};

export const getDateWithNoTime = (date = new Date()) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};
