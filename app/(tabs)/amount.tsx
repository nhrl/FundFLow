import {View, Text,TouchableOpacity,ScrollView, Modal,TextInput} from 'react-native'
import { format, addMonths, subMonths,isSameMonth } from 'date-fns';
import AntDesign from '@expo/vector-icons/AntDesign';
import React, { useState, useEffect } from 'react';
import styles from '@/styles/budget'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { getTotalBudget,getCurrentBudget, addCash } from '@/database/services/budgetService'; 
import { formatMoney,convertDate } from '@/database/services/formatMoney';
import { getEventHistory} from '@/database/services/eventService';
import { router } from 'expo-router';
import useAppFonts from '@/styles/useFonts';


export default function calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [totalBudget, setTotalBudget] = useState<string>('0');
  const [currentBudget, setCurrentBudget] = useState<string>('0');
  const [events, setEvents] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [value, setValue] = useState('');
  const systemDate = new Date();
  const { loaded, error } = useAppFonts();
  const isPrevMonthDisabled = isSameMonth(currentDate, systemDate);

  
  if (!loaded && !error) {
    return null;
  }
  
  useEffect(() => {
    getData();
    const monthNumber = currentDate.getMonth() + 1;
    fetchEventsForMonth(monthNumber);
  }, []);
  
  const handleNextMonth = () => {
    if(!isSameMonth(currentDate, systemDate)) {
      const nextMonth = addMonths(currentDate, 1);
      setCurrentDate(nextMonth);
      fetchEventsForMonth(nextMonth.getMonth() + 1);
    }
  };

  const handlePrevMonth = () => {
    const prevMonth = subMonths(currentDate, 1);
    setCurrentDate(prevMonth);
    fetchEventsForMonth(prevMonth.getMonth() + 1);
  };

  const fetchEventsForMonth = async (monthNumber: number) => {
    const eventsForMonth = await getEventHistory(monthNumber);
    setEvents(eventsForMonth);
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

  const handleChange = (text: string) => {
    let cleanedText = text.replace(/^0+/, '');
    const formattedText = formatMoney(cleanedText );
    setValue(formattedText);
  };

  const handlePress = (event: any) => {
    router.push({
      pathname: '/history/[id]',
      params: { id: event.event_id },
    });
  }

  const handleSave = async () => {
    const cleanedValue = value.replace(/,/g, '');
    const numericValue = parseFloat(cleanedValue);
    if(Number.isNaN(numericValue)) {
      alert('Please Enter Cash amount');
    } else {
      await addCash(numericValue);
      alert('Budget added Successfully');
      setModalVisible(false);
      getData();
    }
  }

  return (
    <>
    <View style = {styles.main_container}>
      <View style = {styles.money_container}>
        <View style = {styles.balance_container}>
          <Text style = {styles.balance}>Current Balance</Text>
          <TouchableOpacity style = {styles.button_cash} onPress={() => setModalVisible(true)}>
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
          <AntDesign name="right" 
          size={23} 
          color={isPrevMonthDisabled ? 'gray' : 'black'}
          />
        </TouchableOpacity>
      </View>
    </View>
    <View style = {styles.expenses_title_container}>
      <Text style = {styles.expenses_title}>History</Text>
    </View>
    <ScrollView>
      {events.length > 0 ? (
        events.map((event,index) => (
          <TouchableOpacity key={index} onPress={() => handlePress(event)}>
            <View style = {styles.expneses_list_container}>
              <View style = {index % 2 == 0 ? styles.list_container:styles.list_container2}>
                <View style = {styles.info_container}>
                  <View style = {styles.info_wrapper}>
                    <Text style={styles.event_info}>
                      {event.event_name}
                    </Text>
                  </View>
                  <View style = {styles.info_wrapper}>
                    <Text style={styles.event_info}>
                      {convertDate(event.date)}
                    </Text>
                  </View>
                </View>
                <View style = {styles.amount_container}>
                  <Text style = {styles.budget_text}>{'\u20B1 '}{formatMoney(String(event.alloted))}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))
      ):(
        <View style= {styles.emptyEvent}>
          <Text>No events history for this month.</Text>
        </View>
      )}
    </ScrollView>
    <Modal
       animationType="fade"
       transparent={true}
       visible={modalVisible}
       onRequestClose={() => setModalVisible(false)}
    >
      <View style = {styles.addCashModal}>
        <View style = {styles.addCashContent}>
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
            <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Text style={styles.buttonText}>Add Cash</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
        </View> 
      </View>
    </Modal>
    </>
  )
}
