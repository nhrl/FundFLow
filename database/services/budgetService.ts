import * as SQLite from 'expo-sqlite';


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
    const totalBudget = result?.current_budget || 0;
    return result?.current_budget ?? 0;
}

export const subtractBudget = async (allocatedBudget: number) => {
    const result: BudgetResult | null = await db.getFirstAsync('SELECT current_budget FROM budget LIMIT 1');
    let currentBudget = result?.current_budget;
        if(currentBudget != undefined) {
            currentBudget -= allocatedBudget;
           await db.runAsync('UPDATE budget SET current_budget = ? WHERE id = ?', [currentBudget, 1]);
        } 
}

export const addCurrentBudget = async (currentBudget: number) => {
    await db.runAsync('UPDATE budget SET current_budget = ? WHERE id = ?', [currentBudget, 1]);
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

export const addCash = async (budget : number) => {
    const total: BudgetResult | null = await db.getFirstAsync('SELECT total_budget FROM budget LIMIT 1');
    const current: BudgetResult | null = await db.getFirstAsync('SELECT current_budget FROM budget LIMIT 1');
    let totalBudget = total?.total_budget || 0;
    let totalCurrent = current?.current_budget || 0;

    totalBudget += budget;
    totalCurrent += budget;

    await db.runAsync(`UPDATE budget SET total_budget = ?, current_budget = ? WHERE id = ?`,
        totalBudget,
        totalCurrent,
        1
    )
}
