import { addCurrentBudget } from './budgetService';
import { ScrollView } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('fundflow.db');

interface eventResult {
    budgetLimit: number;
    alloted:number;
    currentBudget:number;
}

interface expensesResult {
    amount:number;
}

//History Expenses
export const getHistory = async (id:any) => {
    const result = await db.getAllAsync(`SELECT * FROM expenses where event_id = ?`,[id]);
    return result;
}

export const getEvent = async (id:any) => {
    const result = await db.getFirstAsync(`SELECT * FROM event where event_id = ?`,[id]);
    return result;
}



//Expenses
export const addCash = async (id:any, cash:number) => {

    const result: eventResult | null = await db.getFirstAsync(`SELECT currentBudget, alloted, budgetLimit FROM event WHERE event_id = ?`,[id]);
    const current = result?.currentBudget || 0;
    const limit = result?.budgetLimit || 0;
    const alloted = result?.alloted || 0;
    const totalAfterAddition = alloted + cash;
    const totalCurrent = current + cash;
    if(totalAfterAddition > limit) {
        alert('Budget exceeds the limit!');
    } else {
        await db.runAsync('UPDATE event SET currentBudget = ?, alloted = ? WHERE event_id = ?', [totalCurrent,totalAfterAddition,id]);
        alert('Cash added Successfully')
    }
    
}

export const getCurrentBudget = async (id:any) => {
    const result: eventResult | null = await db.getFirstAsync(`SELECT currentBudget FROM event WHERE event_id = ?`,[id]);
    const current = result?.currentBudget || 0;
    return current;
}

export const addExpenses = async (expens:any,id:any) => {
    let isValid = false;
    try {
        await db.runAsync(`INSERT INTO expenses (name,amount,event_id) VALUES (?,?,?)`,[expens.expensesName,expens.amountValue,id]); 
        isValid = true; 
    } catch (error) {
        isValid = false;
    }
    
    if(isValid) {
        const result: eventResult | null = await db.getFirstAsync(`SELECT currentBudget FROM event where event_id = ?`,[id]);
        let current = result?.currentBudget || 0;
        current = current - expens.amountValue;
        await db.runAsync(`UPDATE event SET currentBudget = ? where event_id = ?`,[current,id]);
    }
    
}

export const deleteExpenses = async (expensesid:any, amount:number, eventid:any) => {
    try {
        await db.runAsync(`DELETE FROM expenses WHERE expense_id = ?`, [expensesid]);
        let currentBudget = await getCurrentBudget(eventid);
        currentBudget += amount;
        await db.runAsync(`UPDATE event SET currentBudget = ? where event_id = ?`,[currentBudget,eventid]);
        alert("Expenses Deleted Successfully");
    } catch (error) {
        console.error('Error deleting expenses:', error);
    }
}

export const editExpenses = async (expensesid:any, expenses:any, eventid:any) => {
    try {
        const amount: expensesResult | null = await db.getFirstAsync(`SELECT amount FROM expenses where expense_id = ?`,[expensesid]);
        let currentBudget = await getCurrentBudget(eventid);
        const totalAmount = amount?.amount || 0;
        currentBudget += totalAmount;
        
        if(currentBudget - expenses.amountValue < 0) {
            alert('The amount exceeds your current balance.');
        } else {
            currentBudget -= expenses.amountValue;
            await updateData(currentBudget,expenses,eventid,expensesid);
            alert('Expenses Details Updated Successfully')
        }
        
    } catch (error) {
        console.error('Error updating expenses:', error);
    }
}

export const updateData = async (current:number,expenses:any,eventid:number,expensesid:number) => {
    await db.runAsync(`UPDATE expenses SET name = ?, amount = ? where expense_id = ?`,[expenses.editName,expenses.amountValue,expensesid]);
    await db.runAsync(`UPDATE event SET currentBudget = ? where event_id = ?`,[current,eventid]);
}