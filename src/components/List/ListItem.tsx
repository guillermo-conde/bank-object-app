import { TouchableOpacity } from "react-native";
import { BankObjectType } from "../../types/BankObject.type";
import { useState } from "react";
import ListItemHeader from "./ListItemHeader";
import ListItemBody from "./ListItemBody";
import { ListItemStyles } from "./Styles";

export default function ListItem({ item }: { item: BankObjectType }) {
    const [isPressed, setIsPressed] = useState<boolean>(false)
    return (
        <TouchableOpacity
            onPress={() => setIsPressed(!isPressed)}
            style={ListItemStyles.container}>
            <ListItemHeader
                title={item.bankName}
                imageUrl={item.url}
            />
            {isPressed &&
                <ListItemBody
                    age={item.age}
                    description={item.description}
                />
            }
        </TouchableOpacity>
    )
}