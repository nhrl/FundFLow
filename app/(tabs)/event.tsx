import {View, Text,TouchableOpacity,ScrollView} from 'react-native'
import { format, addMonths, subMonths } from 'date-fns';
import AntDesign from '@expo/vector-icons/AntDesign';
import React, {useState } from 'react';
import styles from '@/styles/tabStyle';
import useAppFonts from '@/styles/useFonts';

export default function calendar() {
  const { loaded, error } = useAppFonts();

  if (!loaded && !error) {
    return null;
  }

  const [currentDate, setCurrentDate] = useState(new Date());

  const handlePrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  return (
    <>
    <View style = {styles.calendar_text_container}>
      <Text style = {styles.calendar_text}>Schedule</Text>
    </View>
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handlePrevMonth}>
          <AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.monthText}>{format(currentDate, 'MMMM yyyy')}</Text>
        <TouchableOpacity onPress={handleNextMonth}>
        <AntDesign name="right" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
    <ScrollView>
    <View style={styles.schedule_list_container}>
        <View style={styles.schedult_list}>
          <View style ={styles.event_date_container}>
            <Text style ={styles.event_date}>19</Text>
          </View>
          <View style={styles.event_name_container}>
              <View style = {styles.time_container}>
                <Text style ={styles.event_time}>5:00pm - 8:00pm</Text>
              </View>
              <View style={styles.event}>
                <Text style={styles.name_event}>Basketball Tournament</Text>
              </View>
          </View>
        </View>
    </View>
    <View style={styles.schedule_list_container}>
        <View style={styles.schedult_list}>
          <View style ={styles.event_date_container1}>
            <Text style ={styles.event_date}>20</Text>
          </View>
          <View style={styles.event_name_container}>
              <View style = {styles.time_container}>
                <Text style ={styles.event_time}>5:00pm - 8:00pm</Text>
              </View>
              <View style={styles.event}>
                <Text style={styles.name_event}>Basketball Tournament</Text>
              </View>
          </View>
        </View>
    </View>
    <View style={styles.schedule_list_container}>
        <View style={styles.schedult_list}>
          <View style ={styles.event_date_container}>
            <Text style ={styles.event_date}>21</Text>
          </View>
          <View style={styles.event_name_container}>
              <View style = {styles.time_container}>
                <Text style ={styles.event_time}>5:00pm - 8:00pm</Text>
              </View>
              <View style={styles.event}>
                <Text style={styles.name_event}>Basketball Tournament</Text>
              </View>
          </View>
        </View>
    </View>
    <View style={styles.schedule_list_container}>
        <View style={styles.schedult_list}>
          <View style ={styles.event_date_container1}>
            <Text style ={styles.event_date}>22</Text>
          </View>
          <View style={styles.event_name_container}>
              <View style = {styles.time_container}>
                <Text style ={styles.event_time}>5:00pm - 8:00pm</Text>
              </View>
              <View style={styles.event}>
                <Text style={styles.name_event}>Basketball Tournament</Text>
              </View>
          </View>
        </View>
    </View>
    <View style={styles.schedule_list_container}>
        <View style={styles.schedult_list}>
          <View style ={styles.event_date_container}>
            <Text style ={styles.event_date}>23</Text>
          </View>
          <View style={styles.event_name_container}>
              <View style = {styles.time_container}>
                <Text style ={styles.event_time}>5:00pm - 8:00pm</Text>
              </View>
              <View style={styles.event}>
                <Text style={styles.name_event}>Basketball Tournament</Text>
              </View>
          </View>
        </View>
    </View>
    <View style={styles.schedule_list_container}>
        <View style={styles.schedult_list}>
          <View style ={styles.event_date_container1}>
            <Text style ={styles.event_date}>24</Text>
          </View>
          <View style={styles.event_name_container}>
              <View style = {styles.time_container}>
                <Text style ={styles.event_time}>5:00pm - 8:00pm</Text>
              </View>
              <View style={styles.event}>
                <Text style={styles.name_event}>Basketball Tournament</Text>
              </View>
          </View>
        </View>
    </View>
    <View style={styles.schedule_list_container}>
        <View style={styles.schedult_list}>
          <View style ={styles.event_date_container}>
            <Text style ={styles.event_date}>19</Text>
          </View>
          <View style={styles.event_name_container}>
              <View style = {styles.time_container}>
                <Text style ={styles.event_time}>5:00pm - 8:00pm</Text>
              </View>
              <View style={styles.event}>
                <Text style={styles.name_event}>Basketball Tournament</Text>
              </View>
          </View>
        </View>
    </View>
    <View style={styles.schedule_list_container}>
        <View style={styles.schedult_list}>
          <View style ={styles.event_date_container1}>
            <Text style ={styles.event_date}>20</Text>
          </View>
          <View style={styles.event_name_container}>
              <View style = {styles.time_container}>
                <Text style ={styles.event_time}>5:00pm - 8:00pm</Text>
              </View>
              <View style={styles.event}>
                <Text style={styles.name_event}>Basketball Tournament</Text>
              </View>
          </View>
        </View>
    </View>
    </ScrollView>
    </>
  )
}
