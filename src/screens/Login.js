import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Modal, TextInput, StyleSheet, ToastAndroid, Alert, ActivityIndicator, Image, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import axios from '../util/util'
import { AuthContext } from '../contexts/authContextApi';
import * as RootNavigation from '../navigator/RootNavigation.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Login() {
    const { auth, setAuth, setUserDetails } = useContext(AuthContext);
    const [ login, setLogin ] = useState(true)
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ loading, setLoading ] = useState(false)

    const Toast = (message)=>{
      ToastAndroid.showWithGravityAndOffset(
          message,
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,50
      );
    }

    useEffect(()=>{
      (async()=>{
        const token = await AsyncStorage.getItem('@_gradfl_token');
        axios.get('/user/isuserauth',{
          headers: {
            'x-access-token': token
          }
        }).then(res=>{
          if(res.data.authenticated){
            setUserDetails(res.data)
            RootNavigation.navigate(
              'Dashboard'
            )
          }
        }).catch(err=>[
          Toast('Session expired')
        ])
      })()
    },[])

    const _login = ()=>{
      if(!email || !password){
        return Toast('All fields are required')
      }
      setLoading(true)
      axios.post('/user/auth/signin',{
        email, password
      })
      .then(async res=>{
        setLoading(false)
        setPassword('');
        setAuth(res.data.session);
        if(res.data.session){
          await AsyncStorage.setItem('@_gradfl_token', res.data.token);
          setUserDetails(res.data)
          RootNavigation.navigate(
            'Dashboard'
          )
          console.log(res.data.session)
          setTimeout(()=>{
            setLogin(false)
          }, 500)
          setLoading(false)
        }
        Toast(res.data.message)
      })
      .catch(err=>{
        setLoading(false)
        setPassword('')
        setEmail('')
        console.log(err);
        Toast('Something went wrong')
        setPassword('')
      })
    }

    return (
        <Modal
        animationType="none"
        transparent={true}
        visible={login}
        onRequestClose={() => {
          setLogin(!login);
        }}
      >
        <View style={styles.centeredView}>
              <View style={styles.main}>
                <Text style={{color: 'black', marginLeft: 5, fontSize: 30}}>Welcome Back</Text>
                <Text style={{color: 'grey', marginLeft: 5, fontSize: 15}}>Sign In to continue</Text>
                <TextInput style={styles.input} onChangeText={email=>setEmail(email)} placeholder="Email" placeholderTextColor="grey" />
                <TextInput style={styles.input} onChangeText={password=>setPassword(password)} secureTextEntry={true} placeholder="Password" placeholderTextColor="grey" />
                <TouchableOpacity disabled={loading? true:false} onPress={()=>_login()} style={{...styles.loginButton, backgroundColor: loading? 'lightgrey' : 'lightblue'}}>
                    {!loading && <Text style={{textAlign: 'center', color: 'white', fontWeight: 'bold'}}>SIGN IN</Text>}
                    {loading && <ActivityIndicator size={15} color="white" />}
                </TouchableOpacity>
            </View>
        </View>
      </Modal>
    )
}


const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      alignItems: "center",
      height: '100%',
      width: '100%',
      padding: 15,
      backgroundColor: 'white',
    },

    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
  
    main: {
        alignItems: 'flex-start',
        backgroundColor: 'white',
        width: '90%',
        marginTop: 160
    },
    bottom: {
        flex: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        width: '100%',
        padding: 20,
        height: '50%'
    },
    input: {
        padding: 9,
        borderBottomWidth: .5,
        color: 'black',
        borderBottomColor: 'lightgrey',
        width: '100%',
        marginBottom: 30,
        borderRadius: 10,
      },
    loginButton: {
      // borderRadius: 10,
      width: '100%',
      padding: 15,
      flexDirection: 'row',
      elevation: 2,
      alignItems: 'center',
      justifyContent: 'center'
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
  });

export default Login
