/*
 * Course: MAD201-01
 * Project: 2
 * Name: Ashish Prajapati
 * Student ID: A00194842
 * Description: Allows users to toggle Dark Mode and select their preferred Currency.
 */

import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { useBudget } from '../context/BudgetContext';

export default function SettingsScreen() {
  const { theme, toggleTheme, currency, setCurrency } = useBudget();
  const isDark = theme === 'dark';
  const textColor = { color: isDark ? '#fff' : '#000' };

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#2f3640' : '#fff' }]}>
      <Text style={[styles.header, textColor]}>Preferences</Text>

      {/* Theme Toggle */}
      <View style={styles.row}>
        <Text style={[styles.label, textColor]}>Dark Mode</Text>
        <Switch 
          value={isDark} 
          onValueChange={toggleTheme}
          trackColor={{ false: "#767577", true: "#3498db" }}
          thumbColor={isDark ? "#f4f3f4" : "#f4f3f4"}
        />
      </View>

      <View style={styles.separator} />

      
      <Text style={[styles.label, textColor, { marginTop: 20 }]}>Currency (Live Rates)</Text>
      <View style={[styles.pickerBox, { borderColor: isDark ? '#555' : '#ccc' }]}>
        <Picker 
            selectedValue={currency} 
            onValueChange={(val) => setCurrency(val)}
            style={{ color: isDark ? '#fff' : '#000' }}
            dropdownIconColor={isDark ? '#fff' : '#000'}
        >
          <Picker.Item label="USD - US Dollar" value="USD" />
          <Picker.Item label="CAD - Canadian Dollar" value="CAD" />
          <Picker.Item label="EUR - Euro" value="EUR" />
          <Picker.Item label="GBP - British Pound" value="GBP" />
        </Picker>
      </View>

      <Text style={[styles.info, textColor]}>
        * Exchange rates are fetched from api.exchangerate-api.com
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 30 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  label: { fontSize: 18 },
  separator: { height: 1, backgroundColor: '#ccc', marginVertical: 20, opacity: 0.5 },
  pickerBox: { borderWidth: 1, borderRadius: 5, marginTop: 10 },
  info: { marginTop: 15, fontSize: 12, opacity: 0.6 }
});