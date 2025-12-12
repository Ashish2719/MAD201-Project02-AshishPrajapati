/*
 * Course: MAD201-01
 * Project: 2
 * Name: Ashish Prajapati
 * Student ID: A00194842
 * Description: Root Stack Navigator using BudgetTabs as the main screen.
 */

import { Stack } from 'expo-router';
import React from 'react';
import { BudgetProvider } from './context/BudgetContext';


export default function RootLayout() {
  return (
    <BudgetProvider>
      <Stack screenOptions={{ headerShown: false }}>
        
        <Stack.Screen name="index" />
      
        <Stack.Screen 
            name="screens/BudgetTabs" 
            options={{ headerShown: false }}
        />
        
        
        <Stack.Screen 
          name="AddTransactionScreen" 
          options={{ title: 'Add Transaction', presentation: 'modal', headerShown: true }} 
        />
        
        
         <Stack.Screen 
          name="screens/HomeScreen" 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="screens/TransactionsScreen" 
          options={{ headerShown: true, title: 'Transaction History' }} 
        />
        <Stack.Screen 
          name="screens/ReportsScreen" 
          options={{ headerShown: true, title: 'Reports & Summary' }} 
        />
        <Stack.Screen 
          name="screens/SettingsScreen" 
          options={{ headerShown: true, title: 'Settings' }} 
        />
        
      </Stack>
    </BudgetProvider>
  );
}