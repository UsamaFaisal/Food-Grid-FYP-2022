import React, { useState,useEffect } from 'react';
import { SafeAreaView,View,ScrollView, Text, TextInput, TouchableOpacity, StyleSheet,FlatList } from 'react-native';
import * as firebase from 'firebase';
// import { Piechart } from 'react-native-pie';
import Cart from '../components/Cart';

import { Button } from 'react-native-elements';
const ManageCart = ({ navigation }) => {
    const [username, setusername] = useState([]);
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
    } else {
      acc.push({ ...item, count: 1 });
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
            console.log('Order placed successfully!');
          } catch (error) {
            console.error('Error placing order:', error);
          }
          setLoading(false);
        };
  return (
    <SafeAreaView>
    <View >
          <Text style={styles.title}>Manage Cart</Text>
    </View>
    <View >
      {groupedItems.length > 0 && (
        <FlatList
          data={groupedItems}
          renderItem={({ item }) => (
            // <TouchableOpacity>
              <View style={styles.messageContainer}>
                <Text style={styles.itemSubtitle}>Quantity {item.count} {item.itemName}</Text>
                <Text style={styles.itemSubtitle}>Rs.{item.itemPrice}</Text>
                <TouchableOpacity>
                     <Text style={styles.button}>Remove</Text>
                </TouchableOpacity>
              </View>
            // </TouchableOpacity>
          )}
        />
      )}
      {groupedItems.length > 0 && (
        <View>
          <Text style={styles.grandTotal}>Details of Nutrients</Text>
          <Text style={styles.grandTotal}>Calories {totalcalories}  Protein {totalprotein}</Text>
          <Text style={styles.grandTotal}>Sugar {totalsugar}  Sodium {totalsodium}</Text>
          <Text style={styles.grandTotal}>Fats {totalfats}  Carbs {totalcarbs}</Text>
          <Text style={styles.grandTotal}></Text> 
          <Text style={styles.grandTotal}>Grand Total: Rs.{totalPrice}</Text>
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
          <TouchableOpacity style={styles.button} onPress={handleOrder} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'Placing order...' : 'Order'}</Text>
          </TouchableOpacity>
          <Text></Text>
        </View> 
      )}
    </View>
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
  heading: {
    marginLeft:3,
    fontSize: 16,
    fontWeight: 'bold',
    
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
