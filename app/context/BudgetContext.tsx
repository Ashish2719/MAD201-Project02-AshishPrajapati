/*
 * Course: MAD201-01
 * Project: 2
 * Name: Ashish Prajapati
 * Student ID: A00194842
 * Description: Manages global budget state, local storage, and currency API.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
}

interface BudgetContextType {
  transactions: Transaction[];
  addTransaction: (tx: Transaction) => void;
  deleteTransaction: (id: string) => void;
  currency: string;
  setCurrency: (currency: string) => void;
  conversionRate: number;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  totalIncome: number;
  totalExpense: number;
  balance: number;
}

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

export const BudgetProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currency, setCurrency] = useState('CAD');
  const [conversionRate, setConversionRate] = useState(1);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Load data from AsyncStorage on startup
  useEffect(() => {
    const loadData = async () => {
      try {
        const storedTx = await AsyncStorage.getItem('transactions');
        if (storedTx) setTransactions(JSON.parse(storedTx));
        
        const storedTheme = await AsyncStorage.getItem('theme');
        if (storedTheme) setTheme(storedTheme as 'light' | 'dark');
      } catch (e) {
        console.error("Failed to load data", e);
      }
    };
    loadData();
  }, []);

  // Save transactions whenever they change
  useEffect(() => {
    AsyncStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  // Fetch API for currency
  useEffect(() => {
    const fetchRate = async () => {
      if (currency === 'USD') {
        setConversionRate(1);
        return;
      }
      try {
        const res = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const data = await res.json();
        if (data.rates[currency]) {
          setConversionRate(data.rates[currency]);
        }
      } catch (error) {
        console.error("API Error", error);
      }
    };
    fetchRate();
  }, [currency]);

  const addTransaction = (tx: Transaction) => {
    setTransactions(prev => [...prev, tx]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    AsyncStorage.setItem('theme', newTheme);
  };

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0);
  
  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <BudgetContext.Provider value={{
      transactions, addTransaction, deleteTransaction,
      currency, setCurrency, conversionRate,
      theme, toggleTheme,
      totalIncome, totalExpense, balance
    }}>
      {children}
    </BudgetContext.Provider>
  );
};

export const useBudget = () => {
  const context = useContext(BudgetContext);
  if (!context) throw new Error("useBudget must be used within BudgetProvider");
  return context;
};