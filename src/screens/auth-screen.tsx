import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Platform,
    Linking
} from 'react-native';
import colors from '../constants/colors';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as LocalAuthentication from 'expo-local-authentication';

const AuthScreen = ({ navigation }: NativeStackScreenProps<any, any>) => {
    // Define states
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Authenticate at the beginning
    useEffect(() => {
        authenticate();
    }, []);

    // Go to the Home screen whenever authentication success
    useEffect(() => {
        if (isAuthenticated) {
            navigation.navigate('HomeScreen')
        }
    }, [isAuthenticated]);

    // Authenticate from the user
    async function authenticate() {
            const result = await LocalAuthentication.authenticateAsync();
            setIsAuthenticated(result.success);
    }
    async function gotToSettings() {

        // read the device is secured or not
        const isDeviceSecured = await LocalAuthentication.getEnrolledLevelAsync();

        // if device is not secured go to the device settings
        if(!isDeviceSecured){
            Platform.OS === 'ios'
                ? Linking.openURL('App-Prefs:root=TOUCHID_PASSCODE')
                : Linking.sendIntent("android.settings.SECURITY_SETTINGS");
        }
        authenticate()
    }
    return (
        <>
            <View style={styles.container}>
                <Text style={styles.text}>
                    Set Authentication to Proceed
                </Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={gotToSettings}>
                    <Text style={styles.buttonText}>Go to Settings</Text>
                </TouchableOpacity>
            </View>
        </>
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