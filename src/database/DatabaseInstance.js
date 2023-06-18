import * as  SQLite from 'expo-sqlite';

// Crea una instancia de la base de datos SQLite
const database = SQLite.openDatabase(
    // {
    //     name:
    'banks_database.db',
    // location: 'default',
    // },
    // () => console.log('abierta'),
    // error => console.error('Error opening the database:', error),
);

export default database