import { useLocalSearchParams,router } from 'expo-router';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import styles from '@/styles/expenses';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import useAppFonts from '@/styles/useFonts';
import { getHistory,getEvent } from '@/database/services/expenses';
import { useEffect, useState } from 'react';
import { formatMoney } from '@/database/services/formatMoney';
export default function history() {
  const { id } = useLocalSearchParams();
  const { loaded, error } = useAppFonts();
  const [expenses, setExpenses] = useState<any[]>([]);
  const [event, setEvent] = useState<any | null>(null);
  
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const expenses = await getHistory(id);
      const event = await getEvent(id);
      setExpenses(expenses);
      setEvent(event);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  if (!loaded && !error) {
    return null;
  }

  const allotedAmount = event?.alloted ? formatMoney(String(event.alloted)) : 'N/A';
  const currentBalance = event?.currentBudget ? formatMoney(String(event.currentBudget)) : 'N/A';
  const budgetLimit = event?.budgetLimit ? formatMoney(String(event.budgetLimit)) : 'N/A';
  return (
   <>
    <TouchableOpacity style={styles.goBackButton} onPress={() => router.push('/amount')}>
      <FontAwesome6 name="arrow-left" size={24} color="black" />
      <Text style={styles.goBackText}>Go Back</Text>
    </TouchableOpacity>
    <View style = {styles.main_container}>
      <View style = {styles.money_container}>
        <View style = {styles.balance_container}>
          <Text style = {styles.balance}>Current Balance</Text>
        </View>
        <View style = {styles.current_balance}>
          <Text style = {styles.amount_balance}>{'\u20B1'} {currentBalance}</Text>
        </View>
        <View style = {styles.total_amount_container}>
          <Text style = {styles.budget_title}>Total Budget:</Text>
          <Text style = {styles.amount_budget}> {'\u20B1'} {allotedAmount}</Text>
        </View>
        <View style = {styles.total_amount_container}>
          <Text style = {styles.budget_title}>Budget Limit:</Text>
          <Text style = {styles.amount_budget}> {'\u20B1'} {budgetLimit}</Text>
        </View>
      </View>
    </View>
    <ScrollView style={styles.scroll}>
      {expenses.length > 0 ? (
        expenses.map((expens,index)=>(
          <View key={index} style = {styles.list_Container}>
            <View style ={styles.list_wrapper}>
              <View style = {styles.detail_container}>
                <View style = {styles.details}>
                  <Text style = {styles.text}>{expens.name}</Text>
                </View>
                <View style = {styles.details2}>
                  <Text style = {styles.text}>Amount:</Text>
                  <Text style = {styles.money}>{'\u20B1'} {formatMoney(String(expens.amount))}</Text>
                </View>
              </View>
            </View>
          </View>
        ))
      ) : (
        <View style={styles.Event_Empty}>
        <Text>No Expenses for this event.</Text>
      </View>
      )}
    </ScrollView>
   </>
  );
}

