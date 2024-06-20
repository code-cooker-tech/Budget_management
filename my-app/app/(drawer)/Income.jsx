import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
  RefreshControl,
  ImageBackground,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { supabase } from '../config/supabaseDB';
import MyIncomeCard from '../../components/MyIncomeCard';

export default function MyIncome() {
  const [incomeData, setIncomeData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const { data, error } = await supabase
        .from('Income')
        .select('*')
        .order('dateReceived', { ascending: false });

      if (error) {
        console.error('Error fetching income data:', error.message);
      } else {
        setIncomeData(data);
      }
    } catch (error) {
      console.error('Error fetching income data:', error.message);
    }
  };

  const DeleteIncome = async (id) => {
    try {
      const { error } = await supabase.from('Income').delete().eq('id', id);
      if (error) {
        console.error('Error deleting income:', error.message);
      } else {
        setIncomeData((prevData) => prevData.filter((income) => income.id !== id));
      }
    } catch (error) {
      console.error('Error deleting income:', error.message);
    }
  }

  const handleDeleteIncome = (id) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this income?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress:() =>  DeleteIncome(id)
        },
      ],
      { cancelable: true }
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData().then(() => setRefreshing(false));
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f6e8f8' }}>
      <StatusBar backgroundColor="#f8fafc" barStyle="dark-content" />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={{ flex: 1 }}>


          <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
            {incomeData.map((income) => (
              <MyIncomeCard key={income.id} income={income} onDelete={handleDeleteIncome} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
