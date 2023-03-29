import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

// import PaymentGateway from '../components/PaymentGateway';
// const stripe = new StripeProvider('sk_test_51Mqh8jB58nmXMVgnvOGXPMri2VVkTXtTsh7sl54PaRyHKIAGcrnEXa4pJRNAtdm7xvk4VHugsRm2oTY4leDXbtkl00VIWBgE0i')
import firebase from 'firebase';

function MakePayment() {
  const [amount, setAmount] = useState('');

  return (
    <View>
    <Text style={{ fontSize: 20, fontWeight: 'bold', marginVertical: 10 }}>Payment Gateway Demo</Text>
    {/* <PaymentGateway /> */}
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
});

export default MakePayment;
