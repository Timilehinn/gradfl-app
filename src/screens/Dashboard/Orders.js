import React, { useState, useContext, useEffect, useCallback } from 'react'
import { View, Text, StatusBar, ScrollView, StyleSheet, RefreshControl, TextInput, Image, ToastAndroid, ActivityIndicator, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../components/Header'
import axios from '../../util/util';
import { baseurl } from '../../util/url';



function Index({ navigation }) {

    const [ orders, setOrders ] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const Toast = (message)=>{
        ToastAndroid.showWithGravityAndOffset(
            message,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,50
        );
    }

    const onRefresh = useCallback(async () => {
        getOrders()
    }, []);

    const getOrders = async () =>{
        const token = await AsyncStorage.getItem('@_gradfl_token');
        axios.get('/user/orders',{
            headers: {
                'x-access-token': token
            }
        }).then(res=>{
            setOrders(res.data.orders)
        }).catch(err=>{
            console.log(err.message)
            Toast('Error occurred while getting orders')
        })
    }

    useEffect(()=>{
        getOrders()
    },[])

    return (
        <>
        <StatusBar
              barStyle='light-content'
        />
       <Header navigation={navigation} />

        <ScrollView 
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            style={{width: '100%', flex: 1, paddingTop: 10}} showsVerticalScrollIndicator={false} >
                {orders.length == 0  && (
                    <View style={{height: '100%', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{color: 'grey'}}>Your orders will appear here</Text>
                    </View>
                )}
                {orders.map(order=>(
                    <View key={order._id} style={styles.listItem}>
                        <Image source={{ uri: `${baseurl}${order?.item?.image}` }} resizeMode="cover" style={{marginTop: 5, marginBottom: 10, width: '40%', height: '100%'}} />
                        <View style={{ width: '60%', margin: 5}}>
                            <Text style={{fontSize: 20, fontWeight: 'bold'}}>{order.item.name}</Text>
                            <Text style={{fontSize: 13}}>{order.item.description}</Text>
                        </View>
                    </View>
                ))}
        </ScrollView>
    </>
                
    )
}

const styles = StyleSheet.create({
    listItem: {
        width: '95%', 
        margin: 5,
        borderBottomWidth: .5, 
        borderColor: 'lightgrey', 
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        // justifyContent: 'space-between',
        height: 150, 
    },
})

export default Index
