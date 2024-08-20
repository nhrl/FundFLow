import {View, Text,TouchableOpacity,ScrollView,Modal,TextInput} from 'react-native'
import { format, addMonths, subMonths, isSameMonth } from 'date-fns';
import AntDesign from '@expo/vector-icons/AntDesign';
import React, {useState, useEffect} from 'react';
import { router } from "expo-router";
import styles from '@/styles/tabStyle';
import useAppFonts from '@/styles/useFonts';
import { getEventsForMonth,deleteEvent,editEvent } from '@/database/services/eventService';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { convertTimeStringToDate,formatDateToString } from '@/database/services/formatMoney';

export default function event() {
  const [events, setEvents] = useState<any[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const { loaded, error } = useAppFonts();
  const [modalVisible, setModalVisible] = useState(false);
  const [inputModalVisible, setInputModalVisible] = useState(false);
  const [event_id, setEventId] = useState<number>();
  const [alloted, setaAlloted] = useState<number>();
  const [event_name, setEventName] = useState<string>('');
  const [newEventName, setNewEventName] = useState<string>('');
  const [eventDate, setEventDate] = useState<Date>(new Date());
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [endTime, setEndTime] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const systemDate = new Date();
  const today = new Date().toISOString().split('T')[0];
  if (!loaded && !error) {
    return null;
  }

  const handlePrevMonth = () => {
    if (!isSameMonth(currentDate, systemDate)) {
      const prevMonth = subMonths(currentDate, 1);
      setCurrentDate(prevMonth);
      fetchEventsForMonth(prevMonth.getMonth() + 1);
    }
  };

  const handleNextMonth = () => {
    const nextMonth = addMonths(currentDate, 1);
    setCurrentDate(nextMonth);
    fetchEventsForMonth(nextMonth.getMonth() + 1);
  };

  const fetchEventsForMonth = async (monthNumber: number) => {
    const eventsForMonth = await getEventsForMonth(monthNumber);
    setEvents(eventsForMonth);
  };
  
  const handleLongPress = (event: any) => {
    setModalVisible(true);
    setEventId(event.event_id);
    setEventName(event.event_name);
    setNewEventName(event.event_name);
    setaAlloted(event.alloted);
    setEventDate(new Date(event.date));
    const starTime = convertTimeStringToDate(event.start);
    const endTime = convertTimeStringToDate(event.end);
    setStartTime(starTime);
    setEndTime(endTime);
  };

  const handleDelete = async () => {
    await deleteEvent(event_id, alloted);
    alert("Event " + event_name + " Deleted Successfully");
    setModalVisible(false);
    fetchEventsForMonth(currentDate.getMonth() + 1);
  };

  const handleEdit = () => {
    setModalVisible(false);
    setInputModalVisible(true);
  };

  const handleSave = async () => {
    const dateString = formatDateToString(eventDate);
    const event = {
      newEventName,
      dateString,
      startTime,
      endTime
    }
    await editEvent(event,event_id);
    setInputModalVisible(false);
    fetchEventsForMonth(currentDate.getMonth() + 1);
  };

  const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePicker(false);
    const currentDate = selectedDate || eventDate;
    if (selectedDate) {
      const selectedDateString = selectedDate.toISOString().split('T')[0];
      if (selectedDateString >= today) {
        setEventDate(currentDate);
      } else {
        alert('Please select a date today or later.');
      }
    }
  };
  
  const handleStartTimeChange = (event: DateTimePickerEvent, selectedTime?: Date) => {
    const currentTime = selectedTime || startTime;
    setShowStartTimePicker(false);
    setStartTime(currentTime);
  };
  
  const handleEndTimeChange = (event: DateTimePickerEvent, selectedTime?: Date) => {
    const currentTime = selectedTime || endTime;
    setShowEndTimePicker(false);
    setEndTime(currentTime);
  };

  const handlePress = (event:any) => {
    router.push({
      pathname: '/expenses/[id]',
      params: { id: event.event_id },
    });
  }
  

  const isPrevMonthDisabled = isSameMonth(currentDate, systemDate);

  useEffect(() => {
    fetchEventsForMonth(currentDate.getMonth() + 1);
  }, [currentDate]);

  return (
    <>
    <View style = {styles.calendar_text_container}>
      <Text style = {styles.calendar_text}>Schedule</Text>
    </View>
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handlePrevMonth} disabled={isPrevMonthDisabled}>
          <AntDesign
            name="left"
            size={24}
            color={isPrevMonthDisabled ? 'gray' : 'black'}
          />
        </TouchableOpacity>
        <Text style={styles.monthText}>
          {format(currentDate, 'MMMM yyyy')}
        </Text>
        <TouchableOpacity onPress={handleNextMonth}>
          <AntDesign name="right" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
    <ScrollView>
      {events.length > 0 ? (
        events.map((event,index) => (
               <TouchableOpacity key={index} onPress={() => handlePress(event)} onLongPress={() => handleLongPress(event)}>
              <View style={styles.schedule_list_container}>
                <View style={styles.schedult_list}>
                  <View style ={index % 2 === 0 ? styles.event_date_container : styles.event_date_container1}>
                    <Text style ={styles.event_date}>{format(new Date(event.date), 'd')}</Text>
                  </View>
                  <View style={styles.event_name_container}>
                      <View style = {styles.time_container}>
                        <Text style ={styles.event_time}>{event.start} - {event.end}</Text>
                      </View>
                      <View style={styles.event}>
                        <Text style={styles.name_event}>{event.event_name}</Text>
                      </View>
                  </View>
                </View>
              </View>
          </TouchableOpacity>
        ))
      ) : (
        <View style={styles.Event_Empty}>
          <Text>No events scheduled for this month.</Text>
        </View>
      )}
    </ScrollView>
    <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer1}>
          <View style={styles.modalContent1}>
            <TouchableOpacity style={styles.button} onPress={handleEdit}>
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleDelete}>
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={inputModalVisible}
        onRequestClose={() => setInputModalVisible(false)}
      >
        <View style={styles.editModalContainer}>
          <View style={styles.editModalContent}>
            <TextInput
              style={styles.input}
              placeholder="Event Name"
              value={newEventName}
              onChangeText={setNewEventName}
            />
            <TouchableOpacity style={styles.input_Container} onPress={() => setShowDatePicker(true)}>
              <TextInput
                style={styles.input}
                placeholder="Event Date"
                value={format(eventDate, 'yyyy-MM-dd')}
                editable={false}
              />
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={eventDate}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
            <TouchableOpacity style={styles.input_Container} onPress={() => setShowStartTimePicker(true)}>
              <TextInput
                style={styles.input}
                placeholder="Start Time"
                value={format(startTime, 'hh:mm a')}
                editable={false}
              />
            </TouchableOpacity>
            {showStartTimePicker && (
              <DateTimePicker
                value={startTime}
                mode="time"
                display="default"
                onChange={handleStartTimeChange}
              />
            )}
            <TouchableOpacity style={styles.input_Container} onPress={() => setShowEndTimePicker(true)}>
              <TextInput
                style={styles.input}
                placeholder="End Time"
                value={format(endTime, 'hh:mm a')}
                editable={false}
              />
            </TouchableOpacity>
            {showEndTimePicker && (
              <DateTimePicker
                value={endTime}
                mode="time"
                display="default"
                onChange={handleEndTimeChange}
              />
            )}
            <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setInputModalVisible(false)}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  )
}
