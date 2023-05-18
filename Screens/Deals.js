import React, { useState,useEffect } from 'react';
import { View,Image,Alert, Text,FlatList,SafeAreaView, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import * as firebase from 'firebase';
import Header from '../components/Header1';
import Cart from '../components/Cart';
const images = new Map();
images.set('Happy Meal', require('../assets/HappyMeal.png'));
const Deals = ({navigation}) => {
  const [dealitems, setdealitems] = useState('');

 
  useEffect(() => {
    const fetchdeals = async () => {
      const dbRef = firebase.database().ref('/Deals');
      const snapshot = await dbRef.once('value');
      const items = [];
      snapshot.forEach((childSnapshot) => {
        const item = childSnapshot.val();
        items.push(item);
      });
      setdealitems(items);
      
    };
    fetchdeals();
    
  }, []);
  
  
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
    <Header />
    <Text style={styles.title}>All Deals</Text>
      <FlatList
        data={dealitems}
        renderItem={({ item }) => (
          <View >
            <TouchableOpacity style={styles.itemContainer} onPress={() => {
                  Alert.alert(
                    'Add to cart',
                    `Do you want to add ${item.itemName} to your cart?`,
                    [
                      {text: 'No'},
                      {text: 'Yes', onPress: () => Cart.push(item)},
                    ]
                  );
             }}>
            <Text style={styles.title}>{item.itemName}</Text>
            <Image
              style={styles.imgsize}
              source={images.get(item.itemName) ? images.get(item.itemName) : require('../assets/loading.png')}
            />
            <Text style={styles.itemTitle}>{item.deals}</Text>
            <Text style={styles.itemSubtitle}>Rs.{item.itemPrice}</Text>
            <Text></Text>
            <TouchableOpacity style={styles.caloriesButton} onPress={() =>navigation.navigate('Details',{ item})}>
                <Text style={styles.caloriesButtonText}>Details</Text>
              </TouchableOpacity>
            </TouchableOpacity>
            
          </View>
        )}
      />
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
    marginTop:20,
    alignSelf:'center',
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
imgsize: {
    width: 100,
    height: 100,
    borderRadius: 15,
    marginTop: 10,
    alignContent:'center',
    //alignContent:'center',
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
itemContainer: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderWidth: 1,
    alignContent:'center',
    alignItems:'center',
    borderColor: 'black',
    borderRadius: 20
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

export default Deals;
