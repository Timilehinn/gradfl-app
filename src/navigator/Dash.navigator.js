import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, Animated, TouchableOpacity, BackHandler } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {useRoute, useFocusEffect, useIsFocused} from '@react-navigation/native';
import { AuthContext } from '../contexts/authContextApi';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MyShop from '../screens/Dashboard/MyShop';
import Payment from '../screens/Dashboard/Payment';
import Orders from '../screens/Dashboard/Orders';
import EntypoIcon from 'react-native-vector-icons/Entypo'
import FontistoIcons from 'react-native-vector-icons/Fontisto'
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
        <TouchableOpacity onPress={()=>{props.navigation.navigate('MyShop'); setRouteIndex(0)}} activeOpacity={0.6} style={styles.button} >
            <EntypoIcon name="shop" color={isActive(0)? "white" : "grey"} size={26} />
            <Text style={{textAlign: 'center', fontWeight: isActive(0) && 'bold', color: isActive(0)? "white" : "grey", fontSize: 10}}>MyShop</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>{props.navigation.navigate('Payment'); setRouteIndex(1)}} activeOpacity={0.6} style={styles.button} >
            <MaterialIcons name="payment" color={isActive(1)? "white" : "grey"} size={25} />
            <Text style={{textAlign: 'center', fontWeight: isActive(1) && 'bold', color: isActive(1)? "white" : "grey", fontSize: 10}}>Payment</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>{props.navigation.navigate('Orders'); setRouteIndex(2)}} activeOpacity={0.6} style={styles.button} >
            <FontistoIcons name="shopping-bag-1" color={isActive(2)? "white" : "grey"} size={25} />
            <Text style={{textAlign: 'center', fontWeight: isActive(2) && 'bold', color: isActive(2)? "white" : "grey", fontSize: 10}}>Orders</Text>
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
        name="MyShop" 
        component={MyShop} />

      <Tab.Screen 
        name="Payment" 
        component={Payment} />

      <Tab.Screen 
        name="Orders" 
        component={Orders} />
    </Tab.Navigator>
  );
}

export default function Dashboard() {
  return (
      <AllTabs />
  );
}

const styles = StyleSheet.create({
 
  TabBarMainContainer :{
    justifyContent: 'space-around', 
    height: 55, 
    flexDirection: 'row',
    width: '65%',
    borderRadius: 50,
    position: 'absolute',
    bottom: 15,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, .8)'
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