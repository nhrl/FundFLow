import { useLocalSearchParams,router } from 'expo-router';
import { View, Text, ScrollView, TouchableOpacity,Modal,TextInput } from 'react-native';
import styles from '@/styles/expenses';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import useAppFonts from '@/styles/useFonts';
import { getHistory,getEvent,addCash,getCurrentBudget,addExpenses,deleteExpenses,editExpenses } from '@/database/services/expenses';
import { useEffect, useState } from 'react';
import { formatMoney } from '@/database/services/formatMoney';

export default function expenses() {
  const [errors, setErrors] = useState({
    expensesName: '',
    amount: '',
  });
 
  
  const { id } = useLocalSearchParams();
  const { loaded, error } = useAppFonts();
  const [expenses, setExpenses] = useState<any[]>([]);
  const [event, setEvent] = useState<any | null>(null);
  const [inputModalVisible,setInputModalVisible] = useState<boolean>(false);
  const [cashModalVisible,setAddCashModal] = useState<boolean>(false);
  const [expensesName,setExpensesName] = useState<string>('');
  const [value, setValue] = useState('');
  const [cash, setCash] = useState('');
  const [balance, setCurrentBalance] = useState<number>(0);
  const [optionModal,setOptionModal] = useState<boolean>(false);
  const [editName,setEditName] = useState<string>('');
  const [editAmount,setEditAmount] = useState<string>('');
  const [expensId,setExpensId] = useState<number>();
  const [editModal,setEditModal] = useState<boolean>(false);

  useEffect(() => {
    getHistoryData();
    eventData();
    getCurrent();
  }, []);


  const getCurrent = async () => {
    const current = await getCurrentBudget(id);
    setCurrentBalance(current);
  }

  const getHistoryData = async () => {
    const expenses = await getHistory(id);
    setExpenses(expenses);
  }

  const eventData = async () => {
    const event = await getEvent(id);
    setEvent(event);
  }

  if (!loaded && !error) {
    return null;
  }

  const handleChange = (text: string) => {
    let cleanedText = text.replace(/^0+/, '');
    const formattedText = formatMoney(cleanedText );
    setValue(formattedText);
  };

  const handleCashChange = (text: string) => {
    let cleanedText = text.replace(/^0+/, '');
    const formattedText = formatMoney(cleanedText );
    setCash(formattedText);
  }

  const handleSave = async () => {
    let isValid = true;
    const newErrors = { ...errors };
    
    if (!expensesName.trim()) {
      newErrors.expensesName = 'Expenses name is required';
      isValid = false;
    } else {
      newErrors.expensesName = '';
    }

    const cleanedValue = value.replace(/,/g, '');
    const amountValue = parseInt(cleanedValue);
    if (!value.trim() || isNaN(amountValue) || amountValue <= 0) {
      newErrors.amount = 'Amount budget is required.';
      isValid = false;
    } else if(amountValue > balance) {
      newErrors.amount = 'The amount exceeds your current balance.';
      isValid = false;
    } else {
      newErrors.amount = '';
    }

    setErrors(newErrors);
    
    if(isValid) {
      const expenses = {
        expensesName,
        amountValue
      }
      await addExpenses(expenses,id);
      setInputModalVisible(false);
      setExpensesName('');
      setValue('');
      getCurrent();
      eventData();
      getHistoryData();
    }
  }

  const handleCashSave = async () => {
    const cleanedValue = cash.replace(/,/g, '');
    const numericValue = parseFloat(cleanedValue);
    console.log(numericValue);
    if(Number.isNaN(numericValue)) {
      alert('Please Enter Cash amount');
    } else {
      await addCash(id,numericValue);
      setAddCashModal(false);
      eventData();
    }
  }

  const handleLongPress = (expens:any) => {
    setOptionModal(true);
    const format = formatMoney(String(expens.amount));
    setEditModal(false);
    setEditAmount(format);
    setEditName(expens.name);
    setExpensId(expens.expense_id);
  }

  const handleEdit = async () => {
    let isValid = true;
    const newErrors = { ...errors };
    
    if (!editName.trim()) {
      newErrors.expensesName = 'Expenses name is required';
      isValid = false;
    } else {
      newErrors.expensesName = '';
    }

    const cleanedValue = editAmount.replace(/,/g, '');
    const amountValue = parseInt(cleanedValue);
    if (!editAmount.trim() || isNaN(amountValue) || amountValue <= 0) {
      newErrors.amount = 'Amount budget is required.';
      isValid = false;
    }else {
      newErrors.amount = '';
    }

    setErrors(newErrors);
    if(isValid) {
      const expenses = {
        editName,
        amountValue
      }
      await editExpenses(expensId,expenses,id);
      setOptionModal(false);
      setEditModal(false);
      getCurrent();
      eventData();
      getHistoryData();
    }
  }

  const handleDelete = async () => {
    const cleanedValue = editAmount.replace(/,/g, '');
    const numericValue = parseFloat(cleanedValue);
    await deleteExpenses(expensId,numericValue,id);
    setOptionModal(false);
    getCurrent();
    eventData();
    getHistoryData();
  }


  const allotedAmount = event?.alloted ? formatMoney(String(event.alloted)) : 'N/A';
  const currentBalance = event?.currentBudget ? formatMoney(String(event.currentBudget)) : 'N/A';
  const budgetLimit = event?.budgetLimit ? formatMoney(String(event.budgetLimit)) : 'N/A';
  return (
    <>
     <TouchableOpacity style={styles.goBackButton} onPress={() => router.push('/event')}>
      <FontAwesome6 name="arrow-left" size={24} color="black" />
      <Text style={styles.goBackText}>Go Back</Text>
    </TouchableOpacity>
    <View style = {styles.main_container}>
      <View style = {styles.money_container}>
        <View style = {styles.balance_container}>
          <Text style = {styles.balance}>Current Balance</Text>
          <TouchableOpacity style = {styles.button_cash} onPress={() => setAddCashModal(true)}>
            <FontAwesome6 name="add" size={15} color="#3C93E5" />
            <Text style = {styles.add_cash_text}>Add Cash</Text>
          </TouchableOpacity>
        </View>
        <View style = {styles.current_balance}>
          <Text style = {styles.amount_balance}>{'\u20B1'}  {currentBalance}</Text>
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
          <TouchableOpacity key={index} onLongPress={() => handleLongPress(expens)}>
            <View style = {styles.list_Container}>
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
          </TouchableOpacity>
        ))
      ) : (
        <View style={styles.Event_Empty}>
          <Text>No Expenses for this event.</Text>
      </View>
      )}
    </ScrollView>
    <View style={styles.add_button_container}>
      <TouchableOpacity style={styles.add_button} onPress={() => setInputModalVisible(true)}>
        <FontAwesome6 name="add" size={30} color="white" />
      </TouchableOpacity>
    </View>
    <Modal
      animationType="fade"
      transparent={true}
      visible={inputModalVisible}
      onRequestClose={() => setInputModalVisible(false)}
    >
      <View style={styles.editModalContainer}>
        <View style={styles.editModalContent}>
          <View style={styles.errorContainer}>
            {errors.expensesName ? <Text style={styles.errorText}>{errors.expensesName}</Text> : null}
          </View>
          <TextInput
              style={styles.input}
              placeholder="Expenses Name"
              value={expensesName}
              onChangeText={setExpensesName}
            />
          <View style={styles.errorContainer}>
            {errors.amount ? <Text style={styles.errorText}>{errors.amount}</Text> : null}
          </View>
          <TextInput
              style={styles.input}
              placeholder='Amount'
              keyboardType='numeric'
              onChangeText={handleChange}
              value={value}
          />
          <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setInputModalVisible(false)}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
        </View>
      </View>
    </Modal>

    <Modal
       animationType="fade"
       transparent={true}
       visible={cashModalVisible}
       onRequestClose={() => setAddCashModal(false)}
    >
      <View style = {styles.addCashModal}>
        <View style = {styles.addCashContent}>
          <View style={styles.input_container}>
              <Text style = {styles.peso_sign}>{'\u20B1'}</Text>
                <TextInput 
                  keyboardType='numeric'
                  value={cash}
                  onChangeText={handleCashChange}
                  placeholder='Enter amount in Peso'
                  placeholderTextColor={"#7F7979"}
                style= {styles.input_box}/>
          </View>
            <TouchableOpacity style={styles.button} onPress={handleCashSave}>
              <Text style={styles.buttonText}>Add Cash</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setAddCashModal(false)}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
        </View> 
      </View>
    </Modal>
    <Modal
        animationType="fade"
        transparent={true}
        visible={optionModal}
        onRequestClose={() => setOptionModal(false)}
      >
        <View style={styles.modalContainer1}>
          <View style={styles.modalContent1}>
            <TouchableOpacity style={styles.button} onPress={() => {setEditModal(true)}}>
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleDelete}>
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setOptionModal(false)}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={editModal}
        onRequestClose={() => setEditModal(false)}
      >
        <View style={styles.modalContainer1}>
          <View style={styles.modalContent1}>
            <TouchableOpacity style={styles.button} onPress={() => setEditModal(true)}>
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleDelete}>
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setEditModal(false)}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={editModal}
        onRequestClose={() => setEditModal(false)}
      >
        <View style={styles.editModalContainer}>
          <View style={styles.editModalContent}>
          <View style={styles.errorContainer}>
            {errors.expensesName ? <Text style={styles.errorText}>{errors.expensesName}</Text> : null}
          </View>
            <TextInput
              style={styles.input}
              placeholder="Expenses Name"
              value={editName}
              onChangeText={setEditName}
            />
            <View style={styles.errorContainer}>
              {errors.amount ? <Text style={styles.errorText}>{errors.amount}</Text> : null}
            </View>
            <TextInput
              keyboardType='numeric'
              style={styles.input}
              placeholder="Amount"
              value={formatMoney(editAmount)}
              onChangeText={setEditAmount}
            />
            <TouchableOpacity style={styles.button} onPress={handleEdit}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setEditModal(false)}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
   </>
  );
}

