import { View, Text, Button } from 'react-native'
import React from 'react'
import {Link} from 'expo-router';

export default function MyBugdetCard({type,amount,currency,icon,location}) {
  return (
    <View className="flex-1 bg-[#e879f9] border-2 border-[#d946ef] mb-6 rounded-xl p-3 ">
        <Text className="font-bold text-lg text-black font-san">
          {type}
        </Text>
    <View className="grid grid-cols-4">
            <View className="row-span-1 flex flex-row py-3">
              <Text className="flex-1 items-center justify-center text-3xl font-semibold text-white">{location}</Text>
              <Text className="text-center text-3xl font-semibold text-white">{icon}</Text>
            </View>
            <View className="row-span-2 flex flex-row">
              {parseFloat(amount) > 0 ? <Text className="text-3xl text-green-500 font-extrabold">+</Text> : <Text className="text-3xl text-red-500 font-extrabold">-</Text>}
              <Text className="text-red text-5xl">{parseFloat(amount) > 0 ? amount : amount.slice(1)}</Text>
              <Text className="pt-4 pl-2 font-bold text-[#fde047]">{currency}</Text>
            </View>
    </View>
  </View>
  )
}