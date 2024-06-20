// components/CustomTextInput.js
import React from 'react';
import { TextInput } from 'react-native';

const CustomTextInput = ({ placeholder, value, onChangeText,Style, keyboardType, multiline }) => {
  return (
    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      className={Style}
      keyboardType={keyboardType}
      multiline={multiline}
    />
  );
};

export default CustomTextInput;
