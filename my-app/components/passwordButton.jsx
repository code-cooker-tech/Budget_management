import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PasswordInput = ({ placeholder, setPassword }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className="mb-1.5 relative pl-0.5 flex-row items-center border border-gray-400 rounded-lg overflow-hidden">
      <Ionicons name="key-outline" size={20} color="gray" className="absolute left-0.75" />
      <TextInput
        className="flex-1 pl-10 pr-7 border-l-2 border-gray-400"
        placeholder={placeholder || "Password"}
        secureTextEntry={!showPassword}
        placeholderTextColor="gray"
        onChangeText={(text) => setPassword(text)}
        autoCompleteType="password"
      />
      <TouchableOpacity
        className="absolute right-2.5"
        onPress={() => setShowPassword(!showPassword)}
      >
        <Ionicons name={showPassword ? "eye-off" : "eye"} size={20} color="gray" />
      </TouchableOpacity>
    </View>
  );
};

export default PasswordInput;
