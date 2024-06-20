import React from 'react';
import { Switch, Text, View } from 'react-native';

export const SettingsSection = () => {
    const [darkThemeEnabled, setDarkThemeEnabled] = React.useState(false);
    const [language, setLanguage] = React.useState('en');
  
    return (
      <View className="mb-4">
        <Text className="text-lg font-bold mb-2">Application Settings</Text>
        <View className="flex-row justify-between mb-2">
          <Text>Dark Theme</Text>
          <Switch value={darkThemeEnabled} onValueChange={setDarkThemeEnabled} />
        </View>
        <View className="flex-row justify-between">
          <Text>Language</Text>
          <Switch value={language === 'en'} onValueChange={(value) => setLanguage(value ? 'en' : 'es')} />
        </View>
      </View>
    );
  };