import React, { useState,useEffect } from 'react';
import { SafeAreaView,View,ScrollView, Text,Button, TextInput, TouchableOpacity, StyleSheet,FlatList,Alert } from 'react-native';
import * as firebase from 'firebase';
// import { Piechart } from 'react-native-pie';
import Cart from '../components/Cart';
import GetLocation from 'react-native-get-location';
import Header from '../components/Header1';
// import Geolocation from '@react-native-community/geolocation';
const ManageCart = ({ navigation }) => {
  const [userLocation, setUserLocation] = useState(null);
    const [username, setusername] = useState([]);
    const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);
    const [userphone, setuserphone] = useState([]);
    const [address, setaddress] = useState([]);
    const [loading, setLoading] = useState(false);
    const totalcalories = Cart.reduce((acc, item) => acc + Number(item.calories), 0);
    const totalcarbs = Cart.reduce((acc, item) => acc + Number(item.carbs), 0);
    const totalfats = Cart.reduce((acc, item) => acc + Number(item.fats), 0);
    const totalprotein = Cart.reduce((acc, item) => acc + Number(item.protein), 0);
    const totalsodium = Cart.reduce((acc, item) => acc + Number(item.sodium), 0);
    const totalsugar = Cart.reduce((acc, item) => acc + Number(item.sugar), 0);
  const totalPrice = Cart.reduce((acc, item) => acc + Number(item.itemPrice), 0);
  const cuser = firebase.auth().currentUser;
    //    console.log('Mange cart',user.email);
   
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
//   console.log(groupedItems);
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
  
  useEffect(() => {
    getUserInfo();
  }, []); 
  const handleOrder = async () => {
    setLoading(true);
    try {
      const ordersRef = firebase.database().ref('Orders');
      const newOrderRef = ordersRef.child(cuser.uid).push();
      await newOrderRef.set({
        userEmail: cuser.email,
        userNumber: userphone,
        userAddress: address,
        orderTime: new Date().toString(),
        Items: groupedItems,
        status: 'pending'
      });
      Cart.splice(0, Cart.length);
      console.log('Order placed successfully!');
      Alert.alert(
        'Order Placed Successfully',
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
        const getCurrentLocation = () => {
          GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 60000,
        })
        .then(location => {
            console.log(location);
        })
        .catch(error => {
            const { code, message } = error;
            console.warn(code, message);
        })
        };
        // console.log('Cart',Cart);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
    <View>
      <Text style={styles.title}>Manage Cart</Text>
    </View>
    {groupedItems.length <= 0 ? (
      <View style={styles.emptyCartContainer}>
        <Text style={styles.emptyCartText}>No items selected</Text>
      </View>
    ) : (
      <View style={{ flex: 1 }}>
        <FlatList
          data={groupedItems}
          renderItem={({ item,index }) => (
            <View style={styles.messageContainer}>
              <Text style={styles.itemSubtitle}>
                {item.count} {item.itemName}
              </Text>
              <Text style={styles.itemSubtitle}>Rs.{item.itemPrice}</Text>
              
              <TouchableOpacity onPress={() => {
                Cart.splice(index, 1);
                Alert.alert('Success', 'Item removed successfully.');
                }}>
                <Text style={styles.button}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
        />
        <ScrollView>
          <Text style={styles.grandTotal}>Details of Nutrients</Text>
          <Text style={styles.grandTotal}>
            Calories {totalcalories} Protein {totalprotein}
          </Text>
          <Text style={styles.grandTotal}>
            Sugar {totalsugar} Sodium {totalsodium}
          </Text>
          <Text style={styles.grandTotal}>
            Fats {totalfats} Carbs {totalcarbs}
          </Text>
          <Text style={styles.grandTotal}></Text>
          <Text style={styles.grandTotal}>
            Grand Total: Rs.{totalPrice}
          </Text>
          <Text style={styles.heading}>Email</Text>
          <TextInput
            style={styles.input}
            value={cuser.email}
            editable={false}
          />
          <Text style={styles.heading}>Enter Address</Text>
          <TextInput
            style={styles.input}
            value={address}
            onChangeText={setaddress}
            // editable={false}
          />
          <TouchableOpacity onPress={getCurrentLocation}>
            <Text>Get Current Location</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={handleOrder}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Placing order...' : 'Order'}
            </Text>
          </TouchableOpacity>
          <Text></Text>
        </ScrollView>
      </View>
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
  chart: {
    height: 200,
    width: 200,
    marginBottom: 16,
  },
  emptyCartContainer:{
    marginLeft:8,
  },
  heading: {
    marginLeft:3,
    fontSize: 16,
    fontWeight: 'bold',
    
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop:10,
    marginLeft:8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    color:'black',
    backgroundColor:'#D3D3D3',
    marginBottom: 16,
    marginTop:5,
    width: '100%',
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
    // marginVertical: 6,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:'#D3D3D3',
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
