import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,FlatList } from 'react-native';
import firebase from 'firebase';
import Cart from '../components/Cart';

const ManageCart = () => {
  const totalPrice = Cart.reduce((acc, item) => acc + Number(item.itemPrice), 0);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Cart</Text>
      <FlatList
        data={Cart}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <View style={styles.messageContainer}>
              <Text style={styles.itemSubtitle}>{item.itemName}</Text>
              <Text style={styles.itemSubtitle}>Rs.{item.itemPrice}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <View>
        <Text style={styles.grandTotal}>Grand Total: Rs.{totalPrice}</Text> 
      </View>
    </View>
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
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  grandTotal: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  itemSubtitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ManageCart;
