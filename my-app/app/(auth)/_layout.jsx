import { View, Text, Button } from "react-native";
import React from "react";
import { Stack, router } from "expo-router";

export default function _layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "red",
        },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen name="signin" options={{ headerShown:false}}
      />
      <Stack.Screen name="signup" options={{ headerShown: false }} />
    </Stack>
  );
}
