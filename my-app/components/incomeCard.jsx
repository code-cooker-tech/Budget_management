import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import {Link} from 'expo-router';
import { Ionicons } from '@expo/vector-icons';


export default function IncomeCard({type,amount,currency,icon,location,name,toggleVisibility,show}) {
  return (
    <View className="flex-1 bg-[#e879f9] border-2 border-[#d946ef] shadow-2xl shadow-[#fde047] rounded-xl p-3 ">
        <Text className="font-bold text-lg text-black font-san">
          {type}
        </Text>
    <View className="grid grid-cols-4 mt-3">
            <View className="row-span-2 flex flex-row">
              {parseFloat(amount) > 0 || typeof amount === "string" ? <Text className="text-3xl text-green-500 font-extrabold">+</Text> : <Text className="text-3xl text-red-500 font-extrabold">-</Text>}
              <Text className="text-red text-5xl">{parseFloat(amount) > 0 ? amount : amount.slice(1)}</Text>
              <Text className="pt-4 pl-2 font-bold text-[#fde047]">{currency}</Text>
              <TouchableOpacity className="flex-1 ml-3" onPress={() => toggleVisibility(location)}>
                  <Ionicons name={show ? "eye-off" : "eye"} size={24} color="black" />
              </TouchableOpacity>
            </View>
            <View className="row-span-1 flex flex-row py-3">
              <Text className="flex-1 items-center justify-center text-xl font-semibold text-white">{location}</Text>
              <Text className="text-center text-3xl font-semibold text-white">{icon}</Text>
            </View>
    </View>
  </View>
  )
}