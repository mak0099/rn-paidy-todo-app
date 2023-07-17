import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/home-screen';
import AuthScreen from '../screens/auth-screen';

const RootStack = createStackNavigator();

const RootNavigation = () => {
	return (
		<RootStack.Navigator screenOptions={{ headerShown: false }} initialRouteName='AuthScreen'>
			<RootStack.Screen name='AuthScreen' component={AuthScreen} />
			<RootStack.Screen name='HomeScreen' component={HomeScreen} />
		</RootStack.Navigator>
	)
}

export default RootNavigation;
