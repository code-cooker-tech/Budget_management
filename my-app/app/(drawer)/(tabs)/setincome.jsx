import React, { useState } from 'react';
import { View, Text, TextInput, SafeAreaView, ScrollView, TouchableOpacity, Alert } from 'react-native';
import CustomTextInput from '../../../components/textinputSetBudget';
import { Picker } from '@react-native-picker/picker';
import SchedulePicker from '../../../components/datetimepicker';
import { saveIncomedb } from '../../config/Incomedb';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SetIncome = () => {
  const [incomeSourceName, setIncomeSourceName] = useState('');
  const [amount, setAmount] = useState('');
  const [exchange, setExchange] = useState('CBE');
  const [dateReceived, setDateReceived] = useState(new Date());
  const [notes, setNotes] = useState('');
  const [frequency, setFrequency] = useState('Daily');
  const [incomeType, setIncomeType] = useState('One-Time');

  const saveIncome = async () => {
    if (!incomeSourceName || !amount || !exchange || !dateReceived || !incomeType) {
      Alert.alert('Missing Information', 'Please fill in all required fields.');
      return;
    }

    try {
      const retrievedValue = await AsyncStorage.getItem("user_token");
      const uuid = JSON.parse(retrievedValue);
      const userId = uuid.session.user.id;

      await saveIncomedb({
        incomeSourceName,
        amount,
        exchange,
        dateReceived,
        notes,
        frequency,
        incomeType,
        userId
      });

      setIncomeSourceName('');
      setAmount('');
      setExchange('CBE');
      setDateReceived(new Date());
      setNotes('');
      setFrequency('Daily');
      setIncomeType('One-Time');

      Alert.alert('Set Income','Income Saved Successfully');

    } catch (error) {
      Alert.alert('Error', 'Failed to save income');
      console.error('Error saving income:', error.message);
    }
  };

  const cancelBudget=()=>{
    setIncomeSourceName('');
    setAmount('');
    setExchange('CBE');
    setDateReceived(new Date());
    setNotes('');
    setFrequency('Daily');
    setIncomeType('One-Time');
  }

  return (
    <SafeAreaView className="flex-1 bg-[#fdf4ff]">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-4 pb-5">
        <Text className="font-bold text-2xl mb-12 mt-6">Set Income</Text>

        <CustomTextInput
          placeholder="Income Source Name"
          Style="mb-4 border-2 px-3 rounded-lg h-12 border-[#d946ef] text-lg"
          value={incomeSourceName}
          onChangeText={setIncomeSourceName}
        />

        <CustomTextInput
          placeholder="Amount"
          Style="mb-4 border-2 px-3 rounded-lg h-12 border-[#d946ef] text-lg"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />

        <Text className="font-bold text-lg mb-2">Exchange</Text>
        <Picker
          selectedValue={exchange}
          onValueChange={(itemValue) => setExchange(itemValue)}
          className="mb-4 border-2 px-3 rounded-lg h-12 border-[#d946ef] text-lg"
        >
          <Picker.Item label="Wallet" value="Wallet" />
          <Picker.Item label="CBE" value="CBE" />
          <Picker.Item label="Telegram" value="Telegram" />
        </Picker>

        <Text className="font-bold text-lg mb-2">Income Type</Text>
        <Picker
          selectedValue={incomeType}
          onValueChange={(itemValue) => setIncomeType(itemValue)}
          className="mb-4 border-2 px-3 rounded-lg h-12 border-[#d946ef] text-lg"
        >
          <Picker.Item label="One-Time" value="One-Time" />
          <Picker.Item label="Recurring" value="Recurring" />
        </Picker>

        {incomeType === 'Recurring' && (
          <>
            <Text className="font-bold text-lg mb-2">Frequency</Text>
            <Picker
              selectedValue={frequency}
              onValueChange={(itemValue) => setFrequency(itemValue)}
              className="mb-4 border-2 px-3 rounded-lg h-12 border-[#d946ef] text-lg"
            >
              <Picker.Item label="Daily" value="Daily" />
              <Picker.Item label="Weekly" value="Weekly" />
              <Picker.Item label="Monthly" value="Monthly" />
            </Picker>
          </>
        )}

        <SchedulePicker label="Date Received" date={dateReceived} setDate={setDateReceived} />

        <CustomTextInput
          placeholder="Notes"
          Style="mb-4 border-2 px-3 rounded-lg h-20 border-[#d946ef] text-lg"
          value={notes}
          onChangeText={setNotes}
          multiline
        />

        <TouchableOpacity onPress={saveIncome} className="bg-[#d946ef] py-3 rounded-lg mb-4">
          <Text className="text-center text-white font-bold">Save Income</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={cancelBudget} className="bg-red-400 py-3 rounded-lg mb-4">
          <Text className="text-center text-white font-bold">Cancel</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SetIncome;
