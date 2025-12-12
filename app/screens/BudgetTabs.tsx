/*
 * Course: MAD201-01
 * Project: 2
 * Name: Ashish Prajapati
 * Student ID: A00194842
 * Description: Tab Navigator configuration for Home, History, Reports, and Settings.
 */

import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { useBudget } from '../context/BudgetContext';


import HomeScreen from './HomeScreen';
import ReportsScreen from './ReportsScreen';
import SettingsScreen from './SettingsScreen';
import TransactionsScreen from './TransactionsScreen';

const Tab = createBottomTabNavigator();

export default function BudgetTabs() {
  const { theme } = useBudget();
  const isDark = theme === 'dark';
  const bgColor = isDark ? '#1e272e' : '#fff';
  const activeColor = isDark ? '#4cd137' : '#2980b9';

  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: bgColor },
        headerTintColor: isDark ? '#fff' : '#000',
        tabBarStyle: { backgroundColor: bgColor },
        tabBarActiveTintColor: activeColor,
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ 
          tabBarIcon: ({color}) => <MaterialIcons name="dashboard" size={24} color={color} />
        }} 
      />
      <Tab.Screen 
        name="History" 
        component={TransactionsScreen}
        options={{ 
          tabBarIcon: ({color}) => <MaterialIcons name="list" size={24} color={color} />
        }} 
      />
       <Tab.Screen 
        name="Reports" 
        component={ReportsScreen}
        options={{ 
          tabBarIcon: ({color}) => <MaterialIcons name="pie-chart" size={24} color={color} />
        }} 
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{ 
          tabBarIcon: ({color}) => <MaterialIcons name="settings" size={24} color={color} />
        }} 
      />
    </Tab.Navigator>
  );
}