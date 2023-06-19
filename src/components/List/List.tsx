import { FlatList, SafeAreaView, Text } from "react-native";
import { useEffect, useState } from 'react';
import { BankObjectType } from '../../types/BankObject.type';
import database from '../../database/DatabaseInstance';
import ListItem from "./ListItem";
import { SQLTransaction } from 'expo-sqlite'
import { ListContainerStyles } from "./Styles";
import { getAllBanksInfoFromDB, insertBankInfoIntoDB } from "../../database/DatabaseActions";


export default function List() {
    const [banksData, setBanksData] = useState<BankObjectType[] | []>([])
    const [isDatabaseFetched, setIsDatabaseFetched] = useState<boolean>(false)

    const fetchDatabase = async (): Promise<void> => {
        getAllBanksInfoFromDB()
            .then(
                databaseResponse => setBanksData(databaseResponse)
            ).catch(
                error => setBanksData(error)
            ).finally(
                () => setIsDatabaseFetched(true)
            )
    }

    const fetchBanksInfo = async (): Promise<void> => {
        try {
            const banksInfo: BankObjectType[] | [] = await global.fetch(
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
                    async () => {
                        for (const item of banksInfo) {
                            insertBankInfoIntoDB(item)
                                .then(
                                    databaseResponse => console.log(databaseResponse)
                                ).catch(
                                    error => console.error(error)
                                )
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
                style={ListContainerStyles.container}
            />
        </SafeAreaView>

    )
}