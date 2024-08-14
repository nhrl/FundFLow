import * as SQLite from 'expo-sqlite';
import { formatMoney } from './formatMoney';

interface BudgetResult {
    total_budget: number;
    current_budget:number;
}

const db = SQLite.openDatabaseSync('fundflow.db');

export const getTotalBudget = async () => {
    const result: BudgetResult | null = await db.getFirstAsync('SELECT total_budget FROM budget LIMIT 1');
    const totalBudget = result?.total_budget || 0;
    return result?.total_budget ?? 0;
}

export const getCurrentBudget = async () => {
    const result: BudgetResult | null = await db.getFirstAsync('SELECT current_budget FROM budget LIMIT 1');
    const currentBudget = result?.current_budget;
    let formattedMoney = currentBudget !== undefined ? currentBudget.toString() : '0';
    const formattedText = formatMoney(formattedMoney);
    return formattedText
}

export const subtractBudget = async (allocatedBudget: number) => {
    const result: BudgetResult | null = await db.getFirstAsync('SELECT current_budget FROM budget LIMIT 1');
    let currentBudget = result?.current_budget;
        if(currentBudget != undefined) {
            currentBudget -= allocatedBudget;
            await db.runAsync('UPDATE budget SET current_budget = ? WHERE id = ?', [currentBudget, 1]);
        }
}

export const addBudget = async (totalBudget: number) => {
    await db.execAsync(`INSERT INTO budget (total_budget, current_budget) VALUES (${totalBudget}, ${totalBudget})`);
}

export const checkBudget = async (): Promise<boolean> => {
    try {
      const result: BudgetResult | null = await db.getFirstAsync('SELECT total_budget FROM budget LIMIT 1');
      const budget = result ? result.total_budget : 0;
      return budget > 0;
    } catch (error) {
      console.error('Error fetching budget:', error);
      return false;
    }
}

export const dropTable = async () => {
    await db.execAsync(`DROP TABLE budget`);
}