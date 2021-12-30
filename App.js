import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/screens/Login'
import AuthContext from './src/contexts/authContextApi';
import Dashboard from './src/navigator/Dash.navigator';
import { navigationRef } from './src/navigator/RootNavigation';
import { Provider } from 'react-native-paper';

const RootStack = createNativeStackNavigator();

export default function App() {


  return (
    <Provider>
      <AuthContext>
        <NavigationContainer ref={navigationRef}>
          <RootStack.Navigator 
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName='Login'
          >
            <RootStack.Screen name="Login" component={Login} />
            <RootStack.Screen
                name="Dashboard"
                component={Dashboard}
            />
          </RootStack.Navigator>
        </NavigationContainer>
      </AuthContext>
    </Provider>
  );
}
