/*
 * Course: MAD201-01
 * Project: 2
 * Name: Ashish Prajapati
 * Student ID: A00194842
 * Description: Displays a text-based summary of expenses by category.
 */

import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useBudget } from '../context/BudgetContext';

export default function ReportsScreen() {
  const { transactions, currency, conversionRate, theme } = useBudget();
  const isDark = theme === 'dark';
  const textColor = { color: isDark ? '#fff' : '#000' };

  const calculateCategoryTotal = (cat: string) => {
    return transactions
    // Filter by the category AND ensure it's an expense transaction
      .filter(t => t.category === cat && t.type === 'expense')
      .reduce((acc, curr) => acc + curr.amount, 0) * conversionRate;
  };

  const categories = ['Food', 'Rent', 'Salary', 'Transport', 'Entertainment', 'Utilities', 'Others', 'Health', 'Shopping', 'Education', 'Travel', 'Gifts', 'Insurance', 'Taxes', 'Other'];

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDark ? '#2f3640' : '#fff' }]}>
      <Text style={[styles.header, textColor]}>Expense Breakdown</Text>
      
      {categories.map(cat => {
        const total = calculateCategoryTotal(cat);
        
        if (total === 0 && cat !== 'Food') return null; 

        return (
          <View key={cat} style={[styles.row, { borderBottomColor: isDark ? '#555' : '#eee' }]}>
            <Text style={[styles.label, textColor]}>{cat}</Text>
            <Text style={[styles.value, textColor]}>
              {total.toFixed(2)} {currency}
            </Text>
          </View>
        );
      })}

      <View style={styles.noteContainer}>
        <Text style={[styles.note, textColor]}>
          * Totals are converted to your selected currency ({currency}).
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15, borderBottomWidth: 1 },
  label: { fontSize: 18 },
  value: { fontSize: 18, fontWeight: 'bold' },
  noteContainer: { marginTop: 30 },
  note: { fontStyle: 'italic', opacity: 0.7 }
});