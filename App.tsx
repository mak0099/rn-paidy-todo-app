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
  StatusBar
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import RootNavigation from './src/navigations/root-navigation';

function App(): JSX.Element {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f3f3f3' }}>
      <StatusBar barStyle={'light-content'} backgroundColor={'#737373'} />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <NavigationContainer>
          <RootNavigation />
        </NavigationContainer>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default App;