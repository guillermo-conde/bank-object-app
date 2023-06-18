import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants'
import {
    StyleSheet,
    View,
} from 'react-native';
import List from './List';

export default function Main() {
    return (
        <View style={styles.container}>
            <List />
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: Constants.statusBarHeight,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
});
