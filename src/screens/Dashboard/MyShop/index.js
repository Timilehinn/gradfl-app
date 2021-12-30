import React, { useEffect, useRef, useContext, Fragment, useState, useCallback } from 'react'
import { View, Text, Animated, Share, TextInput, StyleSheet, Image, StatusBar, SafeAreaView, FlatList, RefreshControl, ActivityIndicator, ToastAndroid, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { AuthContext } from '../../../contexts/authContextApi';
import axios from '../../../util/util';
import { Portal, Modal } from 'react-native-paper';
import MarketItem from './MarketItem'
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FeatherIcons from 'react-native-vector-icons/Feather'
import { formatCurrency } from '../../../util/formatCurrency'
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Header from '../../../components/Header'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseurl } from '../../../util/url';

function Index({ navigation }) {
    
    const { userDetails, setUserDetails, setTransactions, setOrders } = useContext(AuthContext);
    const [ marketItems, setMarketItems ] = useState([])
    const [ loading, setLoading ] = useState(false)
    const [visible, setVisible] = React.useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [ modal, showModal ] = useState(false)
    const [ purchaseCode, setPurchaseCode ] = useState('')
    const [ selectedItem, setSelectedItem ] = useState()


    const onRefresh = useCallback(async () => {
        getMarketItems()
    }, []);
    
    const closeModal=()=>{
        showModal(false); 
        setSelectedItem({});
        setPurchaseCode('')
    }
    
    const Toast = (message)=>{
        ToastAndroid.showWithGravityAndOffset(
            message,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,50
        );
    }

    const getMarketItems=async()=>{
        setRefreshing(true);
        const token = await AsyncStorage.getItem('@_gradfl_token');
        axios.get('/market/all', {
            headers: {
                'x-access-token': token
            }
        })
        .then(res=>{
            setMarketItems(res.data.data);
            // Toast(res.data.message);
            setRefreshing(false);
        })
        .catch(err=>{
            console.log(err)
            Toast('An error occurred')
            setRefreshing(false);
        })
    }

    useEffect(()=>{
        getMarketItems();
    },[])

    const createCode = async()=>{
        const token = await AsyncStorage.getItem('@_gradfl_token');
        axios.post('/user/create-purchase-code',{ itemId: selectedItem._id },{
            headers: {
                'x-access-token': token
            }
        }).then(res=>{
            setPurchaseCode(res.data.purchaseCode)
        }).catch(err=>{
            console.log(err.message)
        })
    }

    const buy=()=>{
        Toast('This will request for a purchase link from seller (TEST)')
    }

    const onShare = async (code, name) => {
        try {
          await Share.share({
            message: `Hello, Purchase ${name} wallpaper with code: '${code}' on Gradfl app`,
          });
        } catch (error) {
          Toast(error.message)
        }
    };
    

    const renderItem = ({ item }) => <MarketItem item={item} modal={modal} selectedItem={selectedItem} setSelectedItem={setSelectedItem} showModal={showModal} />;

    return (
        <>
        <StatusBar
              barStyle={'light-content'}
        />

       <Header navigation={navigation} />
        
        <View style={{width: '100%', height: '90%'}}>
            <FlatList
                data={marketItems}
                columnWrapperStyle={{justifyContent: 'space-between'}}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                // ItemSeparatorComponent={() => <Divider style={{}} />}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
            />
        </View>
            <Portal>
                <Modal visible={modal} onDismiss={()=>showModal(false)}>
                    <TouchableOpacity onPress={()=>closeModal()} style={styles.cancel}>
                        <FeatherIcons name="x" size={35} />
                    </TouchableOpacity>
                    <View style={styles.modal}>
                        <Image source={{uri: `${baseurl}${selectedItem?.image}`}} resizeMode="contain" style={{marginTop: 5, marginBottom: 10, width: '100%', height: '50%'}} />
                        {selectedItem?.sellerId == userDetails.details._id ?(
                            <Text>Seller: <Text style={{fontWeight: 'bold'}}>You</Text></Text>
                        ):(
                            <>
                            <Text style={{fontSize: 15}}>Seller: <Text style={{fontWeight: 'bold'}}>{selectedItem?.seller?.username}</Text></Text>
                            </>
                        )}
                        <Text style={{fontSize: 35, fontWeight: 'bold'}}>{formatCurrency(selectedItem?.price)}</Text>
                        <Text style={{fontSize: 25, fontWeight: 'bold'}}>{selectedItem?.name}</Text>
                        <Text>{selectedItem?.description}.</Text>
                        <Text>Sold: <Text style={{fontWeight: 'bold'}}>{selectedItem?.purchases}</Text></Text>
                        {purchaseCode? (
                            <View style={styles.codeView}>
                                <TextInput editable={false} value={purchaseCode} style={styles.codeField} /> 
                                <TouchableOpacity onPress={()=>onShare(purchaseCode, selectedItem?.name)} style={styles.codeShareBtn}>
                                   <EvilIcons name="share-google" size={30} color="white" />
                                </TouchableOpacity>
                            </View>
                        ):(
                            <>
                            {selectedItem?.sellerId == userDetails.details._id ? (
                                <TouchableOpacity onPress={()=>createCode()} style={styles.sellBtn}>
                                    <Text style={styles.sellBtnText}>Sell</Text>
                                    <MCIcons name="cube-send" size={25} />
                                </TouchableOpacity>
                            ):(
                                <TouchableOpacity onPress={()=>buy()} style={styles.sellBtn}>
                                    <Text style={styles.sellBtnText}>Buy</Text>
                                    <MCIcons name="basket" size={25} />
                                </TouchableOpacity>
                            )}
                            </>
                        )}
                    </View>
                </Modal>
            </Portal>
        </>
    )
}

const containerStyle = {
    alignSelf: 'center',
    backgroundColor: 'white', 
    padding: 20,
    borderRadius: 20,
    height: '65%',
    width: '85%'
};

const styles = StyleSheet.create({
    cancel: {
        alignSelf: 'center', 
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white', 
        width: 45, 
        height: 45, 
        marginBottom: 20, 
        borderRadius: 50
    },
    modal: {
        alignSelf: 'center',
        backgroundColor: 'white', 
        padding: 15,
        borderRadius: 20,
        height: '85%',
        width: '85%'
    },
    sellBtn: {
        marginTop: 10,
        backgroundColor: 'lightblue',
        padding: 10,
        flexDirection: 'row',
        // borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    sellBtnText: {
        fontSize: 20,
        marginRight: 5,
        color: 'black'
    },
    codeView: {
        marginTop: 10,
        width: '80%',
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
        color: 'grey',
    },
    codeShareBtn: {
        backgroundColor: 'lightblue',
        width: 50,
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    }
})


export default Index
