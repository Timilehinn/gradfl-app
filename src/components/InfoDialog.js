import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import { Button, Paragraph, Dialog, Portal, Provider } from 'react-native-paper';


function InfoDialog({ isDialog, showDialog, message, title }) {

    // const [visible, setVisible] = React.useState(false);


    return (
        <Portal>
          <Dialog visible={isDialog} style={{borderRadius: 15}} onDismiss={()=>showDialog(false)}>
            <Dialog.Title>{title}</Dialog.Title>
            <Text style={{marginLeft: 20, fontSize: 16}}>{message}</Text>
            <Dialog.Actions>
                <View style={{alignItems: 'center', flexDirection: 'row'}}>
                    {/* <TouchableOpacity style={{margin: 10}} onPress={()=>{hideDialog(); BackHandler.exitApp()}}>
                        <Text style={{fontWeight: 'bold', color: 'grey'}}>Exit</Text>
                    </TouchableOpacity> */}
                    <TouchableOpacity style={{margin: 10}} onPress={()=> showDialog(false)}>
                        <Text style={{fontWeight: 'bold'}}>ok</Text>
                    </TouchableOpacity>
                </View>
            </Dialog.Actions>
          </Dialog>
        </Portal>
    )
}

export default InfoDialog
