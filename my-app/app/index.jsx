import React, { useEffect, useRef } from "react";
import { View, Image, Animated } from "react-native";
import icon from "../assets/CBELOGO.png";
import { useNavigation } from "@react-navigation/native";

export default function Splash() {
  const fadeAnimation = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigation.navigate('(auth)')
    }, 3000);

    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    return () => clearTimeout(timeoutId); 
  }, [fadeAnimation, navigation]);    

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Animated.View className={`rounded-lg overflow-hidden opacity-${fadeAnimation}`}>
        <Image className="w-24 h-24" source={icon} />
      </Animated.View>
    </View>
  );
}


