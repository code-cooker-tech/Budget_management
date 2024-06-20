import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { handleSignIn, storeData, getInfo } from '../config/db';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';


export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const onSignInPress = async () => {
    setError('');
    setErrorEmail('');
    setErrorPassword('');
    await AsyncStorage.clear();

    if (!(email && password)) {
      setErrorEmail('Please enter the email');
      setErrorPassword('Please enter the password');
      return;
    }

    const result = await handleSignIn(email, password);

    if (result.error) {
      setError(result.error);
    } else {
      await storeData('user_token', result);
      router.navigate('/(drawer)/(tabs)/myincome');
    }
  };

  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-[#fdf4ff]">
      <View className="w-full max-w-xs p-6 bg-[#fdf4ff] rounded-xl shadow-lg">
        <Text className="text-3xl font-bold mb-4 text-center text-[#d946ef]">Welcome</Text>
        <Text className="text-lg font-bold mb-10 text-center text-[#d946ef]">Commercial Bank of Ethiopia</Text>
        {error && <Text className="text-sm text-center text-red-700 mb-4">{error}</Text>}

        <View className="mb-5 pl-2 relative flex-row items-center border border-gray-300 rounded-lg overflow-hidden">
          <Ionicons name="mail-outline" size={20} color="gray" className="absolute left-3 " />
          <TextInput
            className="w-full pl-4 pr-4 py-2 border-l-2 border-gray-300 ml-2"
            placeholder="Email"
            keyboardType="email-address"
            placeholderTextColor="gray-500"
            onChangeText={(text) => setEmail(text)}
            autoComplete="off"
          />
        </View>
        {errorEmail && <Text className="text-xs text-red-700 mt-1 mb-4">{errorEmail}</Text>}

        <View className="mb-6 relative pl-2 flex-row items-center border border-gray-300 rounded-lg overflow-hidden">
          <Ionicons name="key-outline" size={20} color="gray" className="absolute left-3" />
          <TextInput
            className="w-full pl-4 pr-2 border-l-2 border-gray-300  py-2 ml-2 "
            placeholder="Password"
            secureTextEntry={!showPassword}
            placeholderTextColor="gray-500"
            onChangeText={(text) => setPassword(text)}
            autoComplete="off"
          />
          <TouchableOpacity
            className="absolute right-3"
            onPress={() => setShowPassword(!showPassword)}
          >
            <Ionicons name={showPassword ? "eye-off" : "eye"} size={20} color="gray" />
          </TouchableOpacity>
        </View>
        {errorPassword && <Text className="text-xs text-red-700 mt-1 mb-4">{errorPassword}</Text>}

        <TouchableOpacity className="bg-[#d946ef] rounded-lg py-2 shadow-md" onPress={onSignInPress}>
          <Text className="text-white text-center font-semibold text-lg">Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
