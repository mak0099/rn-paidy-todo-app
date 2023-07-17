/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  useColorScheme
} from 'react-native';

import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigation from './src/navigations/root-navigation';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f3f3f3' }}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <NavigationContainer>
          <RootNavigation />
        </NavigationContainer>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

registerRootComponent(App);
export default App;