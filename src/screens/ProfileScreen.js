import React, { useState } from "react";
import { ScrollView, SafeAreaView, Text, View, StatusBar, Pressable } from "react-native";
import OrderHistory from "../components/profile/OrderHistory";
import ProfileComponent from "../components/profile/ProfileComponent";

const ProfileScreen = ({ navigation, setLoggedIn }) => {
  const [history, setHistory] = useState(false);

  return (
    <ScrollView>
    <SafeAreaView className="flex-1 items-center">
      {history ? (
        <OrderHistory history={history} setHistory={setHistory} />
      ) : (
        <>
        <Text className="font-main text-2xl mb-2">Profile</Text>
        <Pressable className="px-4 py-4 bg-pakistangreen rounded-md" onPress={() => setHistory(!history)}>
          <Text className="text-lemonchiffon font-main"> View Order History </Text>
        </Pressable>
        </>
      )}
      <ProfileComponent setLoggedIn={setLoggedIn}/>
    </SafeAreaView>
    </ScrollView>
  );
};
export default ProfileScreen;
