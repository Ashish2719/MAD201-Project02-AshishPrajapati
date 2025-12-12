/*
 * Course: MAD201-01
 * Project: 2
 * Name: Ashish Prajapati
 * Student ID: A00194842
 * Description: List of all transactions with delete option.
 */

import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Alert, FlatList, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Transaction, useBudget } from '../context/BudgetContext';

/**
 * TransactionsScreen component.
 * Displays all recorded transactions using a FlatList. (Requirement: Transactions List)
 * Includes a delete button for each item.
 */

export default function TransactionsScreen() {
  const { transactions, deleteTransaction, theme, currency, conversionRate } = useBudget();
  const isDark = theme === 'dark';

  const handleDelete = (id: string) => {
    if (Platform.OS === 'web') {
        if (window.confirm("Delete this transaction?")) deleteTransaction(id);
    } else {
        Alert.alert("Delete", "Are you sure?", [
            { text: "Cancel" },
            { text: "Delete", style: 'destructive', onPress: () => deleteTransaction(id) }
        ]);
    }
  };

  const renderItem = ({ item }: { item: Transaction }) => (
    <View style={[styles.item, { backgroundColor: isDark ? '#353b48' : '#fff' }]}>
      <View>
        <Text style={[styles.title, { color: isDark ? '#fff' : '#000' }]}>{item.title}</Text>
        <Text style={styles.category}>{item.category}</Text>
      </View>
      <View style={styles.rightSide}>
        <Text style={[
          styles.amount, 
          { color: item.type === 'income' ? '#27ae60' : '#c0392b' }
        ]}>
          {(item.amount * conversionRate).toFixed(2)} {currency}
        </Text>
        <TouchableOpacity onPress={() => handleDelete(item.id)}>
            <MaterialIcons name="delete" size={24} color="#e74c3c" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#2f3640' : '#f5f6fa' }]}>
      <FlatList 
        data={transactions}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={{textAlign: 'center', marginTop: 20, color: '#888'}}>No transactions yet.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  item: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, marginVertical: 5, borderRadius: 10, elevation: 2 },
  title: { fontSize: 16, fontWeight: 'bold' },
  category: { color: '#7f8c8d', fontSize: 12 },
  rightSide: { flexDirection: 'row', alignItems: 'center' },
  amount: { fontSize: 16, fontWeight: 'bold', marginRight: 10 }
});