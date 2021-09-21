import React, { useEffect, useContext, useRef, useState, useCallback } from 'react'
import { View, Text, Animated, StatusBar, SafeAreaView, RefreshControl, ActivityIndicator, ToastAndroid, ScrollView, TouchableOpacity, Alert } from 'react-native';
import colors from '../../util/colors';
import { AuthContext } from '../../contexts/authContextApi';
import { Appbar, Divider } from 'react-native-paper';
import UpdateInfo from './UpdateInfo';
import AntIcon from 'react-native-vector-icons/AntDesign';
import AddBankInfo from '../../components/addBankInfo'
import axios from '../../util/util'

function HomeScreen({ navigation }) {
    
    const { userDetails, setUserDetails, showUpdateInfo } = useContext(AuthContext);
    const [ loading, setLoading ] = useState(false)
    const [ bankModal, showBankModal ] = useState(false)

    useEffect(()=>{
        if(!userDetails.details.profileUpdated){
            showUpdateInfo(true)
        }
    },[])

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
            <View style={{backgroundColor: 'white', width: '90%', marginBottom: 20, alignItems: 'center', justifyContent: 'center', height: 150, borderRadius: 15, marginTop: 30}}>
                {loading && <ActivityIndicator color="black" />}
                {userDetails.details?.bankName ? (
                    <>
                        <Text style={{margin: 0, color: 'rgb(41,42,60)', fontSize: 15, textTransform: 'uppercase', fontWeight: 'bold'}}>
                            {userDetails.details?.lastname} {userDetails.details?.firstname}
                        </Text>
                        <Text style={{margin: 0, color: 'rgb(41,42,60)', fontSize: 15, textTransform: 'uppercase', fontWeight: 'bold'}}>
                            {userDetails.details?.bankName}
                        </Text>
                        <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                            <Text style={{margin: 0, color: 'rgb(41,42,60)', fontSize: 12}}>
                                {userDetails.details?.bankAccountNumber} 
                            </Text>
                        </View>
                        <View style={{flexDirection: 'row', margin: 5, alignItems: 'center'}}>
                            <View style={{padding: 5, borderWidth: .5, borderColor: 'lightgrey'}}>
                                <AddBankInfo bankModal={bankModal} showBankModal={showBankModal} label="Update details" />
                            </View>
                            {userDetails.details?.bankName && (
                                <TouchableOpacity onPress={()=>removeDetails()} style={{padding: 5, margin: 5, borderWidth: .5, borderColor: 'lightgrey'}}>
                                    <Text>remove details</Text>
                                </TouchableOpacity>
                            )}
                           
                        </View>
                        
                    </>
                ) : (
                    <TouchableOpacity style={{alignItems: 'center'}}>
                        <Text style={{fontSize: 20, fontWeight: 'bold'}}> No Bank Details </Text>
                        {/* <Text style={{fontSize: 12, color: 'grey'}}>Tap to update profile details</Text> */}
                        <View style={{padding: 5, borderWidth: .5, borderColor: 'lightgrey'}}>
                            <AddBankInfo bankModal={bankModal} showBankModal={showBankModal} label="Add details" />
                        </View>
                    </TouchableOpacity>
                )}
                
            </View>
              
                    <View style={{width: '90%', backgroundColor: 'white', marginBottom: 10, alignItems: 'center', borderWidth: .5, borderColor: 'lightgrey', borderRadius: 20}}>
                        <View style={{flexDirection: 'row', width: '100%', padding: 10, alignItems: 'center', justifyContent: 'flex-start'}}>
                            <Text>Quick Actions</Text>
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
