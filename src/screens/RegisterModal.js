import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Modal, StyleSheet, TextInput, Image, ToastAndroid,  ActivityIndicator, TouchableOpacity, Pressable } from 'react-native';
import FeatherIcons from 'react-native-vector-icons/Feather'
import { HomeContext } from '../contexts/homeContextApi'
import MAicons from 'react-native-vector-icons/MaterialCommunityIcons'
import axios from '../util/util'

function RegisterModal() {

    const { setLogin, register, setRegister } = useContext(HomeContext)
    const [ email, setEmail ] = useState('')
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ loading, setLoading ] = useState(false)

    const switchLogin = () =>{
        setLogin(true)
        setTimeout(()=>{
          setRegister(false)
        },500)
    }

    const Register=()=>{
      if(email || username || password ){
        setLoading(true)
        axios.post('/user/signup', {
          email, username, password
        })
        .then(res=>{ 
          setLoading(false)
          ToastAndroid.showWithGravityAndOffset(
            res.data.message,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,50
          );
          console.log(res.data)
        })
        .catch(err=>{
          ToastAndroid.showWithGravityAndOffset(
            err.message,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,50
          );
          setLoading(false)
          console.log(err.message)
        })
      }else{
        ToastAndroid.showWithGravityAndOffset(
          'All fields are required',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,50
        );
      }
    }
   
    return (
        <Modal
        animationType="none"
        transparent={true}
        visible={register}
        onRequestClose={() => {
          setRegister(false);
        }}
      >
        <View style={styles.centeredView}>
            <TouchableOpacity onPress={() => setRegister(false)} style={{alignSelf: 'flex-start'}}>
                <FeatherIcons name="x" color="black" size={30} />
            </TouchableOpacity>

            <View style={{width: '100%', alignItems: 'center'}}>
                <Text style={{color: 'black', margin: 15, fontSize: 30}}>Sign Up</Text>
                <TextInput style={styles.input} onChangeText={email=>setEmail(email)} placeholder="Email" placeholderTextColor="grey" />
                <TextInput style={styles.input} onChangeText={username=>setUsername(username)} placeholder="Username" placeholderTextColor="grey" />
                <TextInput style={styles.input} onChangeText={password=>setPassword(password)} secureTextEntry={true} placeholder="Password" placeholderTextColor="grey" />
                <TouchableOpacity disabled={loading? true:false} onPress={()=>Register()} style={{...styles.regButton, backgroundColor: loading? 'lightgrey':'#3eb489'}}>
                    {!loading && <Text style={{textAlign: 'center', color: 'white'}}>Sign Up</Text>}
                    {loading && <ActivityIndicator size={15} color="white" />}
                </TouchableOpacity>
            </View>
            
            <TouchableOpacity onPress={()=>switchLogin()}>
                <Text style={{color: 'black'}}>Already have an account?</Text>
            </TouchableOpacity>
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
      position: 'absolute',
      alignSelf: 'center',
      justifyContent: 'space-between',
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
    input: {
      padding: 9,
      borderWidth: .5,
      color: 'black',
      borderColor: 'lightgrey',
      width: '80%',
      marginBottom: 20,
      borderRadius: 10,
    },
    regButton: {
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection : 'row',
      width: '80%',
      padding: 15,
      elevation: 2
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


export default RegisterModal
