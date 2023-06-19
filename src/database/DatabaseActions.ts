import * as  SQLite from 'expo-sqlite';
import { SQLTransaction, SQLResultSet } from 'expo-sqlite'
import { BankObjectType } from '../types/BankObject.type';
import database from './DatabaseInstance';

export function getAllBanksInfoFromDB(): Promise<BankObjectType[] | []> {
    return new Promise((resolve, reject) => {
        database.transaction((txn: SQLTransaction) => {
            txn.executeSql(
                'SELECT * FROM banks_info',
                [],
                (_: SQLTransaction, resultSet: SQLResultSet) => {
                    const data: BankObjectType[] = resultSet.rows._array;
                    resolve(data)
                },
                () => {
                    reject([])
                    return false
                },
            );
        });
    })
}


export function insertBankInfoIntoDB(item: BankObjectType) {
    return new Promise((resolve, reject) => {
        database.transaction((txn: SQLTransaction) => {
            txn.executeSql(
                'INSERT INTO banks_info (bankName, description, age, url) VALUES (?, ?, ?, ?)',
                [item.bankName, item.description, item.age, item.url],
                () => resolve('Successful registration'),
                (error: SQLTransaction) => {
                    reject(`Error during registration: ${error}`)
                    return true
                }
            );
        });
    })
}