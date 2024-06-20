import React from 'react';
import {  Switch, Text, View } from 'react-native';

export const NotificationsSection = () => {
  const [recurringIncomeEnabled, setRecurringIncomeEnabled] = React.useState(false);
  const [budgetDeadlineEnabled, setBudgetDeadlineEnabled] = React.useState(false);


  return (
    <View className="mb-4">
      <Text className="text-lg font-bold mb-2">Notifications</Text>
      <View className="flex-row justify-between mb-2">
        <Text>Recurring Income Notifications</Text>
        <Switch value={recurringIncomeEnabled} onValueChange={setRecurringIncomeEnabled} />
      </View>
      <View className="flex-row justify-between">
        <Text>Budget Deadline Notifications</Text>
        <Switch value={budgetDeadlineEnabled} onValueChange={setBudgetDeadlineEnabled} />
      </View>
    </View>
  );
};