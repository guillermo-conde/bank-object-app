import { Image, Text, View } from "react-native";
import { ListHeaderStyles } from "./Styles";

export default function ListItemHeader({ imageUrl, title }: { imageUrl: string, title: string }) {
    return (
        <View
            style={ListHeaderStyles.container}>
            <Image
                style={ListHeaderStyles.image}
                source={{ uri: imageUrl }}
            />

            <Text
                style={ListHeaderStyles.title}>
                {title}
            </Text>
        </View>
    )
}