import React, { useEffect, useState ,useLayoutEffect } from 'react';
import { ScrollView, SafeAreaView, View, Text, ActivityIndicator, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../config/supabaseDB';
import EndBudgetAccordionItem from '../../components/EndBudgetAccordionItem';
import { useNavigation } from '@react-navigation/native';

const EndBudget = () => {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Closed Budget', 
    });
  }, [navigation]);

  const fetchUserToken = async () => {
    try {
      const retrievedValue = await AsyncStorage.getItem("user_token");
      const uuid = JSON.parse(retrievedValue);
      return uuid.session.user.id;
    } catch (err) {
      console.error('Error retrieving user token:', err);
      throw new Error('Could not retrieve user token');
    }
  };



  
  const fetchBudgets = async (userId) => {
    try {
      const { data: budgetData, error: budgetError } = await supabase
        .from('Budget')
        .select('*')
        .eq('uuid', userId)
        .lte('endDate', new Date().toISOString());

      if (budgetError) throw new Error(budgetError.message);
      return budgetData;
    } catch (err) {
      console.error('Error fetching budgets:', err.message);
      throw err;
    }
  };

  const fetchCategories = async (budgetId) => {
    try {
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('Categories')
        .select('*')
        .eq('budget_id', budgetId);

      if (categoriesError) throw new Error(categoriesError.message);
      return categoriesData;
    } catch (err) {
      console.error('Error fetching categories:', err.message);
      throw err;
    }
  };

  const loadBudgets = async () => {
    setLoading(true);
    setError(null);

    try {
      const userId = await fetchUserToken();
      const budgetData = await fetchBudgets(userId);

      if (budgetData.length > 0) {
        const budgetsWithCategories = await Promise.all(
          budgetData.map(async (budget) => {
            const categories = await fetchCategories(budget.id);
            return { ...budget, categories };
          })
        );
        setBudgets(budgetsWithCategories);
      } else {
        setBudgets([]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadBudgets();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    loadBudgets();
  };

  if (loading && !refreshing) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fdf4ff' }}>
      <ScrollView
        style={{ flex: 1, padding: 10 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        }
      >
        {error ? (
          <Text style={{ color: 'red' }}>{error}</Text>
        ) : budgets.length > 0 ? (
          budgets.map((budget, index) => (
            <EndBudgetAccordionItem key={index} budget={budget} handleRefresh={handleRefresh} />
          ))
        ) : (
          <Text className="text-center mt-44 ">No closed budgets found.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default EndBudget;
