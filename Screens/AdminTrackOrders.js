import React, { useState, useContext, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  RefreshControl,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { RFValue as rf } from 'react-native-responsive-fontsize';
import EmailField from '../components/EmailField';
import Btn from '../components/Btn';
import Header from '../components/Header';
import * as firebase from 'firebase';
import { GiftedChat } from 'react-native-gifted-chat';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function AdminTrackOrders() {
    const ordersRef = firebase.database().ref('Orders');
    const [pendingOrders, setPendingOrders] = useState([]);
    useEffect(() => {
        const ordersRef = firebase.database().ref('Orders');
    
        ordersRef.once('value', (snapshot) => {
          if (snapshot.exists()) {
            const ordersData = snapshot.val();
            const allOrders = [];
    
            for (const uid in ordersData) {
              const userOrders = ordersData[uid];
              for (const id in userOrders) {
                const order = userOrders[id];
                allOrders.push(order);
              }
            }
    
            // Filter the orders based on the pending status and extract the status field
           
            const longitudeP = allOrders.filter((order) => order.status === 'pending').map((order) => order.longitude);
            const latitudeP = allOrders.filter((order) => order.status === 'pending').map((order) => order.latitude);
            console.log(longitudeP);
            console.log(latitudeP);
            setPendingOrders(pendingOrders);
          } else {
            setPendingOrders([]);
          }
          
        }, (error) => {
          console.error(error);
        });
      }, []);
    
    
    
    

  return (
    <View>
      
    </View>
  );
}
const styles = StyleSheet.create({
  error: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ff0000',
    fontSize: 24,
  },
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
});
