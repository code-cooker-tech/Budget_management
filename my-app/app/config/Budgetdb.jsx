import { supabase } from './supabaseDB';
import { Alert } from 'react-native';

export const saveBudgetdb = async ({ budgetName, totalAmount, exchange, startDate, endDate, notes, categories, userId }) => {

  try {
    const budgetInsertData = {
      budgetName,
      total_amount: totalAmount,
      exchange,
      startDate,
      endDate,
      notes,
      uuid: userId
    };

    console.log('Inserting into Budget:', budgetInsertData);

    const { data: budgetData, error: budgetError } = await supabase
      .from('Budget')
      .insert(budgetInsertData)
      .select();

    if (budgetError) {
      console.error('Supabase budget insert error:', budgetError);
      throw budgetError;
    }

    if (!budgetData || budgetData.length === 0) {
      throw new Error('No data returned from insert operation');
    }

    console.log('Insert result:', budgetData);

    const budgetId = budgetData[0].id;

    const categoryInserts = categories.map(category => ({
      item: category.name,
      amount: category.amount,
      budget_id: budgetId,
      remain: category.amount,
      uuid: userId
    }));

    console.log('Inserting into Categories:', categoryInserts);

    const { error: categoryError } = await supabase
      .from('Categories')
      .insert(categoryInserts);

    if (categoryError) {
      console.error('Supabase category insert error:', categoryError);
      throw categoryError;
    }

    console.log('Budget and Categories saved successfully!');
    return "Budget and Categories saved successfully!";

  } catch (error) {
    Alert.alert('Error', 'Failed to save budget and categories');
    console.error('Error saving budget and categories:', error);
  }
};





