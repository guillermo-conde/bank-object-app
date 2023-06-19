import { Text, View } from "react-native";
import { ListBodyStyles } from "./Styles";

export default function ListItemBody({ age, description }: { age: number; description: string }) {
    return (
        <View
            style={ListBodyStyles.container}>
            <Text
                style={ListBodyStyles.text}>
                Edad: {age}
            </Text>
            <Text
                style={ListBodyStyles.text}>
                Descripción: {description}
            </Text>
        </View>
    )
}