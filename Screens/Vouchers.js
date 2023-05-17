import React, { useState,useEffect } from 'react';
import { View, Text,FlatList,SafeAreaView, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import * as firebase from 'firebase';
import Header from '../components/Header1';
const Vouchers = ({navigation}) => {
  const [vouchers, setvouchers] = useState('');

  useEffect(() => {
    const currentUser = firebase.auth().currentUser;
    const userEmail = currentUser.email;
    const userOrdersRef = firebase.database().ref('Vouchers');
    
    userOrdersRef.on('value', (snapshot) => {
      const vouchersData = snapshot.val();
      
      if (vouchersData) {
        const userVouchers = Object.values(vouchersData).filter((voucher) => voucher.userid === userEmail);
        setvouchers(userVouchers);
      } else {
        setvouchers([]);
      }
    });
  }, []);
  
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
  <Header />
  <Text style={styles.sender}>All Vouchers details</Text>
  {vouchers.length === 0 ? (
     <View style={styles.messageContainer}>
    <Text style={styles.text}>No vouchers available</Text>
    </View>
  ) : (
    <FlatList
      data={vouchers}
      renderItem={({ item }) => (
        <TouchableOpacity>
        <View style={styles.messageContainer}>
          <Text style={styles.text}>Voucher Code: {item.vcode}</Text>
          <Text style={styles.text}>Discount: {item.vdiscountpercentage}%</Text>
          <Text style={styles.text}>Expiry: {item.vexpireddate}</Text>
          <Text style={styles.text}>Minimum Order: {item.vminimumordervalue}</Text>
        </View>
        </TouchableOpacity>
      )}
    />
  )}
</SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  messageContainer: {
    // flexDirection: 'row',
    padding: 10,
    margin: 10,
    borderWidth: 1,
    color: '#000000',
    borderColor: '#ccc',
    borderRadius: 10,
    // alignItems: 'flex-start',
},
sender: {
  marginLeft:14,
  marginTop:20,
    fontWeight: 'bold',
},
text1: {
  color: '#000000',
  alignItems: 'flex-start',
},
text: {
    color: '#000000',
    //  marginLeft: 270,
},
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16,
    width: '80%',
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    // marginBottom:12,
  },
  button1: {
    backgroundColor: '#ADD8E6',
    padding: 12,
    borderRadius: 8,
    // marginBottom:12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Vouchers;
