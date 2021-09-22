import React, { useEffect, useRef, useContext, useState, useCallback } from 'react'
import { View, Text, Animated, StatusBar, SafeAreaView, RefreshControl, ActivityIndicator, ToastAndroid, ScrollView, TouchableOpacity, Alert } from 'react-native';
import colors from '../../util/colors';
import { AuthContext } from '../../contexts/authContextApi';
import { Appbar } from 'react-native-paper';
import UpdateInfo from './UpdateInfo';
import AntIcon from 'react-native-vector-icons/AntDesign';
import AddBankInfo from '../../components/addBankInfo'
import axios from '../../util/util';
import { Paystack } from 'react-native-paystack-webview'
import FaIcon from 'react-native-vector-icons/FontAwesome';
import { Button, Menu, Divider, Provider } from 'react-native-paper';



function Pay(prop){

  
    return (
        <Paystack  
        paystackKey="pk_test_a3f0b78249dd76efcd7887e4949399917a011bdf"

        amount={'25000.00'}
        billingEmail="paystackwebview@something.com"
        activityIndicatorColor="green"
        onCancel={(e) => {
          // handle response here
          ToastAndroid.showWithGravityAndOffset(
                'You canceled the transaction',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,50
            );

        }}
        onSuccess={(res) => {
          // handle response here
          prop.updateBal()
          
         
          
        }}
        autoStart={true}
      />
    );
  }


function HomeScreen({ navigation }) {
    
    const { userDetails, setUserDetails, showUpdateInfo } = useContext(AuthContext);
    const [ loading, setLoading ] = useState(false)
    const [ bankModal, showBankModal ] = useState(false)
    const [visible, setVisible] = React.useState(false);

    const openMenu = () => setVisible(true);
  
    const closeMenu = () => setVisible(false);

    useEffect(()=>{
        if(!userDetails.details.profileUpdated){
            showUpdateInfo(true)
        }
    },[])

    const updateBal=()=>{
        axios.post(`/user/deposit-cash/${userDetails.details?._id}`)
      .then(res=>{
        setUserDetails(res.data);
        ToastAndroid.showWithGravityAndOffset(
            res.data.message,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,50
        );
      })
      .catch(err=>{
          console.log(err)
        ToastAndroid.showWithGravityAndOffset(
            'An error occurred',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,50
        );
      })
      }

    const removeDetails=()=>{
        setLoading(true)
        axios.post(`/user/remove-bankinfo/${userDetails.details._id}`)
        .then(res=>{
            setLoading(false)
            setUserDetails(res.data);
            ToastAndroid.showWithGravityAndOffset(
                res.data.message,
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,50
            );
        })
        .catch(err=>{
            setLoading(false)
            ToastAndroid.showWithGravityAndOffset(
                err.message,
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,50
            );
        })
    }


    return (
        <>
        <StatusBar
              barStyle={'light-content'}
        />

        <Appbar.Header statusBarHeight={0} style={{backgroundColor: 'white', elevation: 2}}>
            <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center'}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <TouchableOpacity style={{borderRadius: 50, width: 30, height: 30, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: 'rgb(41,42,60)'}} />
                    {userDetails.details?.firstname? (
                        <Text style={{marginLeft: 10, color: 'rgb(41,42,60)'}}>Hello {userDetails.details?.firstname}</Text>
                    ):(
                        <Text style={{marginLeft: 10, color: 'rgb(41,42,60)'}}>Hello!</Text>
                    )}
                </View>
            </View>
        </Appbar.Header>
        <ScrollView 
            refreshControl={
                <RefreshControl />
            }
        >
            <View style={{flex: 1, alignItems: 'center', with: '90%'}}>
            <View style={{backgroundColor: 'white', width: '90%', marginBottom: 20, alignItems: 'center',  height: 150, borderRadius: 15, marginTop: 30}}>
                <View style={{flexDirection: 'row', padding: 10, alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
                    <View />
                        <Menu
                        visible={visible}
                        onDismiss={closeMenu}
                        anchor={
                        <TouchableOpacity style={{padding: 10}}onPress={openMenu}>
                            <Text>Add Money</Text>
                            {/* <FaIcon size={20} name="ellipsis-v" color="black" /> */}
                        </TouchableOpacity>}>
                        <Pay id={userDetails.details?._id} updateBal={updateBal}/>
                        </Menu>
                    </View>
                <Text style={{color: 'grey'}}>Account Balance</Text>
                <Text style={{fontWeight: 'bold', fontSize: 30}}>₦{userDetails.details.wallet_balance}</Text>
            </View>
              
                    <View style={{width: '90%', backgroundColor: 'white', marginBottom: 10, alignItems: 'center', borderWidth: .5, borderColor: 'lightgrey', borderRadius: 20}}>
                        <View style={{flexDirection: 'row', width: '100%', padding: 10, alignItems: 'center', justifyContent: 'flex-start'}}>
                            <Text>Quick Actions</Text>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <TouchableOpacity onPress={()=>Alert.alert('Buy Airtime', 'lorem ipsum')} style={{borderWidth: .5, borderColor: 'lightgrey', margin: 5, padding: 10, borderRadius: 20}} >
                                <Text>Buy Airtime</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>Alert.alert('Buy Data', 'lorem ipsum')} style={{borderWidth: .5, borderColor: 'lightgrey', margin: 5, padding: 10, borderRadius: 20}} >
                                <Text>Buy Data</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>Alert.alert('Send Cash', 'lorem ipsum')} style={{borderWidth: .5, borderColor: 'lightgrey', margin: 5, padding: 10, borderRadius: 20}} >
                                <Text>Send Cash</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{width: '90%', backgroundColor: 'white', padding: 10, alignItems: 'center', borderWidth: .5, borderColor: 'lightgrey', borderRadius: 20}}>
                        <View style={{flexDirection: 'row', width: '90%', alignItems: 'center', justifyContent: 'space-between'}}>
                            <Text>Content</Text>
                            <Text>View All</Text>
                        </View>
                        <View style={{width: '100%', padding: 15, alignItems: 'center', flexDirection: 'row'}} >
                            <Text>Lorem Ipsum</Text>
                        </View>
                        <View style={{width: '100%', padding: 15, alignItems: 'center', flexDirection: 'row'}} >
                            <Text>Lorem Ipsum</Text>
                        </View>
                        <View style={{width: '100%', padding: 15, alignItems: 'center', flexDirection: 'row'}} >
                            <Text>Lorem Ipsum</Text>
                        </View>
                    </View>
            </View>
        </ScrollView>
        <UpdateInfo />
        </>
    )
}

export default HomeScreen
