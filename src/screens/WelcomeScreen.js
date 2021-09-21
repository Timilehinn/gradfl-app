import React, { useEffect, useState, useContext } from 'react'
import { View, Text, Image, Modal, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import Login from './Login';
import RegisterModal from './RegisterModal';
import { HomeContext } from '../contexts/homeContextApi';
import styled from 'styled-components/native'
// import Svg, { path } from 'react-native-svg';

const WelcomeScreen = ()=> {

    const {setLogin, setRegister } = useContext(HomeContext)
    return (

        <View style={styles.main}>
            <Login />
            <RegisterModal />
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
            </View>

            <View style={{alignItems: 'center', width: '70%'}}>
                <Text style={{color: '#3eb489', fontSize: 35, textAlign: 'center', fontWeight: 'bold'}}>
                    CryptoLead
                </Text>
                <Text style={{color: '#3eb489', fontWeight: '100', textAlign: 'center',}}>
                    lorem ipsum ...
                </Text>
            </View>
            <View style={{alignItems: 'center', width: '100%', justifyContent: 'space-between'}}>
                <TouchableOpacity onPress={()=>setLogin(true)} style={{backgroundColor: '#3eb489', width: '80%', marginBottom: 20, borderWidth: 2, borderColor: 'white', padding: 15, borderRadius: 10}}>
                    <Text style={{textAlign: 'center', color: 'white', fontWeight: 'bold'}}>SIGN IN</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>setRegister(true)} style={{width: '80%', borderWidth: 1, borderColor: '#3eb489', backgroundColor: 'white', padding: 15, borderRadius: 10}}>
                    <Text style={{textAlign: 'center', color:'#3eb489', fontWeight: 'bold'}}>SIGN UP</Text>
                </TouchableOpacity>
            </View>
        </View>
        
       
    )
}
const styles = StyleSheet.create({
    main: {
        paddingTop: 50,
        paddingBottom: 50,
        zIndex: 999,
        flex: 1, 
        // height: '100%',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-between'
        
    },
    image: {
        flex: 1,
        justifyContent: "center"
      },
    top: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgb(41,42,60)',
        width: '100%',
        padding: 15,
        height: '50%'
    },
    bottom: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'white',
        width: '100%',
        padding: 15,
        height: '50%'
    },
    input: {
        padding: 10,
        borderBottomWidth: 1,
        borderColor: 'lightgrey',
        width: '100%',
        marginBottom: 30
    }
})

export default WelcomeScreen;
