import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Alert, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import { supabase } from "../app/config/supabaseDB";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ExpenseModal({ isModalVisible, setModalVisible, toggleModal, categoryId, exchange, remainAmountData }) {
  const [inputValue, setInputValue] = useState('');
  const [localRemainAmount, setLocalRemainAmount] = useState(remainAmountData);

  useEffect(() => {
    if (remainAmountData !== undefined && remainAmountData !== null) {
      setLocalRemainAmount(remainAmountData);
    }

    const storeExchange = async () => {
      try {
        if (exchange) {
          const jsonValue = JSON.stringify(exchange);
          await AsyncStorage.setItem("exchange", jsonValue);
        }
      } catch (error) {
        console.error('Error storing exchange value:', error);
      }
    };

    storeExchange();
  }, [remainAmountData, exchange]);

  const remainAmount = (amount) => {
    const parsedInput = parseFloat(inputValue);
    const parsedAmount = parseFloat(amount);

    if (isNaN(parsedInput) || isNaN(parsedAmount)) {
      return parsedAmount;
    }

    return parsedAmount - parsedInput;
  }

  const changeRemain = async () => {
    try {
      if (parseFloat(inputValue) > parseFloat(localRemainAmount)) {
        Alert.alert(
          "Error",
          "You can't enter more than the remaining amount",
          [{ text: 'OK', onPress: toggleModal }],
          { cancelable: false }
        );
        return;
      }

      const retrievedValue = await AsyncStorage.getItem("user_token");
      if (!retrievedValue) throw new Error('User token not found');

      const uuid = JSON.parse(retrievedValue);
      const userId = uuid.session.user.id;

      const newRemainAmountData = remainAmount(localRemainAmount);
      if (isNaN(newRemainAmountData)) {
        Alert.alert('Error', 'Invalid input value');
        return;
      }

      const { data: categoryData, error: categoryError } = await supabase
        .from('Categories')
        .update({ remain: newRemainAmountData })
        .eq('id', categoryId);

      if (categoryError) {
        console.error('Error updating category:', categoryError.message);
        Alert.alert('Error', 'Error updating category');
        return;
      }

      const exchangeValue = JSON.parse(await AsyncStorage.getItem("exchange"));
      const { data: accountData, error: accountError } = await supabase
        .from('Account')
        .select(exchangeValue)
        .eq('uuid', userId)
        .single();

      if (accountError) {
        console.error('Error fetching account data:', accountError.message);
        Alert.alert('Error', 'Error fetching account data');
        return;
      }

      const updatedAmount = remainAmount(accountData[exchangeValue]);
      if (isNaN(updatedAmount)) {
        Alert.alert('Error', 'Invalid input value');
        return;
      }

      const { data: updatedAccountData, error: updateAccountError } = await supabase
        .from('Account')
        .update({ [exchangeValue]: updatedAmount })
        .eq('uuid', userId);

      if (updateAccountError) {
        console.error('Error updating account data:', updateAccountError.message);
        Alert.alert('Error', 'Error updating account data');
        return;
      }

      Alert.alert('Success', 'Category and account updated successfully', [
        { text: 'OK', onPress: toggleModal }
      ]);
      setInputValue("");
      await AsyncStorage.removeItem("exchange");
    } catch (error) {
      console.error('Error updating category or account:', error.message);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <Modal isVisible={isModalVisible} backdropOpacity={0.3}>
      <View className="bg-gray-50 p-5 rounded-lg">
        <Text className="text-lg font-bold mb-3">Enter Expense</Text>
        <TextInput
          placeholder="Enter amount"
          value={inputValue}
          onChangeText={setInputValue}
          keyboardType="numeric"
          className="mb-4 border-2 px-3 rounded-lg h-12 border-[#d946ef] text-lg"
        />
        <TouchableOpacity onPress={changeRemain} style={{ marginTop: 20 }}>
          <Text className="bg-[#b48e3c] font-semibold rounded-md text-lg text-black text-center">Expense</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleModal} style={{ marginTop: 20 }}>
          <Text className="text-right text-blue-500 font-bold">Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
