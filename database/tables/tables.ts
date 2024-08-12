import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('fundflow.db');

export const createTables = async () => {
    await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS budget (id INTEGER PRIMARY KEY NOT NULL, total_budget INTEGER, current_budget INTEGER);
        CREATE TABLE IF NOT EXISTS event (event_id INTEGER PRIMARY KEY NOT NULL,event_name TEXT NOT NULL, date TEXT NOT NULL, start TEXT NOT NULL, end TEXT NOT NULL);
        CREATE TABLE IF NOT EXISTS budget_history (bHistory_id PRIMARY KEY NOT NULL, allocated_budget INTEGER NOT NULL, current_budget INTEGER NOT NULL, event_id INTEGER NOT NULL, FOREIGN KEY (event_id) REFERENCES event (event_id));
        CREATE TABLE IF NOT EXISTS expenses (expense_id INTEGER NOT NULL, name TEXT NOT NULL, amount INTEGER NOT NULL, bHistory_id INTEGER NOT NULL, FOREIGN KEY (bHistory_id) REFERENCES budget_history (bHistory_id));
        CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY NOT NULL, value TEXT NOT NULL, intValue INTEGER);
        INSERT INTO test (value, intValue) VALUES ('test1', 123);
        INSERT INTO test (value, intValue) VALUES ('test2', 456);
        INSERT INTO test (value, intValue) VALUES ('test3', 789);
        `);
}