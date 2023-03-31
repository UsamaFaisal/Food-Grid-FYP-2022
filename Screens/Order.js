import React, { useState,useEffect } from 'react';
import { View, Text,FlatList,SafeAreaView, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import * as firebase from 'firebase';
import Header from '../components/Header1';
const Order = ({navigation}) => {
  const [feedback, setFeedback] = useState('');
  const [orders, setorders] = useState('');

  useEffect(() => {
    const userId = firebase.auth().currentUser;
    const userOrdersRef = firebase.database().ref('Orders').child(userId.uid);
    userOrdersRef.on('value', (snapshot) => {
      const ordersData = snapshot.val();
      const ordersArray = [];
      for (let orderKey in ordersData) {
        ordersArray.push({
          id: orderKey,
          ...ordersData[orderKey]
        });
      }
      setorders(ordersArray);
    });
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
    <Header />
    <Text style={styles.sender}>All Orders details</Text>
    <FlatList
      data={orders}
      renderItem={({ item }) => (
        <View style={styles.messageContainer}>
          <Text style={styles.text}>Order Items:</Text>
          {item.Items.map((item, index) => (
            <Text key={index} style={styles.text}>
              {item.count} {item.itemName}
            </Text>
          ))}
          <Text style={styles.text}>Order Time: {item.orderTime}</Text>
          <Text style={styles.text}>Order Status: {item.status}</Text>
          {item.status === 'Delivered' ? (          
            <TouchableOpacity onPress={() => navigation.navigate('GiveFeedback',{ orderId: item.id })}>
              <Text></Text>
              <Text style={styles.button1}>Leave Feedback</Text>
            </TouchableOpacity>
          ) : null}
          <Text></Text>
          <TouchableOpacity onPress={() => navigation.navigate('Message')}>
            <Text style={styles.button}>Contact</Text>
          </TouchableOpacity>
        </View>
      )}
    />
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

export default Order;
