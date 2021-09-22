import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, Animated, Alert, TouchableOpacity, BackHandler } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {useRoute, useFocusEffect, useIsFocused} from '@react-navigation/native';
import { AuthContext } from '../contexts/authContextApi';
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '../screens/Dashboard/HomeScreen';
import TwoScreen from '../screens/Dashboard/TwoScreen';
import AddMoney from '../screens/Dashboard/AddMoney';
import ProfileScreen from '../screens/Dashboard/ProfileScreen';
import ThreeScreen from '../screens/Dashboard/ThreeScreen';
import FaIcon from 'react-native-vector-icons/FontAwesome'
import AntIcon from 'react-native-vector-icons/AntDesign';
import FeatherIcon from 'react-native-vector-icons/Feather'
import * as RootNavigation from './RootNavigation'
import { Button, Paragraph, Dialog, Portal, Provider } from 'react-native-paper';

function CustomTabBar(props) {

   const [ routeIndex, setRouteIndex ] = useState(0)
   const { auth, setAuth } = useContext(AuthContext);

   const isActive = (index) =>{
        if(index == routeIndex){
            
            return true
        }
   }

   

   const route = useRoute();
    useFocusEffect(
        React.useCallback(() => {
          const onBackPress = () => {
            if (route.name === 'Dashboard') {
                console.log('nope')
                showDialog()
              return true;
            } else {
              return false;
            }
          };
    
          BackHandler.addEventListener('hardwareBackPress', onBackPress);
    
          return () =>
            BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, [route]),
      );

      const [visible, setVisible] = React.useState(false);

      const showDialog = () => setVisible(true);
    
      const hideDialog = () => setVisible(false);


  return (
    <>
        <Portal>
          <Dialog visible={visible} style={{borderRadius: 15}} onDismiss={hideDialog}>
            <Dialog.Title>Exit Cashlead?</Dialog.Title>
            <Text style={{marginLeft: 20, fontSize: 16}}>Do you want to close cashlead?</Text>
            <Dialog.Actions>
                <View style={{alignItems: 'center', flexDirection: 'row'}}>
                    <TouchableOpacity style={{margin: 10}} onPress={()=>{hideDialog(); BackHandler.exitApp()}}>
                        <Text style={{fontWeight: 'bold', color: 'grey'}}>Exit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{margin: 10}} onPress={hideDialog}>
                        <Text style={{fontWeight: 'bold'}}>Nope</Text>
                    </TouchableOpacity>
                </View>
               
            </Dialog.Actions>
          </Dialog>
        </Portal>
    <View style={styles.TabBarMainContainer}>
        <TouchableOpacity onPress={()=>{props.navigation.navigate('Home'); setRouteIndex(0)}} activeOpacity={0.6} style={styles.button} >
            <AntIcon name="home" color={isActive(0)? "rgb(41,42,60)" : "grey"} size={28} />
            <Text style={{textAlign: 'center', fontWeight: isActive(0) && 'bold', color: isActive(0)? "rgb(41,42,60)" : "grey", fontSize: 11}}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>{props.navigation.navigate('Two'); setRouteIndex(1)}} activeOpacity={0.6} style={styles.button} >
            <FeatherIcon name="briefcase" color={isActive(1)? "rgb(41,42,60)" : "grey"} size={27} />
            <Text style={{textAlign: 'center', fontWeight: isActive(1) && 'bold', color: isActive(1)? "rgb(41,42,60)" : "grey", fontSize: 11}}>Screen 2</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>{props.navigation.navigate('Three'); setRouteIndex(2)}} activeOpacity={0.6} style={styles.button} >
            <FeatherIcon name="list" color={isActive(2)? "rgb(41,42,60)" : "grey"} size={27} />
            <Text style={{textAlign: 'center', fontWeight: isActive(2) && 'bold', color: isActive(2)? "rgb(41,42,60)" : "grey", fontSize: 11}}>Screen 3</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>{props.navigation.navigate('Profile'); setRouteIndex(4)}} activeOpacity={0.6} style={styles.button} >
            <AntIcon name="user" color={isActive(4)? "rgb(41,42,60)" : "grey"} size={30} />
            <Text style={{textAlign: 'center', fontWeight: isActive(4) && 'bold', color: isActive(4)? "rgb(41,42,60)" : "grey", fontSize: 11}}>Me</Text>
        </TouchableOpacity>
    </View>
    </>
  );
}

const Tab = createBottomTabNavigator();

function AllTabs() {
  return (
    <Tab.Navigator screenOptions={{
        headerShown: false
    }}  tabBar={(props) => <CustomTabBar {...props} />}>

      <Tab.Screen 
        name="Home" 
        component={HomeScreen} />

      <Tab.Screen 
        name="Two" 
        component={TwoScreen} />

      <Tab.Screen 
        name="Three" 
        component={ThreeScreen} />

      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} />

<Tab.Screen 
        name="Add Money" 
        component={AddMoney} />

    </Tab.Navigator>
  );
}

export default function Dashboard() {
  return (
      <AllTabs />
  );
}

const styles = StyleSheet.create({
 
  // TabBarMainContainer :{
  //   justifyContent: 'space-around', 
  //   height: 55, 
  //   flexDirection: 'row',
  //   width: '65%',
  //   borderRadius: 50,
  //   position: 'absolute',
  //   bottom: 40,
  //   alignSelf: 'center',
  //   alignItems: 'center',
  //   backgroundColor: 'rgb(41,42,60)'
  // },

  TabBarMainContainer :{
    justifyContent: 'space-around', 
    height: 60, 
    flexDirection: 'row',
    width: '100%',
    // borderTopRightRadius: 30,
    // borderTopLeftRadius: 30,
    // position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    elevation: 5
  },

   
  button: {
    height: 50,
    paddingTop:5,
    paddingBottom:5,
    justifyContent: 'center', 
    alignItems: 'center', 
    flexGrow: 1
  },
   
  TextStyle:{
      color:'#fff',
      textAlign:'center',
      fontSize: 20
  }
   
  });