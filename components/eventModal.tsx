// EventModal.tsx
import React from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import styles from '@/styles/tabStyle';
import { formatMoney } from '@/database/services/formatMoney';
import { Ionicons } from '@expo/vector-icons';

type EventModalProps = {
  visible: boolean;
  onClose: () => void;
  onSave: () => void;
  eventName: string;
  setEventName: (text: string) => void;
  date: string;
  setDate: (date: string) => void;
  timeStart: Date | null;
  setTimeStart: (time: Date | null) => void;
  timeEnd: Date | null;
  setTimeEnd: (time: Date | null) => void;
  allocatedBudget: string;
  setAllocatedBudget: (text: string) => void;
  budgetLimit: string;
  setBudgetLimit: (text: string) => void;
  showTimePickerStart: boolean;
  setShowTimePickerStart: (show: boolean) => void;
  showTimePickerEnd: boolean;
  setShowTimePickerEnd: (show: boolean) => void;
  showDatePicker: boolean;
  setShowDatePicker: (show: boolean) => void;
  errors: {
    eventName: string;
    eventDate: string;
    startTime: string;
    endTime: string;
    allocatedBudget: string;
    budgetLimit: string;
  };
};

const EventModal: React.FC<EventModalProps> = ({
  visible,
  onClose,
  onSave,
  eventName,
  setEventName,
  date,
  setDate,
  timeStart,
  setTimeStart,
  timeEnd,
  setTimeEnd,
  allocatedBudget,
  setAllocatedBudget,
  budgetLimit,
  setBudgetLimit,
  showTimePickerStart,
  setShowTimePickerStart,
  showTimePickerEnd,
  setShowTimePickerEnd,
  showDatePicker,
  setShowDatePicker,
  errors,
}) => {
  const today = new Date().toISOString().split('T')[0];
  const handleTimeStartChange = (event: DateTimePickerEvent, selectedTime?: Date) => {
    setShowTimePickerStart(false);
    setTimeStart(selectedTime || timeStart);
  };

  const handleTimeEndChange = (event: DateTimePickerEvent, selectedTime?: Date) => {
    setShowTimePickerEnd(false);
    setTimeEnd(selectedTime || timeEnd);
  };

  const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const selectedDateString = selectedDate.toISOString().split('T')[0];
      if (selectedDateString >= today) {
        setDate(selectedDateString);
      } else {
        alert('Please select a date today or later.');
      }
    }
  };

  const budgetText = (text: string) => {
    const numericText = text.replace(/[^0-9]/g, '').replace(/^0+/, '');
    setAllocatedBudget(numericText);
  };

  const limitText = (text:string) => {
    const numericText = text.replace(/[^0-9]/g, '').replace(/^0+/, '');
    setBudgetLimit(numericText);
  }
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.backButton} onPress={onClose}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          
          <View style={styles.errorContainer}>
            {errors.eventName ? <Text style={styles.errorText}>{errors.eventName}</Text> : null}
          </View>
          <TextInput
            style={styles.input}
            placeholder="Event Name"
            value={eventName}
            onChangeText={setEventName}
          />

          <View style={styles.errorContainer}>
            {errors.eventDate ? <Text style={styles.errorText}>{errors.eventDate}</Text> : null}
          </View>
          <TouchableOpacity style={styles.button_input} onPress={() => setShowDatePicker(true)}>
            <TextInput
              style={styles.input}
              placeholder="Date"
              value={date}
              editable={false}
            />
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              mode="date"
              value={date ? new Date(date) : new Date()}
              onChange={handleDateChange}
              display="default"
            />
          )}

          <View style={styles.errorContainer}>
            {errors.startTime ? <Text style={styles.errorText}>{errors.startTime}</Text> : null}
          </View>
          <TouchableOpacity style={styles.button_input} onPress={() => setShowTimePickerStart(true)}>
            <TextInput
              style={styles.input}
              placeholder="Time Start"
              value={timeStart ? format(timeStart, 'hh:mm a') : ''}
              editable={false}
            />
          </TouchableOpacity>
          {showTimePickerStart && (
            <DateTimePicker
              mode="time"
              value={timeStart || new Date()}
              onChange={handleTimeStartChange}
              display="spinner"
            />
          )}

          <View style={styles.errorContainer}>
            {errors.endTime ? <Text style={styles.errorText}>{errors.endTime}</Text> : null}
          </View>
          <TouchableOpacity style={styles.button_input} onPress={() => setShowTimePickerEnd(true)}>
            <TextInput
              style={styles.input}
              placeholder="Time End"
              value={timeEnd ? format(timeEnd, 'hh:mm a') : ''}
              editable={false}
            />
          </TouchableOpacity>
          {showTimePickerEnd && (
            <DateTimePicker
              mode="time"
              value={timeEnd || new Date()}
              onChange={handleTimeEndChange}
              display="spinner"
            />
          )}

          <View style={styles.errorContainer}>
            {errors.allocatedBudget ? <Text style={styles.errorText}>{errors.allocatedBudget}</Text> : null}
          </View>
          <TextInput
            keyboardType='numeric'
            style={styles.input}
            placeholder="Allocated Budget (₱)"
            value={formatMoney(allocatedBudget)}
            onChangeText={budgetText}
          />

          <View style={styles.errorContainer}>
            {errors.budgetLimit ? <Text style={styles.errorText}>{errors.budgetLimit}</Text> : null}
          </View>
          <TextInput
            keyboardType='numeric'
            style={styles.input}
            placeholder="Budget Limit (₱)"
            value={formatMoney(budgetLimit)}
            onChangeText={limitText}
          />

          <TouchableOpacity style={styles.saveButton} onPress={onSave}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default EventModal;
