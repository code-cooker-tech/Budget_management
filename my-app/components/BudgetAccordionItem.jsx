import React, { useState } from 'react';
import { LayoutAnimation, Text, TouchableOpacity, View } from 'react-native';
import { Link } from 'expo-router';

const BudgetAccordionItem = ({ budget }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View style={{ shadowColor: '#f0abfc', shadowOpacity: 0.25, shadowRadius: 3.84 }} className="bg-white shadow-md rounded-lg  mt-2">
      <TouchableOpacity onPress={toggleExpand} className="px-4 py-4 flex-row justify-between items-center border-1 border-[#eee] bg-[#e0c955] rounded-xl">
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
          <Link className='mb-12 mt-6 ' href={{ pathname: `/${budget.id}`, params: { budget: JSON.stringify(budget) } }}>
            <Text className="text-blue-700 underline font-medium">Go to details</Text>
          </Link>
        </View>
      )}
    </View>
  );
};

export default BudgetAccordionItem;
