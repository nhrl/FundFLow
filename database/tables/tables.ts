import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('fundflow.db');

export const createTables = async () => {
    await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS budget (id INTEGER PRIMARY KEY NOT NULL, total_budget INTEGER, current_budget INTEGER);
        CREATE TABLE IF NOT EXISTS event (event_id INTEGER PRIMARY KEY NOT NULL,event_name TEXT NOT NULL, date TEXT NOT NULL, start TEXT NOT NULL, end TEXT NOT NULL, alloted INTEGER, budgetLimit INTEGER, currentBudget INTEGER);
        CREATE TABLE IF NOT EXISTS expenses (expense_id INTEGER NOT NULL PRIMARY KEY, name TEXT NOT NULL, amount INTEGER NOT NULL, event_id INTEGER NOT NULL, FOREIGN KEY (event_id) REFERENCES event (event_id) ON DELETE CASCADE);
        
        `);
}

export const dropTable = async () => {
    await db.execAsync(`
        DROP TABLE event;
        DROP TABLE budget;
        DROP TABLE expenses;
        `)
}