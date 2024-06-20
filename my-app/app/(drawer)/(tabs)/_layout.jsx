import { View, Text, Button } from 'react-native'
import React from 'react'
import { Tabs, router } from 'expo-router'
import { Feather, AntDesign } from '@expo/vector-icons';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from "expo-status-bar";



export default function _layout() {
  return (
  
         <Tabs screenOptions={{headerLeft: () => <DrawerToggleButton tintColor='#000' />,
   
   tabBarActiveTintColor: "#facc15",
   tabBarInactiveTintColor: "#d6d3d1",
   tabBarShowLabel: true,
   tabBarStyle: {
     backgroundColor: "#c026d3",
     borderTopWidth: 0,
     borderTopColor: "#f8fafc",
     height: 65,
   },
   headerStyle: {
    backgroundColor: "#c026d3",
    
  }
  }}
   >
    <Tabs.Screen name='myincome' options={{
      tabBarIcon: ({ color, focused }) => (
        <MaterialIcons name="account-balance" size={24} color={color} focused={focused} />
      ),
            tabBarLabelStyle: {
        fontWeight: 'bold',
        fontSize: 12,
        paddingBottom: 10,
      },
      tabBarLabel: 'My Account',
      headerTitle: 'My Account',
    }} />

    <Tabs.Screen name='setbugdet' options={{
      tabBarIcon: ({ color, focused }) => (
        <MaterialCommunityIcons name="cash-minus" size={24} color={color} focused={focused} />
      ),
            tabBarLabelStyle: {
        fontWeight: 'bold',
        fontSize: 12,
        paddingBottom: 10,
      },
      tabBarLabel: 'Set bugdet',
      headerTitle: 'Set bugdet'
    }} />
    <Tabs.Screen name='setincome' options={{
      tabBarIcon: ({ color, focused }) => (
        <MaterialCommunityIcons name="cash-plus" size={24} color={color} focused={focused} />
      ),
            tabBarLabelStyle: {
        fontWeight: 'bold',
        fontSize: 12,
        paddingBottom: 10,
      },
      tabBarLabel: 'Set Income',
      headerTitle: 'Set Income'
      
    }} />
    
    <Tabs.Screen name='(MyBugdet)' options={{
      tabBarIcon: ({ color, focused }) => (
        <MaterialCommunityIcons name="account-cash" size={24} color={color} focused={focused} />
      ),
      tabBarLabel: 'My budget',
      headerTitle: 'My budget',
      tabBarLabelStyle: {
        fontWeight: 'bold',
        fontSize: 12,
        paddingBottom: 10,
      },
    }} />
   </Tabs>

  )
}