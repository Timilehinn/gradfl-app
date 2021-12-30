import React, { useContext } from 'react';
import { Appbar } from 'react-native-paper';
import { Text, View, TouchableOpacity } from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { AuthContext } from '../contexts/authContextApi';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-async-storage/async-storage';


function Header({ navigation }) {


    const logOut=async()=>{
        navigation.reset({
            index: 0,
            routes: [{name: 'Login'}]
        })
        await AsyncStorage.removeItem('@_gradfl_token');
    }

    const { userDetails } = useContext(AuthContext);

    return (
        <Appbar.Header statusBarHeight={0} style={{backgroundColor: 'white', elevation: 2}}>
            <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center'}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{borderRadius: 50, width: 30, height: 30, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgb(41,42,60)'}} >
                        <AntIcon name="user" />
                    </View>
                    <Text style={{marginLeft: 10, color: 'rgb(41,42,60)'}}>{userDetails.details?.username} <MaterialIcons name="check-circle" size={13} /></Text>
                </View>
                <TouchableOpacity onPress={()=>logOut()}>
                    <Text><AntIcon name="logout" />logout</Text>
                </TouchableOpacity>
            </View>
        </Appbar.Header>
    )
}

export default Header
