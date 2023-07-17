import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import colors from '../constants/colors';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

const AuthScreen = ({ navigation }: NativeStackScreenProps<any, any>) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Set Authentication to Proceed
            </Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('HomeScreen')}>
                <Text style={styles.buttonText}>Go to Settings</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    text: {
        fontSize: 16,
        textAlign: 'center',
        margin: 15,
        color: colors.black,
        fontWeight: '500'
    },
    button: {
        maxWidth: 150,
        paddingHorizontal: 25,
        paddingVertical: 10,
        backgroundColor: colors.primary,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: colors.white,
        fontWeight: 'bold',
        textAlign: 'center'
    }
});

export default AuthScreen;