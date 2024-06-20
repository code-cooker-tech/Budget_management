import { View, Text, Button } from "react-native";
import React,{useEffect} from "react";
import { Stack, router } from "expo-router";

export default function _layout() {

  return (
    <Stack
    
      screenOptions={{
        headerStyle: {
          backgroundColor: "blue",
        },
        headerTintColor: "white",
        
      }}
      initialRouteName="index"
    >
    <Stack.Screen
      name="index"
      options={{
          headerShown:false,
      }}
    />
      {/* <Stack.Screen name="aim" options={{ headerShown: false }} /> */}
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
    </Stack>
  );
}
