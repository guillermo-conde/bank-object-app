import * as  SQLite from 'expo-sqlite';

const database = SQLite.openDatabase('banks_database.db');

export default database