/*
 * Course: MAD201-01
 * Project: 2
 * Name: Ashish Prajapati
 * Student ID: A00194842
 * Description: Dashboard displaying totals and balance.
 */

import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useBudget } from '../context/BudgetContext';

export default function HomeScreen() {
  const { totalIncome, totalExpense, balance, currency, conversionRate, theme } = useBudget();
  
  const isDark = theme === 'dark';
  const containerStyle = { backgroundColor: isDark ? '#2f3640' : '#f5f6fa' };
  const textStyle = { color: isDark ? '#fff' : '#2c3e50' };

  const format = (amount: number) => {
    return (amount * conversionRate).toFixed(2) + ' ' + currency;
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, containerStyle]}>
      <Text style={[styles.header, textStyle]}>Budget Overview</Text>

      <View style={[styles.card, { backgroundColor: '#3498db' }]}>
        <Text style={styles.cardLabel}>Current Balance</Text>
        <Text style={styles.cardValue}>{format(balance)}</Text>
      </View>

      <View style={styles.row}>
        <View style={[styles.card, { backgroundColor: '#27ae60', flex: 1, marginRight: 10 }]}>
          <Text style={styles.cardLabel}>Income</Text>
          <Text style={styles.cardValue}>{format(totalIncome)}</Text>
        </View>
        <View style={[styles.card, { backgroundColor: '#c0392b', flex: 1 }]}>
          <Text style={styles.cardLabel}>Expenses</Text>
          <Text style={styles.cardValue}>{format(totalExpense)}</Text>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.addButton} 
        onPress={() => router.push('/AddTransactionScreen')}
      >
        <Text style={styles.btnText}>+ Add Transaction</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  card: { padding: 20, borderRadius: 15, marginBottom: 15, justifyContent: 'center', alignItems: 'center' },
  cardLabel: { color: 'rgba(255,255,255,0.8)', fontSize: 16 },
  cardValue: { color: '#fff', fontSize: 24, fontWeight: 'bold', marginTop: 5 },
  row: { flexDirection: 'row', marginBottom: 20 },
  addButton: { backgroundColor: '#2980b9', padding: 15, borderRadius: 10, alignItems: 'center' },
  btnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});