import React, { useState,useEffect } from 'react';
import { SafeAreaView,View,ScrollView, Text,Button, TextInput, TouchableOpacity, StyleSheet,FlatList,Alert } from 'react-native';
import * as firebase from 'firebase';
import Cart from '../components/Cart';
import Header from '../components/Header1';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
const ManageCart = ({ route,navigation }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
    const [username, setusername] = useState([]);
    const [longitude, setlongitude] = useState('');
    const [latitude, setlatitude] = useState('');
    
  const [error, setError] = useState(null);
    const [userphone, setuserphone] = useState([]);
    // const { longitude, latitude } = route.params;
    const { reclongitude, reclatitude } = route.params || {};
    const newReclongitude = reclongitude;
    const newReclatitude = reclatitude;
    // console.log("lat",newReclatitude);
    // console.log("lon",newReclongitude);

    const [gindex, setgindex] = useState([]);
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
  function removeitem(index)
  {
    // setgindex(index);
    Cart.splice(index, 1);
    Alert.alert('Success', 'Item removed successfully.');
  }
  useEffect(() => {
    getLocation();
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
        orderTime: new Date().toString(),
        Items: groupedItems,
        status: 'pending',
        longitude:longitude,
        latitude:latitude,
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
              
              <TouchableOpacity onPress={() => {removeitem(index)}}>
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
          <TouchableOpacity onPress={() => navigation.navigate('Map', { longitude, latitude })}>
            <Text style={styles.button}>Set Location On Map</Text>
          </TouchableOpacity>
          {/* <Text style={styles.button} onPress={()=>navigation.navigate('Maps',{newReclatitude,newReclongitude})}></Text> */}
          <TouchableOpacity
            style={styles.button}
            onPress={handleOrder}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Placing order...' : 'Order(Cash On Delivery)'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText} onPress={()=>navigation.navigate('MakePayment',{ totalPrice: totalPrice})}>
              Online Pay
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
    marginBottom:10,
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
