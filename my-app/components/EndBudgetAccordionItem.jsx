import React, { useState, } from 'react';
import { LayoutAnimation, Text, TouchableOpacity, View,Alert } from 'react-native';
import { Link } from 'expo-router';
import { supabase } from '../app/config/supabaseDB';

const EndBudgetAccordionItem = ({ budget,handleRefresh }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  const handleDelete = async (id) => {
    const { data, error } = await supabase
      .from('Budget')
      .delete()
      .eq('id', id);

    if (error) {
      console.log(error);
    } else {
      console.log("Deleted budget:", data);
      handleRefresh();
    }
  };

  const confirmDelete = (id) => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this budget?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => handleDelete(id),
          style: "destructive",
        },
      ]
    );
  };

  return (
    <View style={{ shadowColor: '#b48e3c', shadowOpacity: 0.45, shadowRadius: 3.84 }} className="bg-white shadow-md rounded-lg  mt-2">
      <TouchableOpacity onPress={toggleExpand} className="px-4 py-4 bg-[#b48e3c] rounded-md flex-row justify-between items-center border-1 border-[#eee]">
        <Text className="font-bold text-lg">{budget.budgetName}</Text>
        <Text>{expanded ? '-' : '+'}</Text>
      </TouchableOpacity>
      {expanded && (
        <View className="px-4 pb-2">
          <Text className="text-base">Total Amount: {budget.total_amount}</Text>
          <Text className="text-base">Currency: {budget.exchange}</Text>
          <Text className="text-base">Start Date: {budget.startDate}</Text>
          <Text className="text-base">End Date: {budget.endDate}</Text>
          <Text className="text-base">Notes: {budget.notes}</Text>
          <View className="mt-3">
            <Text className="font-semibold text-lg">Categories</Text>
            {budget.categories.map((category, index) => (
              <View key={index} className="flex-row justify-between mt-4">
                <Text>{category.item}</Text>
                <Text className="text-green-700">{category.amount}</Text>
              </View>
            ))}
          </View>
          <View>
          <TouchableOpacity className="bg-red-600 rounded py-2 mt-8" onPress={() => confirmDelete(budget.id)}>
            <Text className="text-white text-center font-semibold" >Delete</Text>
          </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default EndBudgetAccordionItem;
