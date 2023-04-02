import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  StatusBar,
} from 'react-native';

const CURRENCY = 'USD';
const API_URL = 'https://api.stripe.com/v1';
const SECRET_KEY = 'sk_test_51Mqh8jB58nmXMVgnvOGXPMri2VVkTXtTsh7sl54PaRyHKIAGcrnEXa4pJRNAtdm7xvk4VHugsRm2oTY4leDXbtkl00VIWBgE0i';
const PUBLISHABLE_KEY = 'pk_test_51Mqh8jB58nmXMVgn2VasoYLuEy1ouHjQzR3uMj2LLIHtY79MAXF58v4qCiDpaCbIJaLd8qyuQ8HVborCGOdZq4Sz00E3Xr67IH';

const StripeGateway = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  const onCardNumberChange = (text) => {
    setCardNumber(text);
  };

  const onExpiryChange = (text) => {
    setExpiry(text);
  };

  const onCvcChange = (text) => {
    setCvc(text);
  };
  const onSubmit = async () => {
    const cardDetails = {
      'number': cardNumber,
      'exp_month': expiry.split('/')[0],
      'exp_year': expiry.split('/')[1],
      'cvc': cvc,
      
    };
    console.log(cardDetails['number']);
    console.log(cardDetails['exp_month']);
    console.log(cardDetails['exp_year']);
     console.log(cardDetails['cvc']);
     const token = await fetch(`${API_URL}/tokens`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${SECRET_KEY}`,
      },
      method: 'POST',
      body: Object.keys(cardDetails)
        .map(key => key + '=' + cardDetails[key])
        .join('&')
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error:', error);
    });
    console.log('token', token);

    if (token.id) {
      console.log('aya');
      const charge = await fetch(`${API_URL}/charges`, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${SECRET_KEY}`,
        },
        method: 'POST',
        body: `amount=5000&currency=${CURRENCY}&description=Developers Sin Subscription&source=${token.id}`
      }).then(response => response.json());

      console.log('charge', charge);

      if (charge.status === 'succeeded') {
        alert('Payment Successful');
      } else {
        alert('Payment failed');
      }
    } else {
      alert('Invalid Card Details');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2471A3" />
      <Image
        source={{ uri: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Stripe_logo%2C_revised_2016.png/1200px-Stripe_logo%2C_revised_2016.png' }}
        style={styles.ImgStyle}
      />
      <View style={styles.cardInputContainer}>
        <Text style={styles.cardInputLabel}>Card Number</Text>
        <TextInput
          style={styles.cardInput}
          placeholder="1234 5678 9012 3456"
          keyboardType="number-pad"
          maxLength={19}
          value={cardNumber}
          onChangeText={onCardNumberChange}
        />
      </View>
      <View style={styles.cardInputContainer}>
        <Text style={styles.cardInputLabel}>Expiry</Text>
        <TextInput
          style={styles.cardInput}
          placeholder="MM/YY"
          // keyboardType="number-pad"
          maxLength={5}
          value={expiry}
          onChangeText={onExpiryChange}
        />
      </View>
      <View style={styles.cardInputContainer}>
        <Text style={styles.cardInputLabel}>CVC</Text>
        <TextInput
          style={styles.cardInput}
          placeholder="123"
          keyboardType="numeric"
          value={cvc}
          onChangeText={onCvcChange}
        />
      </View>
      <TouchableOpacity
        onPress={ onSubmit }
        style={styles.button}>
        <Text
          style={styles.buttonText}>
          Pay Now
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  ImgStyle: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    borderRadius: 8,
  },
  cardField: {
    width: '100%',
    height: 50,
    marginVertical: 30,
  },
  button: {
    backgroundColor: '#2471A3',
    width: 150,
    height: 45,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 15,
    color: '#f4f4f4',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});
export default StripeGateway;
