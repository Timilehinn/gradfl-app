import React, { useEffect, useContext } from 'react'
import { ScrollView, View, Animated, Text, StatusBar } from 'react-native';
import { Appbar } from 'react-native-paper'


function TwoScreen({navigation}) {
    
    return (
        <>
            <Appbar.Header statusBarHeight={0} style={{backgroundColor: 'white', elevation: 2}}>
                    <View style={{flexDirection: 'row', width: '100%', justifyContent: 'flex-start', alignItems: 'center'}}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            {/* <Appbar.Action icon="arrow-left" color="white"  /> */}
                        </View>
                    </View>
            </Appbar.Header>
            <View
                style={{flex: 1, backgroundColor:'white', alignItems: 'center', justifyContent: 'center'}}>
                <Text>Screen Two</Text>
            </View>
        </>
    )
}

export default TwoScreen
