import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../app/config/supabaseDB';

const MyIncomeCard = ({ income, onDelete }) => {
  const { id, incomeSourceName, amount, currency, incomeType, dateReceived, notes } = income;

  return (
    <View className="bg-white rounded-lg p-4 mb-2 shadow-md">
      <View className="flex-row mb-1.5">
        <Text className="text-sm font-bold text-gray-600 w-30">Income Source:</Text>
        <Text className="text-sm text-gray-800">{incomeSourceName}</Text>
      </View>
      <View className="flex-row mb-1.5">
        <Text className="text-sm font-bold text-gray-600 w-30">Amount:</Text>
        <Text className="text-sm text-gray-800">{amount} {currency}</Text>
      </View>
      <View className="flex-row mb-1.5">
        <Text className="text-sm font-bold text-gray-600 w-30">Type:</Text>
        <Text className="text-sm text-gray-800">{incomeType}</Text>
      </View>
      <View className="flex-row mb-1.5">
        <Text className="text-sm font-bold text-gray-600 w-30">Date Received:</Text>
        <Text className="text-sm text-gray-800">{new Date(dateReceived).toLocaleDateString()}</Text>
      </View>
      {notes && (
        <View className="flex-row mb-1.5">
          <Text className="text-sm font-bold text-gray-600 w-30">Notes:</Text>
          <Text className="text-sm text-gray-800">{notes}</Text>
        </View>
      )}
      <TouchableOpacity className="absolute top-2.5 right-2.5" onPress={() => onDelete(id)}>
        <Ionicons name="trash-outline" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );
};

export default MyIncomeCard;
