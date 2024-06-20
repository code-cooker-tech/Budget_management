import React from 'react';
import { SafeAreaView, ScrollView} from 'react-native';
import { NotificationsSection } from '../../components/NotificationsSection';
import { SettingsSection } from '../../components/SettingsSection';
import { ChangePasswordSection, LogoutSection } from '../../components/ProfileManagement';



const Settings = () => {
  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="p-4">
        <NotificationsSection />
        <SettingsSection />
        <ChangePasswordSection />
        <LogoutSection />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;
