import React from 'react'
import {View, Text, TextInput,TouchableOpacity} from 'react-native'
import styles from '@/styles/mainStyle'
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { router } from "expo-router";
import useAppFonts from '@/styles/useFonts';
import { formatMoney } from '@/database/services/formatMoney';
import { addBudget} from '@/database/services/budgetService';


export default function budget() {
  const { loaded, error } = useAppFonts();

  if (!loaded && !error) {
    return null;
  }

  const [value, setValue] = useState('');

  const handleChange = (text: string) => {
    let cleanedText = text.replace(/^0+/, '');
    const formattedText = formatMoney(cleanedText );
    setValue(formattedText);
  };

  const submit = async () => {
    const cleanedValue = value.replace(/,/g, '');
    const numericValue = parseFloat(cleanedValue);
    await addBudget(numericValue);
    router.replace('/calendar');
  };
  
  return (
    <>
      <View style={styles.budget_container}>
        <StatusBar style='dark'></StatusBar>
        <View style = {styles.budget_title_container}>
          <Text style = {styles.budget_title}>Enter Total Budget</Text>
        </View>
        <View style={styles.input_container}>
          <Text style = {styles.peso_sign}>{'\u20B1'}</Text>
            <TextInput 
              keyboardType='numeric'
              value={value}
              onChangeText={handleChange}
              placeholder='Enter amount in Peso'
              placeholderTextColor={"#7F7979"}
            style= {styles.input_box}/>
        </View>
        <View style = {styles.budget_button_container}>
          <TouchableOpacity style={styles.budget_button} onPress={submit}>
              <Text style={styles.budget_button_text}>Proceed</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  )
}

