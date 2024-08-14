import {View, Text,TouchableOpacity,ScrollView} from 'react-native'
import { format, addMonths, subMonths } from 'date-fns';
import AntDesign from '@expo/vector-icons/AntDesign';
import React, { useState, useEffect } from 'react';
import styles from '@/styles/budget'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { getTotalBudget,getCurrentBudget } from '@/database/services/budgetService'; 
import { formatMoney } from '@/database/services/formatMoney';

export default function calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [totalBudget, setTotalBudget] = useState<string>('0');
  const [currentBudget, setCurrentBudget] = useState<string>('0');
  const handlePrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  useEffect(() => {
    getData();
  }, []);
  
  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const getData = async () => {
    try {
      const budget = await getTotalBudget();
      const current = await getCurrentBudget();
      const formatBudget = formatMoney(budget.toString());
      const formatCurrent = formatMoney(current.toString());
      setTotalBudget(formatBudget);
      setCurrentBudget(formatCurrent);
    } catch (error) {
      console.error('Error fetching budget data:', error);
      setTotalBudget(formatMoney('0'));
      setCurrentBudget(formatMoney('0'));
    }
  };



  return (
    <>
    <View style = {styles.main_container}>
      <View style = {styles.money_container}>
        <View style = {styles.balance_container}>
          <Text style = {styles.balance}>Current Balance</Text>
          <TouchableOpacity style = {styles.button_cash}>
            <FontAwesome6 name="add" size={15} color="#3C93E5" />
            <Text style = {styles.add_cash_text}>Add Cash</Text>
          </TouchableOpacity>
        </View>
        <View style = {styles.current_balance}>
          <Text style = {styles.amount_balance}>{'\u20B1'} {currentBudget}</Text>
        </View>
        <View style = {styles.total_amount_container}>
          <Text style = {styles.budget_title}>Total Budget:</Text>
          <Text style = {styles.amount_budget}> {'\u20B1'} {totalBudget}</Text>
        </View>
      </View>
    </View>
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handlePrevMonth}>
            <AntDesign name="left" size={23} color="black" />
          </TouchableOpacity>
          <Text style={styles.monthText}>{format(currentDate, 'MMMM yyyy')}</Text>
          <TouchableOpacity onPress={handleNextMonth}>
          <AntDesign name="right" size={23} color="black" />
        </TouchableOpacity>
      </View>
    </View>
    <View style = {styles.expenses_title_container}>
      <Text style = {styles.expenses_title}>Expenses</Text>
    </View>
    <ScrollView>
      <View style = {styles.expneses_list_container}>
        <View style = {styles.list_container}>
          <View style = {styles.info_container}>
            <View style = {styles.info_wrapper}>
              <Text style={styles.event_info}>
                Basketball Tournament
              </Text>
            </View>
            <View style = {styles.info_wrapper}>
              <Text style={styles.event_info}>
                September 25
              </Text>
            </View>
          </View>
          <View style = {styles.amount_container}>
            <Text style = {styles.budget_text}>{'\u20B1'} 1,000</Text>
          </View>
        </View>
      </View>
      <View style = {styles.expneses_list_container}>
        <View style = {styles.list_container2}>
          <View style = {styles.info_container}>
            <View style = {styles.info_wrapper}>
              <Text style={styles.event_info}>
                Basketball Tournament
              </Text>
            </View>
            <View style = {styles.info_wrapper}>
              <Text style={styles.event_info}>
                September 25
              </Text>
            </View>
          </View>
          <View style = {styles.amount_container}>
            <Text style = {styles.budget_text}>{'\u20B1'} 1,000</Text>
          </View>
        </View>
      </View>
    </ScrollView>
    </>
  )
}
