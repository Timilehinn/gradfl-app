import React, { useState, useContext } from "react";
import { Image, StyleSheet, View, ImageBackground, Text, Dimensions, TouchableOpacity } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { AuthContext } from '../../../contexts/authContextApi';
import { formatCurrency } from '../../../util/formatCurrency'
import { baseurl } from '../../../util/url';

const MarketItem = ({ item,  modal, showModal, selectedItem, setSelectedItem }) => {
  const { userDetails } = useContext(AuthContext);
  const width = Dimensions.get('window').width


  return (
    <>
      <TouchableOpacity key={item.key}
          onPress={()=>{showModal(true); setSelectedItem(item)}}
          style={{margin: 5, alignItems: 'center', height: 150, width: (width - 20) / 2, flex: 1}}
      >
        <ImageBackground 
          source={{ uri: `${baseurl}${item?.image}` }} 
          resizeMode="cover" style={{width: '100%', height: '100%'}} imageStyle={{ borderRadius: 10}}
          >
            <View style={{backgroundColor: 'rgba(0,0,0, 0.40)',borderRadius: 10, width: '100%', height: '100%',  justifyContent: 'flex-end', padding: 5 }}>
              <Text style={styles.imgTextSm}>{formatCurrency(item.price)}</Text>
              <Text style={styles.imgText}>{item.name} {item.sellerId == userDetails.details._id && <MaterialIcons name="check-circle" />}</Text>
            </View>
        </ImageBackground>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  Container: {
    padding: 10,
    flexDirection: "row",
    maxWidth: '40%',
  },
  paragraph: {
    // width: deviceProp.width / 1.7,
    minHeight: 30,
    color: 'grey',
    flex: 1,
  },
  image: {
    borderRadius: 5,
    width: 86,
    height: 86,
  },
  text: {
    marginLeft: 10,
    fontSize: 12,
    // borderWidth: 1,
  },
  date: {
    fontSize: 12,
  },
  imgText: {
    fontSize: 15, textAlign: 'center', color: 'white', fontWeight: 'bold'
  },
  imgTextSm: {
    fontSize: 11.5, textAlign: 'center', color: 'white'
  },
  rightIcon: {
    // borderWidth: 1,
  },
  right: {
    alignItems: "center",
  },
});
export default MarketItem;