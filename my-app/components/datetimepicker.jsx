import React, { useState } from 'react';
import { View, TouchableOpacity, Platform, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const SchedulePicker = ({ label, date, setDate }) => {
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <View>
      <Text className="font-bold text-lg mb-2">{label}</Text>
      <Text className="text-xs  text-green-700 my-2">{date.toString()}</Text>
      <TouchableOpacity  onPress={showDatepicker} className="bg-[#d946ef] py-3 rounded-lg mb-4">
      <Text className="text-center text-white font-bold">Select the schedule </Text>
      </TouchableOpacity>
      {/* <TouchableOpacity  onPress={showTimepicker} className="bg-[#d946ef] py-3 rounded-lg mb-4">
        <Text className="text-center text-white font-bold">O` clock </Text>
      </TouchableOpacity> */}
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default SchedulePicker;
