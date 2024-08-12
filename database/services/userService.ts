import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('fundflow.db')

export const getData = async () => {
    const allRows = await db.getAllAsync('SELECT * FROM test');
    console.log(allRows);
};