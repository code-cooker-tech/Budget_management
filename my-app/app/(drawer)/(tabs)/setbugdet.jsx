import React, { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import CustomTextInput from '../../../components/textinputSetBudget';
import { Picker } from '@react-native-picker/picker';
import SchedulePicker from '../../../components/datetimepicker';
import { saveBudgetdb } from '../../config/Budgetdb';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SetBudgetScreen = () => {
  const [budgetName, setBudgetName] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [exchange, setExchange] = useState('CBE');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [notes, setNotes] = useState('');
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [categories, setCategories] = useState([]);

  const addCategory = () => {
    if (name && amount) {
      setCategories([...categories, { name, amount }]);
      setName('');
      setAmount('');
    }
  };

  const handleCategoryChange = (field, value) => {
    if (field === 'amount') {
      setAmount(value);
    } else {
      setName(value);
    }
  };

  const deleteCategory = (index) => {
    setCategories(categories.filter((_, i) => i !== index));
  };

  const saveBudget = async () => {
    if (!budgetName || !totalAmount || !startDate || !endDate || categories.length === 0) {
      Alert.alert('Missing Information', 'Please fill in all required fields and add at least one category.');
      return;
    }

    try {
      const retrievedValue = await AsyncStorage.getItem("user_token");
      const uuid = JSON.parse(retrievedValue);
      const userId = uuid.session.user.id;

      console.log({ budgetName, totalAmount, exchange, startDate, endDate, notes, categories, userId });

      await saveBudgetdb({ budgetName, totalAmount, exchange, startDate, endDate, notes, categories, userId });

      setBudgetName('');
      setTotalAmount('');
      setExchange('CBE');
      setStartDate(new Date());
      setEndDate(new Date());
      setNotes('');
      setName('');
      setAmount('');
      setCategories([]);

      Alert.alert('Budget Saved Successfully');
      console.log('Budget and Categories saved successfully!');

    } catch (error) {
      Alert.alert('Error', 'Failed to save budget and categories');
      console.error('Error saving budget and categories:', error.message);
    }
  };

  const cancelBudget = () => {
    setBudgetName('');
    setTotalAmount('');
    setExchange('CBE');
    setStartDate(new Date());
    setEndDate(new Date());
    setNotes('');
    setName('');
    setAmount('');
    setCategories([]);
  };


  return (
    <SafeAreaView className="flex-1 bg-[#fdf4ff]">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-4 pb-5">
        <Text className="font-bold text-2xl mb-12 mt-6">Set Budget</Text>
        
        <CustomTextInput
          placeholder="Budget Name"
          value={budgetName}
          onChangeText={setBudgetName}
          Style="mb-4 border-2 px-3 rounded-lg h-12 border-[#d946ef] text-lg"
        />
        
        <CustomTextInput
          placeholder="Total Amount"
          value={totalAmount}
          onChangeText={setTotalAmount}
          keyboardType="numeric"
          Style="mb-4 border-2 px-3 rounded-lg h-12 border-[#d946ef] text-lg"
        />
        
        <Picker
          selectedValue={exchange}
          onValueChange={(itemValue) => setExchange(itemValue)}
          style={{ marginBottom: 20 }}
        >
          <Picker.Item label="Wallet" value="Wallet" />
          <Picker.Item label="Telegram" value="Telegram" />
          <Picker.Item label="CBE" value="CBE" />
        </Picker>

        <SchedulePicker label="Start Date" date={startDate} setDate={setStartDate} />
        <SchedulePicker label="End Date" date={endDate} setDate={setEndDate} />
        
        <Text className="font-bold">Categories</Text>
        
        {categories.map((category, index) => (
          <TouchableOpacity key={index} onPress={() => deleteCategory(index)}>
            <View className="flex justify-center items-center flex-row mb-4">
              <Text className="font-bold text-lg pr-6">{category.name}</Text>
              <Text className="font-bold text-lg pr-6 text-green-700">{category.amount}</Text>
            </View>
          </TouchableOpacity>
        ))}
        
        <View className="mb-6">
          <CustomTextInput
            value={name}
            placeholder="Category Name"
            onChangeText={(value) => handleCategoryChange('name', value)}
            Style="mb-4 border-2 px-3 rounded-lg h-12 border-[#d946ef] text-lg"
          />
          <CustomTextInput
            value={amount}
            placeholder="Amount"
            onChangeText={(value) => handleCategoryChange('amount', value)}
            keyboardType="numeric"
            Style="mb-4 border-2 px-3 rounded-lg h-12 border-[#d946ef] text-lg"
          />
        </View>
        
        <TouchableOpacity onPress={addCategory} className="bg-[#d946ef] py-3 rounded-lg mb-4">
          <Text className="text-center text-white font-bold">Add Category</Text>
        </TouchableOpacity>
        
        <CustomTextInput
          placeholder="Notes"
          value={notes}
          onChangeText={setNotes}
          multiline
          Style="mb-4 border-2 px-3 rounded-lg h-20 mt-12 border-[#d946ef] text-lg"
        />
        
        <TouchableOpacity onPress={saveBudget} className="bg-[#d946ef] py-3 rounded-lg mb-4">
          <Text className="text-center text-white font-bold">Save Budget</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={cancelBudget} className="bg-red-400 py-3 rounded-lg mb-4">
          <Text className="text-center text-white font-bold">Cancel</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SetBudgetScreen;