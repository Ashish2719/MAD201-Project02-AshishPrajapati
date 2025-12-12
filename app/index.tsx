/*
 * Course: MAD201-01
 * Project: 2
* Name: Ashish Prajapati
 * Student ID: A00194842
 * Description: Splash screen that redirects after 2 seconds.
 */

import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export default function SplashScreen() {
  
  useEffect(() => {
    // Navigates to the BudgetTabs screen after 2 seconds
    const timer = setTimeout(() => {
      // Navigate to the file path defined in _layout.tsx
      router.replace('/screens/BudgetTabs'); 
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Smart Budget Tracker By Ashish Prajapati</Text>
      <Text style={styles.title}>💰</Text>
      <Text style={styles.subtitle}>Manage your money wisely</Text>
      <Text style={styles.subtitle}>MAD 201 - Project 2</Text>
      <ActivityIndicator size="large" color="#3498db" style={{ marginTop: 20 }}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#2c3e50', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#7f8c8d' },
});