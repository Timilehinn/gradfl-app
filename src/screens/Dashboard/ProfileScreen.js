import React, { useState, useContext } from 'react'
import { View, Text, StatusBar, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import colors from '../../util/colors';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { AuthContext } from '../../contexts/authContextApi'
import { Appbar } from 'react-native-paper';
import * as  RootNavigation from '../../navigator/RootNavigation'
import AsyncStorage from '@react-native-async-storage/async-storage';
import UpdateInfo from './UpdateInfo';
import { Button, Paragraph, TextInput, Dialog, Portal, Provider } from 'react-native-paper';
import AddBankInfo from '../../components/addBankInfo'


function ProfileScreen() {

    const { userDetails, showUpdateInfo } = useContext(AuthContext);

    const [ bankModal, showBankModal ] = useState(false)



    async function LogOut() {
        try {
            await AsyncStorage.removeItem('@_cashlead_user');
            RootNavigation.navigate('Welcome')
            return true;
        }
        catch(e) {
            console.log('error deleteing:', e)
            return false;
        }
    }



    return (
        <>
        <StatusBar
              barStyle='light-content'
        />
       
        <ScrollView style={{flex: 1, backgroundColor: 'white', height: '100%'}}>
            <View style={{flex: 1, width: '100%', paddingTop: 60, alignItems: 'center', }}>
                <AntIcon name="user" size={50} style={{marginBottom: 20}}/>
               
                <View style={styles.listItem}>
                    <TouchableOpacity onPress={()=>showUpdateInfo(true)}>
                        <Text>Update Info</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.listItem}>
                    <AddBankInfo bankModal={bankModal} showBankModal={showBankModal} label="Add bank details" />
                </View>
                <View style={{...styles.listItem}}>
                    <TouchableOpacity onPress={()=>LogOut()}>
                        <Text style={{color: 'orange'}}>Logout</Text>
                    </TouchableOpacity>
                </View>
                <Text style={{color: 'grey'}}>version 1.0.0</Text>
            </View>
        </ScrollView>

       
        </>
    )
}

const styles = StyleSheet.create({
    listItem: {
        width: '85%', 
        borderBottomWidth: .5, 
        borderColor: 'lightgrey', 
        alignItems: 'center',
        flexDirection: 'row',
        height: 50, 
        padding: 5
    }
})

export default ProfileScreen
