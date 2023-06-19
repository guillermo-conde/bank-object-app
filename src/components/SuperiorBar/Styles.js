import Constants from 'expo-constants'
import { StyleSheet } from 'react-native';

export const SuperiorBarStyles = StyleSheet.create({
    container: {
        width: '100%',
        height: 50,
        marginTop: Constants.statusBarHeight,
        backgroundColor: 'blue',
        justifyContent: 'center',
        paddingHorizontal: 10
    },
    text: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20
    }
})