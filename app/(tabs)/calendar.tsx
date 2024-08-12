import React,{useState} from 'react'
import {View, Text,TouchableOpacity, ScrollView} from 'react-native'
import {Calendar} from 'react-native-calendars';
import styles from '@/styles/tabStyle'
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { format } from 'date-fns';
import useAppFonts from '@/styles/useFonts';


const getCurrentDate = () => {
  const date = new Date();
  const day = format(date, 'd');  
  const dayOfWeek = format(date, 'EEEE'); 

  return { day, dayOfWeek };
};

export default function calendar() {
  const [selected, setSelected] = useState('');
  const { day, dayOfWeek } = getCurrentDate();

  const { loaded, error } = useAppFonts();

  if (!loaded && !error) {
    return null;
  }
  
  return (
    <>
    <View style = {styles.calendar_text_container}>
      <Text style = {styles.calendar_text}>Calendar</Text>
    </View>
    <View style = {styles.calendar_container}>
      <Calendar
        onDayPress={(day: { dateString: React.SetStateAction<string>; }) => {
          setSelected(day.dateString);
        }}
        markedDates={{
          [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
        }}
       style = {styles.calendar} theme ={{
        // Calendar Design adjustments
        textDayFontSize: 15,
        textMonthFontSize: 20,
        textDayHeaderFontSize: 15,
        textDayFontFamily: 'Inter',
        textMonthFontFamily: 'Inter',
       }}
       
       renderArrow={(direction: string) => (
        <AntDesign
          name={direction === 'left' ? 'left' : 'right'}
          size={22}
          color="black"
        />
      )}
       />
    </View>
    <View style={styles.current_date_container}>
      <View style={styles.date_container}>
        <Text style={styles.date}>{day}</Text>
        <Text style={styles.date_title}>{dayOfWeek}</Text>
      </View>
      <View style ={styles.total_event_container}>
        <Text style={styles.date}>Today</Text>
        <Text style={styles.date_title}>1 Events</Text>
      </View>
    </View>
    <View style={styles.add_button_container}>
      <TouchableOpacity style={styles.add_button}>
      <FontAwesome6 name="add" size={30} color="white" />
      </TouchableOpacity>
    </View>
    <ScrollView>
      <View style={styles.show_event_container}>
          <View style={styles.event_list_container}>
              <View style={styles.time}><Text style={styles.time_text}>5:00pm - 8:00pm</Text></View>
              <View style={styles.event_name}><Text style={styles.event_text}>Basketball Tournament</Text></View>
          </View>
          <View style={styles.event_list_container}>
              <View style={styles.time}><Text style={styles.time_text}>5:00pm - 8:00pm</Text></View>
              <View style={styles.event_name}><Text style={styles.event_text}>Basketball Tournament</Text></View>
          </View>
          <View style={styles.event_list_container}>
              <View style={styles.time}><Text style={styles.time_text}>5:00pm - 8:00pm</Text></View>
              <View style={styles.event_name}><Text style={styles.event_text}>Basketball Tournament</Text></View>
          </View>
          <View style={styles.event_list_container}>
              <View style={styles.time}><Text style={styles.time_text}>5:00pm - 8:00pm</Text></View>
              <View style={styles.event_name}><Text style={styles.event_text}>Basketball Tournament</Text></View>
          </View>
          <View style={styles.event_list_container}>
              <View style={styles.time}><Text style={styles.time_text}>5:00pm - 8:00pm</Text></View>
              <View style={styles.event_name}><Text style={styles.event_text}>Basketball Tournament</Text></View>
          </View>
          <View style={styles.event_list_container}>
              <View style={styles.time}><Text style={styles.time_text}>5:00pm - 8:00pm</Text></View>
              <View style={styles.event_name}><Text style={styles.event_text}>Basketball Tournament</Text></View>
          </View>
      </View>
    </ScrollView>
    </>
  )
}
