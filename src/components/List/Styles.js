import { StyleSheet } from "react-native";

export const ScrollableList = StyleSheet.create({
    container: {
        flex: 1
    }
})

export const ListContainerStyles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        minWidth: '100%',
        flex: 1
    }
});

export const ListItemStyles = StyleSheet.create({
    container: {
        elevation: 5
    }
})

export const ListHeaderStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 5,
        elevation: 5,
        alignItems: 'center'
    },
    image: {
        width: 60,
        height: 60,
        marginRight: 10
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18
    },
})

export const ListBodyStyles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 16
    }
})