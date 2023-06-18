import { FlatList, SafeAreaView, Text } from "react-native";
import { useEffect, useState } from 'react';
import { BankObjectType } from '../../src/types/BankObject.type';
import database from '../../src/database/DatabaseInstance';
import ListItem from "./ListItem";
import { SQLTransaction, SQLResultSet } from 'expo-sqlite'

export default function List() {
    const [banksData, setBanksData] = useState<BankObjectType[]>([])
    const [isDatabaseFetched, setIsDatabaseFetched] = useState<boolean>(false)

    const fetchDatabase = (): void => {
        database.transaction((txn: SQLTransaction) => {
            txn.executeSql(
                'SELECT * FROM banks_info',
                [],
                (_: SQLTransaction, resultSet: SQLResultSet) => {
                    const data = resultSet.rows._array;
                    setBanksData(data);
                    setIsDatabaseFetched(true)
                },
                () => {
                    setBanksData([])
                    setIsDatabaseFetched(true)
                    return true
                },
            );
        });
    }

    const fetchBanksInfo = async (): Promise<void> => {
        try {
            const banksInfo: BankObjectType[] = await global.fetch(
                'https://dev.obtenmas.com/catom/api/challenge/banks'
            ).then(
                response => {
                    if (response.status !== 200) {
                        return []
                    }
                    return response.json()
                }
            )

            database.transaction((tx: SQLTransaction) => {
                tx.executeSql(
                    'CREATE TABLE IF NOT EXISTS banks_info (id INTEGER PRIMARY KEY AUTOINCREMENT, bankName TEXT, description TEXT, age TEXT, url TEXT)',
                    [],
                    () => {
                        for (const item of banksInfo) {
                            tx.executeSql(
                                'INSERT INTO banks_info (bankName, description, age, url) VALUES (?, ?, ?, ?)',
                                [item.bankName, item.description, item.age, item.url],
                                () => console.log('Successful registration'),
                                (error: SQLTransaction) => {
                                    console.error('Error during registration:', error)
                                    return true
                                }
                            );
                        }
                    },
                    (error: SQLTransaction) => {
                        console.log('Error during creating table:', error)
                        return true
                    }

                );
            });

            setBanksData(banksInfo)

        } catch (error) {
            console.error(error)
            setBanksData([])
        }
    }

    useEffect(() => {
        if (!isDatabaseFetched) {
            fetchDatabase()
        }
        if (isDatabaseFetched && banksData.length === 0) {
            fetchBanksInfo()
        }
    }, [isDatabaseFetched])

    return (
        <SafeAreaView>
            <FlatList
                data={banksData}
                ItemSeparatorComponent={() => <Text></Text>}
                renderItem={({ item }: { item: BankObjectType }) => (
                    <ListItem item={item} />
                )}
                ListEmptyComponent={<Text>Ha ocurrido un error</Text>}
            />
        </SafeAreaView>
    )
}