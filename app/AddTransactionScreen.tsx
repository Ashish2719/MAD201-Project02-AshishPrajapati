/*
 * Course: MAD201-01
 * Project: 2
 * Name: Ashish Prajapati
 * Student ID: A00194842
 * Description: Form to add new transactions.
 */

import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useBudget } from './context/BudgetContext';

export default function AddTransactionScreen() {
  const { addTransaction } = useBudget();
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [category, setCategory] = useState('Food');

  const handleSave = () => {
    if (!title || !amount) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    addTransaction({
      id: Date.now().toString(),
      title,
      amount: parseFloat(amount),
      type,
      category
    });

    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="e.g. Salary, Pizza" />

      <Text style={styles.label}>Amount (CAD)</Text>
      <TextInput 
        style={styles.input} 
        value={amount} 
        onChangeText={setAmount} 
        placeholder="0.00" 
        keyboardType="numeric" 
      />

      <Text style={styles.label}>Type</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={type} onValueChange={(val) => setType(val)}>
          <Picker.Item label="Expense" value="expense" />
          <Picker.Item label="Income" value="income" />
        </Picker>
      </View>

      <Text style={styles.label}>Category</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={category} onValueChange={(val) => setCategory(val)}>
          <Picker.Item label="Food" value="Food" />
          <Picker.Item label="Rent" value="Rent" />
          <Picker.Item label="Salary" value="Salary" />
          <Picker.Item label="Transport" value="Transport" />
          <Picker.Item label="Entertainment" value="Entertainment" />
        </Picker>
      </View>

      <Button title="Save Transaction" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  label: { fontSize: 16, fontWeight: 'bold', marginBottom: 5, marginTop: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5, fontSize: 16 },
  pickerContainer: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, marginBottom: 10 }
});