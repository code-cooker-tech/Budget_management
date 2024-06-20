import React, { useEffect, useState } from 'react';
import { ScrollView, SafeAreaView, View, Text, ActivityIndicator, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BudgetAccordionItem from '../../../../components/BudgetAccordionItem';
import { supabase } from '../../../config/supabaseDB';

const MyBudgetScreen = () => {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchBudgets = async () => {
    try {
      const retrievedValue = await AsyncStorage.getItem("user_token");
      const uuid = JSON.parse(retrievedValue);
      const userId = uuid.session.user.id;

      console.log(userId);

      const { data: budgetData, error: budgetError } = await supabase
        .from('Budget')
        .select('*')
        .eq('uuid', userId)
        .gt('endDate', new Date().toISOString());

      if (budgetError) {
        console.error('Error fetching budgets:', budgetError.message);
      } else {
        if (budgetData.length > 0) {
          const budgetsWithCategories = await Promise.all(budgetData.map(async budget => {
            const { data: categoriesData, error: categoriesError } = await supabase
              .from('Categories')
              .select('*')
              .eq('budget_id', budget.id);

            if (categoriesError) {
              console.error('Error fetching categories:', categoriesError.message);
              return { ...budget, categories: [] };
            } else {
              return { ...budget, categories: categoriesData };
            }
          }));

          setBudgets(budgetsWithCategories);
        } else {
          console.warn('No budget found for this user.');
        }
      }
    } catch (error) {
      console.error('Error retrieving user token:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchBudgets();
  };

  if (loading && !refreshing) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#fdf4ff]">
      <ScrollView
        className="flex-1 p-2.5"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        }
      >
        {budgets.length > 0 ? (
          budgets.map((budget, index) => (
            <BudgetAccordionItem key={index} budget={budget} />
          ))
        ) : (
          <Text>No budgets found.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyBudgetScreen;
