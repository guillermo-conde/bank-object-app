import { Text, View } from "react-native";
import { SuperiorBarStyles } from "./Styles";

export default function SuperiorBar() {
    return (
        <View
            style={SuperiorBarStyles.container}>
            <Text
                style={SuperiorBarStyles.text}>
                Lista de bancos
            </Text>
        </View>
    )
}