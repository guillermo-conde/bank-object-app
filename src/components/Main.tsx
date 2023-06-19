import { StatusBar } from 'expo-status-bar';
import { MainStyles } from './Styles';

import {
    View,
} from 'react-native';
import List from './List/List';

export default function Main() {
    return (
        <View style={MainStyles.container}>
            <StatusBar style="auto" />
            <List />
        </View>
    );
}


