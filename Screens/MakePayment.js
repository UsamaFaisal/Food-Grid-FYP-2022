import React, { useState,useEffect } from 'react';
import axios from 'axios'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  TextInput,
  StatusBar,
} from 'react-native';
import * as Location from 'expo-location';
import Header from '../components/Header1';
import * as firebase from 'firebase';
import Cart from '../components/Cart';
const CURRENCY = 'USD';
const API_URL = 'https://api.stripe.com/v1';
const SECRET_KEY = 'sk_test_51Mqh8jB58nmXMVgnvOGXPMri2VVkTXtTsh7sl54PaRyHKIAGcrnEXa4pJRNAtdm7xvk4VHugsRm2oTY4leDXbtkl00VIWBgE0i';
const PUBLISHABLE_KEY = 'your_publishable_key';

const MakePayment = ({route,navigation}) => {
  const { totalPriceWithDiscount } = route.params || {}
  const [cardNumber, setCardNumber] = useState('');
  const [monthexpiry, setmonthExpiry] = useState('');
  const [yearexpiry, setyearExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [username, setusername] = useState([]);
  const [location, setLocation] = useState(null);
    const [longitude, setlongitude] = useState('');
    const [latitude, setlatitude] = useState('');
  const [error, setError] = useState(null);
    const [userphone, setuserphone] = useState([]);
  // const [email, setemail] = useState('');
  const cuser = firebase.auth().currentUser;
  if (!totalPriceWithDiscount) {
    return (
      <View>
        <Text style={styles.title}>Invalid request</Text>
      </View>
    );
  }
  const [loading, setLoading] = useState(false);
  const groupedItems = Cart.reduce((acc, item) => {
    const existingItem = acc.find((group) => group.itemName === item.itemName);
    if (existingItem) {
      existingItem.count += 1;
      existingItem.itemPrice += parseInt(item.itemPrice, 10);
    } else {
      acc.push({ ...item, count: 1, itemPrice: parseInt(item.itemPrice, 10) });
    }
    return acc;
  }, []);
  async function handleOrder() {
    setLoading(true);
    try {
      const ordersRef = firebase.database().ref('Orders');
      const newOrderRef = ordersRef.child(cuser.uid).push();
      await newOrderRef.set({
        userEmail: cuser.email,
        userNumber: userphone,
        orderTime: new Date().toString(),
        Items: groupedItems,
        status: 'pending',
        longitude:longitude,
        latitude:latitude,
      });
      Cart.splice(0, Cart.length);
      console.log('Order placed successfully!');
      Alert.alert(
        'Payment Successfull',
        'Your order has been placed successfully!',
        [
          { text: 'OK', onPress: () => navigation.navigate('Order') }
        ]
      );
    } catch (error) {
      console.error('Error placing order:', error);
    }
    setLoading(false);
  };
  const getUserInfo = () => {
    const usersRef = firebase.database().ref('Users');
    const unsubscribe = usersRef.on('value', (snapshot) => {
      const users = snapshot.val();
      const usernamesArray = Object.keys(users).map((key) => {
        const user = users[key];
        if (user.email === cuser.email) {
          setusername(user.name);
          setuserphone(user.phoneno);
          return user.name;
        }
        return null;
      }).filter((username) => username !== null);
    });
  
    // Unsubscribe when component unmounts
    return () => unsubscribe();
  };
  async function getLocation() {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        throw new Error('Permission to access location was denied');
      }
  
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setlongitude(location.coords.longitude);
      setlatitude(location.coords.latitude);
      return location;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  useEffect(() => {
    getLocation();
    getUserInfo();
  }, []);
  const onCardNumberChange = (text) => {
    setCardNumber(text);
  };
  const onmonthExpiryChange = (text) => {
    setmonthExpiry(text);
  };
  
  const onyearExpiryChange = (text) => {
    setyearExpiry(text);
  };
  const onCvcChange = (text) => {
    setCvc(text);
  };
  
  const onSubmit = async () => {
    const stripeConfig = {
      headers: {
        'Authorization': 'Bearer sk_test_51Mqh8jB58nmXMVgnvOGXPMri2VVkTXtTsh7sl54PaRyHKIAGcrnEXa4pJRNAtdm7xvk4VHugsRm2oTY4leDXbtkl00VIWBgE0i',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };

    const cardDetails = {
      'card[number]': cardNumber,
      'card[exp_month]': monthexpiry,
      'card[exp_year]': yearexpiry,
      'card[cvc]': cvc,
    };

    axios.post('https://api.stripe.com/v1/customers', { email: "f190118@nu.edu.pk" }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${SECRET_KEY}`,
      }
    })
      .then((response) => {
        const customer = response.data
        axios.post('https://api.stripe.com/v1/tokens', Object.keys(cardDetails)
          .map(key => key + '=' + cardDetails[key])
          .join('&'), stripeConfig)
          .then((response) => {
            const token = response.data
            if (token.id) {
              axios.post(`https://api.stripe.com/v1/customers/${customer.id}/sources`, { source: `${token.id}` }, {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                  'Authorization': `Bearer ${SECRET_KEY}`,
                }
              })
                .then((response) => {
                  const card = response.data
                  axios.post(`https://api.stripe.com/v1/charges`, { receipt_email: cuser.email, amount: totalPriceWithDiscount, currency: "USD", card: card.id, customer: customer.id }, {
                    headers: {
                      'Content-Type': 'application/x-www-form-urlencoded',
                      'Authorization': `Bearer ${SECRET_KEY}`,
                    }
                  })
                    .then((response) => {
                      const charge = response.data
                      if (charge.status === 'succeeded') {
                       // alert('Payment Successful');
                        handleOrder();
                      } else {
                        alert('Payment failed');
                      }

                    })
                })

            } else {
              alert('Invalid Card Details');
            }

          })
      })
      .catch(error => console.error(error));

  };

  return (
    <View style={styles.container}>
         <Text style={styles.heading}>Amount</Text>  
        <Text style={styles.input}>{totalPriceWithDiscount}</Text>  
        <Text style={styles.heading}>Card Number</Text>
        <TextInput
          style={styles.input}
          placeholder="1234 5678 9012 3456"
          keyboardType="number-pad"
          maxLength={16}
          value={cardNumber}
          onChangeText={onCardNumberChange}
        />
        
      
        <Text style={styles.heading}>Month Expiry</Text>
        <TextInput
          style={styles.input}
          placeholder="MM"
          keyboardType="number-pad"
          maxLength={2}
          value={monthexpiry}
          onChangeText={onmonthExpiryChange}
        />
        <Text style={styles.heading}>Year Expiry</Text>
        <TextInput
          style={styles.input}
          placeholder="YYYY"
          keyboardType="number-pad"
          maxLength={4}
          value={yearexpiry}
          onChangeText={onyearExpiryChange}
        />
        <Text style={styles.heading}>CVC</Text>
        <TextInput
          style={styles.input}
          placeholder="123"
          keyboardType="numeric"
          value={cvc}
          onChangeText={onCvcChange}
        />
      <TouchableOpacity
        onPress={onSubmit}
        style={styles.button}>
        <Text
          style={styles.buttonText}>
           {loading ? 'Placing order...' : 'Pay now'}
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
  heading: {
    marginLeft:8,
    fontSize: 16,
    fontWeight: 'bold',
    
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    paddingLeft:9,
  },
  input1: {
    borderWidth: 1,
    //borderColor: '#ccc',
    padding: 8,
    color:'black',
    //backgroundColor:'#D3D3D3',
    marginBottom: 16,
    marginTop:5,
    marginLeft:8,
    width: '100%',
    borderRadius: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    color:'black',
    backgroundColor:'#D3D3D3',
    marginBottom: 16,
    marginTop:5,
    marginLeft:8,
    width: '100%',
    borderRadius: 8,
  },
});
export default MakePayment;