import React, { useState, useEffect, ReactNode } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import styles from '@/styles/tabStyle';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import EventModal from '@/components/eventModal';
import { format } from 'date-fns';
import useAppFonts from '@/styles/useFonts';
import { getTotalBudget } from '@/database/services/budgetService';
import { addEvent,getTodaysEvent} from '@/database/services/eventService';

const getCurrentDate = () => {
  const date = new Date();
  const day = format(date, 'd');
  const dayOfWeek = format(date, 'EEEE');

  return { day, dayOfWeek };
};

export default function CalendarScreen() {
  const [errors, setErrors] = useState({
    eventName: '',
    eventDate: '',
    startTime: '',
    endTime: '',
    allocatedBudget: '',
    budgetLimit: '',
  });

  const [selected, setSelected] = useState('');
  const { day, dayOfWeek } = getCurrentDate();
  const [modalVisible, setModalVisible] = useState(false);
  const [eventName, setEventName] = useState('');
  const [timeStart, setTimeStart] = useState<Date | null >(null);
  const [timeEnd, setTimeEnd] = useState<Date | null >(null);
  const [allocatedBudget, setAllocatedBudget] = useState('');
  const [budgetLimit, setBudgetLimit] = useState('');
  const [totalBudget, setTotalBudget] = useState<number>(0);
  const [showTimePickerStart, setShowTimePickerStart] = useState(false);
  const [showTimePickerEnd, setShowTimePickerEnd] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [totalCount, setTotalEvents] = useState<any>();
  const [events, setEvents] = useState<any[]>([]);
  const [date, setDate] = useState<string | undefined>('');
  const { loaded, error } = useAppFonts();
  const today = new Date().toISOString().split('T')[0];

  if (!loaded && !error) {
    return null;
  }

  useEffect(() => {
    setDate(selected);
    getBudget();
    getEvent();
  }, [selected]);

  const getEvent = async () => {
    const totalEvent = await getTodaysEvent();
    setTotalEvents(totalEvent.total_count);
    setEvents(totalEvent.all_events);
  }
  
  const getBudget = async () => {
    const total = await getTotalBudget();
    setTotalBudget(total);
  }

  const saveData = async () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!eventName.trim()) {
      newErrors.eventName = 'Event name is required';
      isValid = false;
    } else {
      newErrors.eventName = '';
    }

    if (!date) {
      newErrors.eventDate = 'Date is required';
      isValid = false;
    } else {
      newErrors.eventDate = '';
    }

    if (!timeStart) {
      newErrors.startTime = 'Start time is required';
      isValid = false;
    } else {
      newErrors.startTime = '';
    }

    if (!timeEnd) {
      newErrors.endTime = 'End time is required';
      isValid = false;
    } else {
      newErrors.endTime = '';
    }

    const allocatedBudgetValue = parseInt(allocatedBudget, 10);
    if (!allocatedBudget.trim() || isNaN(allocatedBudgetValue) || allocatedBudgetValue <= 0) {
      newErrors.allocatedBudget = 'Allocated budget is required';
      isValid = false;
    } else {
      newErrors.allocatedBudget = '';
    }
    const budgetLimitValue = parseInt(budgetLimit, 10);
    if (!budgetLimit.trim() || isNaN(budgetLimitValue) || budgetLimitValue <= 0) {
      newErrors.budgetLimit = 'Budget limit is required';
      isValid = false;
    } else {
      newErrors.budgetLimit = '';
    }
    if(allocatedBudgetValue > budgetLimitValue) {
      newErrors.allocatedBudget = 'Please reduce the allocated budget to be within the budget limit.'
      isValid = false;
    } else {
      newErrors.allocatedBudget = '';
    }

    if(budgetLimitValue > totalBudget) {
      newErrors.budgetLimit = 'The budget limit cannot exceed the total available budget. Please adjust the budget limit.';
      isValid = false;
    } else {
      newErrors.budgetLimit = ''; 
    }

    setErrors(newErrors);
    if (isValid) {
      const event = {
        eventName,
        date,
        timeStart,
        timeEnd,
        allocatedBudgetValue,
        budgetLimitValue
      }
      
      await addEvent(event);
      // Reset form values
      setEventName('');
      setDate('');
      setTimeStart(null);
      setTimeEnd(null);
      setAllocatedBudget('');
      setBudgetLimit('');
      setModalVisible(false);
    }
  };

  return (
    <>
      <View style={styles.calendar_text_container}>
        <Text style={styles.calendar_text}>Calendar</Text>
      </View>
      <View style={styles.calendar_container}>
        <Calendar
          onDayPress={(day: { dateString: React.SetStateAction<string> }) => {
            setSelected(day.dateString);
          }}
          markedDates={{
            [selected]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' },
          }}
          style={styles.calendar}
          theme={{
            textDayFontSize: 15,
            textMonthFontSize: 20,
            textDayHeaderFontSize: 15,
            textDayFontFamily: 'Inter',
            textMonthFontFamily: 'Inter',
          }}
          renderArrow={(direction: string) => (
            <AntDesign name={direction === 'left' ? 'left' : 'right'} size={22} color="black" />
          )}
          minDate={today}
        />
      </View>
      <View style={styles.current_date_container}>
        <View style={styles.date_container}>
          <Text style={styles.date}>{day}</Text>
          <Text style={styles.date_title}>{dayOfWeek}</Text>
        </View>
        <View style={styles.total_event_container}>
          <Text style={styles.date}>Today</Text>
          <Text style={styles.date_title}>{totalCount} Events</Text>
        </View>
      </View>
      <View style={styles.add_button_container}>
        <TouchableOpacity style={styles.add_button} onPress={() => setModalVisible(true)}>
          <FontAwesome6 name="add" size={30} color="white" />
        </TouchableOpacity>
      </View>
      <ScrollView>
      {events.length > 0 ? (
        events.map((event, index) => (
          <View key={index} style={styles.show_event_container}>
            <View style={styles.event_list_container}>
              <View style={styles.time}>
                <Text style={styles.time_text}>{event.start} - {event.end}</Text>
              </View>
              <View style={styles.event_name}>
                <Text style={styles.event_text}>{event.event_name}</Text>
              </View>
            </View>
          </View>
        ))
      ) : (
        <View style={styles.show_event_container}>
          <Text>No events scheduled for today.</Text>
        </View>
      )}
      </ScrollView>
      {/* Use the EventModal component here */}
      <EventModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={saveData}
        eventName={eventName}
        setEventName={setEventName}
        date={date || ''}
        setDate={setDate}
        timeStart={timeStart}
        setTimeStart={setTimeStart}
        timeEnd={timeEnd}
        setTimeEnd={setTimeEnd}
        allocatedBudget={allocatedBudget}
        setAllocatedBudget={setAllocatedBudget}
        budgetLimit={budgetLimit}
        setBudgetLimit={setBudgetLimit}
        showTimePickerStart={showTimePickerStart}
        setShowTimePickerStart={setShowTimePickerStart}
        showTimePickerEnd={showTimePickerEnd}
        setShowTimePickerEnd={setShowTimePickerEnd}
        showDatePicker={showDatePicker}
        setShowDatePicker={setShowDatePicker}
        errors={errors}
      />
    </>
  );
}
