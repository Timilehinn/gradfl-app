import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './src/screens/WelcomeScreen'
import HomeContext from './src/contexts/homeContextApi';
import AuthContext from './src/contexts/authContextApi';
import Dashboard from './src/navigator/Dash.navigator';
import { navigationRef } from './src/navigator/RootNavigation';
import { Provider } from 'react-native-paper';

const RootStack = createNativeStackNavigator();


export default function App() {


  return (
    <Provider>
      <HomeContext>
        <AuthContext>
          <NavigationContainer ref={navigationRef}>
            <RootStack.Navigator 
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName='Welcome'
            >
              <RootStack.Screen name="Welcome" component={WelcomeScreen} />
              <RootStack.Screen
                  name="Dashboard"
                  component={Dashboard}
              />
            </RootStack.Navigator>
          </NavigationContainer>
        </AuthContext>
      </HomeContext>
    </Provider>
  );
}
