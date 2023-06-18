import { Image, Text, View, StyleSheet } from "react-native";
import { BankObjectType } from "../types/BankObject.type";

export default function ListItem({ item }: { item: BankObjectType }) {
    return (
        <View
            style={styles.listItem}>
            <Image
                style={styles.image}
                source={{ uri: item.url }}
            />
            <View>
                <Text
                    style={styles.title}
                >{item.bankName}
                </Text>
                <Text
                    style={styles.text}
                >Edad: {item.age}
                </Text>

                <Text
                    style={styles.text}
                >Descripción: {item.description}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    listItem: {
        flexDirection: 'row'
    },
    text: {
        color: '#fff'
    },
    image: {
        width: 60,
        height: 60,
        marginRight: 10
    },
    title: {
        fontWeight: 'bold',
    }
});