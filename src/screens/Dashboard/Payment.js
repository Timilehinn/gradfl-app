import React, { useState, useEffect, useContext, useCallback } from 'react'
import { View, Text, StatusBar, ScrollView, StyleSheet, TextInput, RefreshControl, Image, ToastAndroid, ActivityIndicator, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../contexts/authContextApi'
import * as  RootNavigation from '../../navigator/RootNavigation'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../components/Header'
import { formatCurrency } from '../../util/formatCurrency'
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import axios from '../../util/util';
import FeatherIcons from 'react-native-vector-icons/Feather';
import { baseurl } from '../../util/url'

function Index({ navigation }) {

    const { userDetails, setUserDetails } = useContext(AuthContext);

    const [ transactions, setTransactions ] = useState([])
    const [visible, setVisible] = useState(false);
    const [ code, setCode ] = useState('')
    const [ loading, setLoading ] = useState(false);
    const [ declining, setDeclining ] = useState(false);
    const [ payLoading, setPayLoading ] = useState(false);
    const [ item, setItem ] = useState([])
    const [ refreshing, setRefreshing ] = useState(false)


    const openMenu = () => setVisible(true);
  
    const closeMenu = () => setVisible(false);

    const onRefresh = useCallback(async () => {
        getTransactions()
    }, []);

    const Toast = (message)=>{
        ToastAndroid.showWithGravityAndOffset(
            message,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,50
        );
    }

    useEffect(()=>{
        getTransactions()
    },[])

    const findItem = async()=>{
        setLoading(true)
        const token = await AsyncStorage.getItem('@_gradfl_token');
        axios.get(`/market/item/${code}`,{
            headers: {
                'x-access-token': token
            }
        }).then(res=>{
            setLoading(false)
            setItem(res.data.data)
            Toast(res.data.message)
        }).catch(err=>{
            setLoading(false)
            Toast('Something went wrong')
            console.log(err.message)
        })
    }

    const refreshUserDetails = async () =>{
        const token = await AsyncStorage.getItem('@_gradfl_token');
        axios.get('/user/isuserauth', {
            headers: {
                'x-access-token': token
            }
        }).then(res=>{
            console.log(res.data)
            setUserDetails(res.data)
        }).catch(err=>{
            Toast('Something went wrong')
        })
    }

    const getTransactions = async () =>{
        const token = await AsyncStorage.getItem('@_gradfl_token');
        axios.get('/user/transactions',{
            headers: {
                'x-access-token': token
            }
        }).then(res=>{
            setTransactions(res.data.transactions)
        }).catch(err=>{
            console.log(err.message)
            Toast('Error occurred while getting transactions')
        })
    }

    const makePayment = async()=>{
        setPayLoading(true)
        const token = await AsyncStorage.getItem('@_gradfl_token');
        axios.post(`/market/item/pay/${code}`,{
            price: item[0].item.price,
            sellerId: item[0].item.sellerId,
            itemId: item[0].item._id,
        },{
            headers: {
                'x-access-token': token
            }
        }).then(res=>{
            console.log(res.data)
            setPayLoading(false)
            getTransactions()
            refreshUserDetails()
            setItem([])
        }).catch(err=>{
            console.log(err.message)
            setPayLoading(false)
        })
    }

    const declinePayment = async()=>{
        setDeclining(true);
        const token = await AsyncStorage.getItem('@_gradfl_token');
        axios.post(`/market/item/decline/${code}`,{},{
            headers: {
                'x-access-token': token
            }
        }).then(res=>{
            setDeclining(false)
            Toast(res.data.message)
            setItem([])
            console.log(res.data)
        }).catch(err=>{
            Toast('Something went wrong')
            console.log(err)
            setDeclining(false);
        })
    }

    return (
        <>
        <StatusBar
              barStyle='light-content'
        />
       <Header navigation={navigation} />
        <View style={{flex: 1, backgroundColor: 'white', alignItems: 'center'}}>
            {/* <View style={{flex: 1, alignItems: 'center', width: '100%', height: '100%',  backgroundColor: 'green'}}> */}
                <View style={{backgroundColor: 'lightblue', padding: 10, width: '90%', flexDirection: 'row', marginBottom: 20, alignItems: 'center', justifyContent: 'space-between', height: 130, borderRadius: 10, marginTop: 30}}>
                    <View style={{alignItems: 'flex-start'}}>
                        <Text style={{fontWeight: 'bold', fontSize: 17, color: 'black', marginBottom: 5}}>Account</Text>
                        <Text style={{color: 'black', marginBottom: 5}}>TOTAL BALANCE</Text>
                        <Text style={{fontWeight: 'bold', color: 'black', fontSize: 30}}>{formatCurrency(userDetails.details.balance)}</Text>
                    </View>
                    <TouchableOpacity onPress={()=>refreshUserDetails()}>
                        <EvilIcons name="refresh" size={35} />
                    </TouchableOpacity>
                </View>
                {loading && <ActivityIndicator color="black" />}
                {item.length == 0 && (
                    <>
                        <View style={styles.codeView}>
                            <TextInput onChangeText={code=>setCode(code)} placeholder='Enter code to Purchase Item' style={styles.codeField} /> 
                                <TouchableOpacity onPress={()=>findItem()} style={styles.findBtn}>
                                    <EvilIcons name="search" size={30} color="white" />
                                </TouchableOpacity>
                        </View>
                        {transactions.length == 0 && (
                            <View style={{height: '30%', justifyContent: 'center'}}>
                                <Text style={{color: 'grey'}}>Transactions will appear here</Text>
                            </View>
                        )}
                        <ScrollView 
                            refreshControl={
                                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                            }
                            style={{width: '90%'}} 
                            showsVerticalScrollIndicator={false} >
                            {transactions.map(trans=>(
                                <View key={trans._id} style={styles.listItem}>
                                    <Text>{formatCurrency(trans.amount)}</Text> 
                                    {trans.type == 'credit' ? (
                                        <FeatherIcons name="arrow-down-left" size={20} color="green" />
                                    ):(
                                        <FeatherIcons name="arrow-up-right" size={20} color="red" />
                                    )}
                                </View>
                            ))}
                        </ScrollView>
                    </>
                )}
                {item.length> 0 && (
                    <View style={styles.marketItem}>
                        {/* <Text>{JSON.stringify(item[0])}</Text> */}
                        <Image source={{uri: `${baseurl}${item[0]?.item.image}`}} resizeMode="contain" style={{marginTop: 5, borderRadius: 20, marginBottom: 10, width: '100%', height: '40%'}} />
                        <Text style={{fontSize: 25, fontWeight: 'bold'}}>{item[0].item.name}</Text>
                        <Text style={{fontSize: 13}}>{item[0].item.description}.</Text>
                        {userDetails.details._id == item[0].item.sellerId? (
                            <>
                                <Text style={{fontSize: 20, marginTop: 15, marginBottom: 10}}>seller: You</Text>
                                <TouchableOpacity onPress={()=>setItem([])} style={styles.itemBtn2}>
                                    <Text>cancel</Text>
                                </TouchableOpacity>
                            </>
                        ):(
                            <View style={{marginTop: 10, width: '100%', flexDirection: 'row', justifyContent: 'space-around'}}>
                                {!payLoading && (
                                    <TouchableOpacity disabled={payLoading && true} onPress={()=>declinePayment()} style={styles.itemBtn1}>
                                        {declining ? (
                                            <ActivityIndicator color='white' />
                                        ):(
                                            <Text style={{fontWeight: 'bold'}}>Decline</Text>
                                        )}
                                    </TouchableOpacity>
                                )}
                                
                                {!declining && (
                                    <TouchableOpacity disabled={declining && true} onPress={()=>makePayment()} style={styles.itemBtn2}>
                                        {payLoading? (
                                            <ActivityIndicator color='white' />
                                        ):(
                                            <Text style={{fontWeight: 'bold'}}>Pay {formatCurrency(item[0].item.price)}</Text>
                                        )}
                                    </TouchableOpacity>
                                )}
                            </View>
                        )}
                    </View>
                )}
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    listItem: {
        width: '100%', 
        borderBottomWidth: .5, 
        borderColor: 'lightgrey', 
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 50, 
        padding: 5
    },
    codeView: {
        marginTop: 5,
        width: '90%',
        borderRadius: 5,
        height: 40,
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: 'lightblue',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    codeField: {
        fontWeight: 'bold',
        padding: 5,
        width: '70%',
        color: 'grey'
    },
    findBtn: {
        backgroundColor: 'lightblue',
        width: 50,
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    marketItem: {
        width: '90%',
        // height: '100%',
        alignItems: 'center',
        borderRadius: 15,
        borderWidth: 1,
        padding: 10,
        borderColor: 'lightgrey'
    },
    itemBtn1: {
        padding: 15,
        backgroundColor: 'tomato',
        borderRadius: 25
    },
    itemBtn2: {
        padding: 15,
        backgroundColor: 'lightblue',
        borderRadius: 25
    }
})

export default Index
