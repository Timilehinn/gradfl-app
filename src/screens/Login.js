import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Modal, TextInput, StyleSheet, ToastAndroid, Alert, ActivityIndicator, Image, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import FeatherIcons from 'react-native-vector-icons/Feather'
import { HomeContext } from '../contexts/homeContextApi'
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import MAicons from 'react-native-vector-icons/MaterialCommunityIcons'
import axios from '../util/util'
import { AuthContext } from '../contexts/authContextApi';
import * as RootNavigation from '../navigator/RootNavigation.js';
// import Svg, { path } from 'react-native-svg';

function Login({ navigation, userData }) {
    const { login, setLogin, setRegister } = useContext(HomeContext);
    const { auth, setAuth, setUserDetails } = useContext(AuthContext);
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ loading, setLoading ] = useState(false)

    const switchRegister = () =>{
      setRegister(true)
      setTimeout(()=>{
        setLogin(false)
      },500)
    }

    const printLogin=()=>{
      Alert.alert('Fingerprint Authentication', 'nothing yet :)')
    }

    const _login = ()=>{

      if(!username || !password){
        return ToastAndroid.showWithGravityAndOffset(
          'All fields are required',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,50
        );
      }

      setLoading(true)
      axios.post('/user/auth/signin',{
        username, password
      })
      .then(res=>{
        setLoading(false)
        setPassword('');
        setAuth(res.data.session);
        if(res.data.session){
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
        ToastAndroid.showWithGravityAndOffset(
          res.data.message,
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,50
        );
        if(res.data?.ERR_CODE === 4315 ){  // incorrect password
          // setAttempt(attempt + 1);
          setPassword('')
          setLoading(false)
        }
      })
      .catch(err=>{
        setLoading(false)
        console.log(err.message);
        ToastAndroid.showWithGravityAndOffset(
          err.message,
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,50
        );
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
              <View style={{width: '100%', flexDirection: 'row',  justifyContent: 'space-between', alignItems: 'center'}}>
                <TouchableOpacity onPress={() => {setLogin(!login); setLoading(false)}} >
                    <FeatherIcons name="x" color="black" size={30} />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>printLogin()}>
                  <MAicons style={{alignSelf: 'center'}} size={50} name="fingerprint" color="black" />
                </TouchableOpacity>
              </View>
              

              <View style={styles.main}>
                <Text style={{color: 'black', margin: 15, fontSize: 30}}>Sign In</Text>
                <TextInput style={styles.input} onChangeText={username=>setUsername(username)} placeholder="Username" placeholderTextColor="grey" />
                <TextInput style={styles.input} onChangeText={password=>setPassword(password)} secureTextEntry={true} placeholder="Password" placeholderTextColor="grey" />
                <TouchableOpacity disabled={loading? true:false} onPress={()=>_login()} style={{...styles.loginButton, backgroundColor: loading? 'lightgrey' : '#3eb489'}}>
                    {!loading && <Text style={{textAlign: 'center', color: 'white', fontWeight: 'bold'}}>SIGN IN</Text>}
                    {loading && <ActivityIndicator size={15} color="white" />}
                </TouchableOpacity>
            </View>
            <View style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between'}}>
              <TouchableOpacity onPress={()=>switchRegister()}>
                  <Text style={{color: 'black', marginRight: 5}}>No account? Create one.</Text>
              </TouchableOpacity>
              <Text style={{fontSize: 12, color: 'grey'}}>
                  help desk
              </Text>
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
      justifyContent: 'space-between',
      // position: 'absolute',
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
        alignItems: 'center',
        backgroundColor: 'white',
        width: '100%',
        marginTop: -60
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
        borderWidth: .5,
        color: 'black',
        borderColor: 'lightgrey',
        width: '80%',
        marginBottom: 30,
        borderRadius: 10,
      },
    loginButton: {
      borderRadius: 10,
      width: '80%',
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
