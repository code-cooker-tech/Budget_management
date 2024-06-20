import React ,{useState} from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Text, TextInput, View, TouchableOpacity, Alert } from 'react-native';
import { supabase } from '../app/config/supabaseDB';
import { getInfo } from '../app/config/db';
import {useRouter, Link, useNavigation, useRootNavigation } from 'expo-router';



export const ChangePasswordSection = () => {
    const [oldPassword, setOldPassword] = React.useState('');
    const [newPassword, setNewPassword] = React.useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleChangePassword = async () => {
      console.log(oldPassword, newPassword)
      const info = await getInfo('user_token')
      console.log(info.email)
      console.log("object")


        const { error: signInError } = await supabase.auth.signInWithPassword({
            email: info.email,
            password: oldPassword,
        });

        if (signInError) {
            Alert.alert('Error', 'Old password is incorrect');
            return;
        }

        // Update password
        const { error: updateError } = await supabase.auth.updateUser({ password: newPassword });

        if (updateError) {
            Alert.alert('Error', updateError.message);
        } else {
            Alert.alert('Success', 'Password updated successfully');
            setOldPassword('');
            setNewPassword('');
        }
    };

    return (
        <View className="mb-4">
          <View className="mb-6 relative pl-2 flex-row items-center border border-gray-300 rounded-lg overflow-hidden">
          <Ionicons name="key-outline" size={20} color="gray" className="absolute left-3" />
          <TextInput
            className="w-full pl-4 pr-2 border-l-2 border-gray-300  py-2 ml-2 "
            placeholder="Old Password"
            secureTextEntry={!showPassword}
            placeholderTextColor="gray-500"
            onChangeText={(text) => setOldPassword(text)}
            autoComplete="off"
          />
          <TouchableOpacity
            className="absolute right-3"
            onPress={() => setShowPassword(!showPassword)}
          >
            <Ionicons name={showPassword ? "eye-off" : "eye"} size={20} color="gray" />
          </TouchableOpacity>
        </View>
        <View className="mb-6 relative pl-2 flex-row items-center border border-gray-300 rounded-lg overflow-hidden">
          <Ionicons name="key-outline" size={20} color="gray" className="absolute left-3" />
          <TextInput
            className="w-full pl-4 pr-2 border-l-2 border-gray-300  py-2 ml-2 "
            placeholder="New Password"
            secureTextEntry={!showPassword}
            placeholderTextColor="gray-500"
            onChangeText={(text) => setNewPassword(text)}
            autoComplete="off"
          />
          <TouchableOpacity
            className="absolute right-3"
            onPress={() => setShowPassword(!showPassword)}
          >
            <Ionicons name={showPassword ? "eye-off" : "eye"} size={20} color="gray" />
          </TouchableOpacity>
        </View>
            <TouchableOpacity className="bg-[#d946ef] rounded py-2" onPress={handleChangePassword}>
                <Text className="text-white text-center font-semibold">Change Password</Text>
            </TouchableOpacity>
        </View>
    );
};

export const LogoutSection = () => {

  const navigation = useNavigation();
  
    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Error logging out:', error.message);
        } else {
          navigation.navigate('index')
            console.log('Logged out successfully');

        }
    };

    return (
        <View className="mt-4">
            <TouchableOpacity className="bg-red-600 rounded py-2" onPress={handleLogout}>
                <Text className="text-white text-center font-semibold">Log out</Text>
            </TouchableOpacity>
        </View>
    );
};
