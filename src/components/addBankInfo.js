import React, { useState, useContext } from 'react';
import { View, Text, StatusBar, TextInput, ScrollView, StyleSheet, ActivityIndicator, ToastAndroid, TouchableOpacity } from 'react-native';
import axios from '../util/util'
import { Button, Paragraph, Dialog, Portal, Provider } from 'react-native-paper';
import { AuthContext } from '../contexts/authContextApi'


function AddBankInfo({ bankModal, showBankModal, label }) {

    const { userDetails, setUserDetails, showUpdateInfo } = useContext(AuthContext);
    const [ bank, setBank ] = useState(userDetails.details?.bankName);
    const [ accountNumber, setAccountNumber ] = useState(userDetails.details?.bankAccountNumber);
    const [ loading, setLoading ] = useState(false);
    const [ errMessage, setErrMessage ] = useState('')



    const addBankInfo =()=>{
        if(accountNumber.length < 8){
            return ToastAndroid.showWithGravityAndOffset(
                "Account number can't be less than 8 digits",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,50
            );
        }
        setLoading(true)
        axios.post(`/user/add-bankinfo/${userDetails.details._id}`, {
            bank, accountNumber
        })
        .then(res=>{
            console.log(res.data)
            setLoading(false)
            if(!res.data.status){
                setErrMessage(res.data.message);
                setTimeout(()=>{
                    setErrMessage('')
                }, 5000)
            }else{
                showBankModal(false);
                ToastAndroid.showWithGravityAndOffset(
                    'Bank Details Added successfully',
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,50
                );
                console.log(res.data)
                setUserDetails(res.data)
            }
        })
        .catch(err=>{
            console.log(err.message)
            setErrMessage(err.message)
            setTimeout(()=>{
                setErrMessage('')
            }, 5000)
            setLoading(false)
        })
    }

    return (
        <>
        <TouchableOpacity onPress={()=>showBankModal(true)}>
            <Text>{label}</Text>
        </TouchableOpacity>
        <Portal>
        
        <Dialog visible={bankModal} style={{borderRadius: 15, padding: 10}} onDismiss={()=>showBankModal(false)}>
          <Dialog.Title>{label}</Dialog.Title>
          <TextInput 
              style={{backgroundColor: 'transparent', borderBottomColor: 'grey', padding: 5, borderBottomWidth: .5, marginBottom: 20}} 
              placeholder="Bank Name" 
              placeholderTextColor="lightgrey"
              value={bank}
              onChangeText={bank => setBank(bank)}
          />

          <TextInput 
              style={{backgroundColor: 'transparent', borderBottomColor: 'grey', padding: 5, borderBottomWidth: .5}} 
              placeholder="Account Number" 
              placeholderTextColor="lightgrey"
              keyboardType="number-pad"
              value={accountNumber}
              onChangeText={accountNumber => setAccountNumber(accountNumber)}
          />
          <Text style={{color: 'red'}}>{errMessage}</Text>
          <Dialog.Actions>
              <View style={{alignItems: 'center', flexDirection: 'row'}}>
                  <TouchableOpacity style={{margin: 10}} onPress={()=>showBankModal(false)}>
                      <Text style={{fontWeight: 'bold', color: 'grey'}}>Cancel</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity disabled={loading? true : false} style={{margin: 10}} onPress={()=> addBankInfo()}>
                      {!loading && <Text style={{fontWeight: 'bold'}}>Done</Text>}
                      {loading && <ActivityIndicator color="black" />}
                  </TouchableOpacity>
              </View>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      </>
    )
}

export default AddBankInfo
