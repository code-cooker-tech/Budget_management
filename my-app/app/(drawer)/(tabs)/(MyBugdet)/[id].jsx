import React, { useEffect, useState, useMemo } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as Progress from 'react-native-progress';
import ExpenseModal from "../../../../components/expenseModal";
import { supabase } from "../../../config/supabaseDB";

export default function Page() {
  const { id, budget } = useLocalSearchParams();
  const router = useRouter();
  const budgetData = useMemo(() => JSON.parse(budget), [budget]);
  const [progress, setProgress] = useState({});
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedBudgetExchange, setSelectedBudgetExchange] = useState(null);
  const [remainAmount, setRemainAmount] = useState('');

  useEffect(() => {
    calculateProgress();
  }, [budgetData.amount]);

  const toggleModal = (categoryId, budgetExchange, remainAmount) => {
    console.log("the remain amount in toggle", remainAmount);
    setSelectedCategoryId(categoryId);
    setSelectedBudgetExchange(budgetExchange);
    setRemainAmount(remainAmount);
    setModalVisible(!isModalVisible);
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
      router.back();
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

  const calculateProgress = () => {
    const progressValues = {};
    budgetData.categories.forEach((category) => {
      const remain = parseFloat(category.remain);
      const amount = parseFloat(category.amount);
      const remainingRate = amount === 0 ? 0 : remain / amount; 
      const progressColor = remainingRate >= 0.7 ? 'green' : remainingRate >= 0.3 ? 'yellow' : 'red';
      progressValues[category.item] = { rate: isNaN(remainingRate) ? 0 : remainingRate, color: progressColor };
    });
    setProgress(progressValues);
  };

  return (
    <View style={{ shadowColor: '#b48e3c', shadowOpacity: 0.25, shadowRadius: 3.84 }} className="shadow-md rounded-lg justify-center mt-7 p-4">
      <Text className="font-bold text-lg mb-2 text-center bg-[#b48e3c] w-full rounded-md py-2">{budgetData.budgetName}</Text>
      <Text className="text-base mb-1">Total Amount: {budgetData.total_amount}</Text>
      <Text className="text-base mb-1">Exchange: {budgetData.exchange}</Text>
      <Text className="text-base mb-1">Start Date: {budgetData.startDate}</Text>
      <Text className="text-base mb-1">End Date: {budgetData.endDate}</Text>
      <Text className="text-base mb-2">Notes: {budgetData.notes}</Text>
      <View className="mt-3">
        <Text className="font-semibold text-lg mb-2">Categories</Text>
        {budgetData.categories.map((category, index) => (
          <View key={index} className="mt-2">
            <View className="flex-row justify-between items-center">
              <Text className="flex-1">{category.item}</Text>
              <Text className='flex-1 text-red-500 underline text-center' onPress={() => toggleModal(category.id, budgetData.exchange, category.remain)}>expense</Text>
              <Text className="flex-1 text-green-700 text-end"><Text className="text-[#f59e0b]">{category.remain}</Text> / {category.amount}</Text>
            </View>
            <Progress.Bar 
              progress={progress[category.item]?.rate} 
              width={null} 
              color={progress[category.item]?.color} 
              unfilledColor="lightgrey" 
              borderWidth={0}
              height={10}
              borderRadius={5}
              style={{ marginTop: 5 }}
            />
          </View>
        ))}
      </View>
      <View className="flex flex-row justify-between">
        <TouchableOpacity onPress={() => router.back()} className="mt-4">
          <Text className="text-blue-700 underline font-medium">Go Back</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => confirmDelete(budgetData.id)} className="mt-4">
          <Text className="text-red-700 underline font-medium">Delete</Text>
        </TouchableOpacity>
      </View>
      <ExpenseModal 
        isModalVisible={isModalVisible} 
        setModalVisible={setModalVisible} 
        toggleModal={toggleModal} 
        remainAmountData={remainAmount} 
        categoryId={selectedCategoryId}
        exchange={selectedBudgetExchange}
      />
    </View>
  );
}
