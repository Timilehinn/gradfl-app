import React, { useEffect, useContext, useState } from 'react';
import { View, Text, Modal, ScrollView, TouchableOpacity, ActivityIndicator, StatusBar, ToastAndroid } from 'react-native';
import { AuthContext } from '../../contexts/authContextApi';
import FeatherIcons from 'react-native-vector-icons/Feather'
import { TextInput, Menu, Divider, Provider, Button } from 'react-native-paper';
import MaskInput, { Masks } from 'react-native-mask-input';
import axios from '../../util/util'

function UpdateInfo() {

    const { updateInfo, showUpdateInfo, userDetails, setUserDetails } = useContext(AuthContext);
    const [ loading, setLoading ] = useState(false)
    const [ errMessage, setErrMessage ] = useState('')
    const [ email, setEmail ] = useState(userDetails.details?.email);
    const [ firstname, setFirstname ] = useState(userDetails.details?.firstname)
    const [ lastname, setLastname ] = useState(userDetails.details?.lastname)
    const [ phone, setPhone ] = useState(userDetails.details?.phoneNumber)
    const [ education, setEducation ] = useState(userDetails.details?.education)
    const [ dob, setDob ] = useState(userDetails.details?.dob)
    // const [ isDialog, showDialog ] = useState(false);

    const hideUpdateInfo = () => {
        showUpdateInfo(false);
        // setEmail('')
        // setFirstname('')
        // setLastname('')
        // setAddress('')
        // setBvn('')
        // setDob('');
        setLoading(false)
    }

    const update = ()=>{
        if(!email || !firstname || !lastname || !phone || !education || !dob){
            return ToastAndroid.showWithGravityAndOffset(
                'Field(s) cannot be empty!',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,50
            );
        }
        setLoading(true)
        axios.post(`/user/update-profile/${userDetails.details._id}`, {
            email, firstname, lastname, phone, education, dob
        })
        .then(res=>{
            console.log(res.data)
            setLoading(false)
            if(!res.data.status){
                setErrMessage(res.data.message)
                setTimeout(()=>{
                    setErrMessage('')
                }, 5000)
            }else{
                hideUpdateInfo()
                ToastAndroid.showWithGravityAndOffset(
                    res.data.message,
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
         <StatusBar
              barStyle={'light-content'}
        />
        <Modal
        animationType="none"
        transparent={true}
        visible={updateInfo}
        onRequestClose={() => {
          showUpdateInfo(false);
        }}
      >
        <ScrollView style={{backgroundColor: 'white', flex: 1, height: '100%', width: '100%', padding: 20}}>
            <View style={{width: '100%', flexDirection: 'row', marginBottom: 30, justifyContent: 'flex-start', alignItems: 'center'}}>
                <TouchableOpacity onPress={() => hideUpdateInfo()} >
                    <FeatherIcons name="x" color="rgb(41,42,60)" size={30} />
                </TouchableOpacity>
            </View>
            <View style={{justifyContent: 'center'}}>
                <Text style={{fontSize: 18}}>Update Profile Details.</Text>
                <Text style={{margin: 5}}>Why do we need these info?</Text>
                <TextInput 
                    style={{backgroundColor: 'transparent'}} 
                    label="Firstname" 
                    theme={{ colors: { primary: 'rgb(41,42,60)', 
                    underlineColor:'transparent',}}} 
                    value={firstname}
                    onChangeText={firstname => setFirstname(firstname)}
                />

                <TextInput 
                    style={{backgroundColor: 'transparent'}} 
                    label="Lastname" 
                    theme={{ colors: { primary: 'rgb(41,42,60)', 
                    underlineColor:'transparent',}}} 
                    value={lastname}
                    onChangeText={lastname => setLastname(lastname)}
                />

                <TextInput 
                    style={{backgroundColor: 'transparent'}} 
                    label="Phone Number" 
                    theme={{ colors: { primary: 'rgb(41,42,60)', 
                    underlineColor:'transparent',}}} 
                    value={phone}
                    onChangeText={phone => setPhone(phone)}
                />

                <TextInput 
                    style={{backgroundColor: 'transparent'}} 
                    label="Level of Education" 
                    theme={{ colors: { primary: 'rgb(41,42,60)', 
                    underlineColor:'transparent',}}} 
                    value={education}
                    onChangeText={education => setEducation(education)}
                />

                <TextInput 
                    style={{backgroundColor: 'transparent'}}
                    keyboardType="numeric"
                    render={props =>
                        <MaskInput
                            {...props}
                            mask={Masks.DATE_DDMMYYYY}
                        />
                    }
                    label="Date of Birth (DD/MM/YYYY)" 
                    theme={{ colors: { primary: 'rgb(41,42,60)', 
                    underlineColor:'transparent',}}} 
                    value={dob}
                    onChangeText={dob => setDob(dob)}
                />
            <Text style={{color: 'red', margin: 5}}>{errMessage}</Text>
            <TouchableOpacity onPress={()=>update()} disabled={loading? true:false} style={{justifyContent: 'center', backgroundColor: loading? 'lightgrey':'#3eb489', padding: 15, flexDirection: 'row', alignItems: 'center', marginTop: 5, borderRadius: 50, bottom: 0}}>
                <Text style={{color: 'white', textAlign: 'center', fontSize: 20}}>Update</Text>
                {loading && <ActivityIndicator color="white" size={20} />}
            </TouchableOpacity>
            </View>

        </ScrollView>
        </Modal>
        </>
    )
}

export default UpdateInfo
