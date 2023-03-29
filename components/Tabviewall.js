import { useState, useEffect } from 'react';
import * as React from 'react';
import { View, useWindowDimensions, Text, FlatList,StyleSheet,Image, TouchableOpacity } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import * as firebase from 'firebase';
import { Button } from 'react-native-elements';
//import { ScrollView } from 'react-navigation';
import Cart from './Cart';
const images = new Map();
images.set('ChickenBurger', require('../assets/ChickenBurger.png'));
images.set('ZingerBurger', require('../assets/ZingerBurger.png'));
images.set('PattyBurger', require('../assets/PattyBurger.png'));
images.set('ChickenShawarma', require('../assets/ChickenShawarma.png'));
images.set('Coke', require('../assets/Coke.png'));
images.set('7up', require('../assets/7up.png'));
images.set('DietCoke', require('../assets/DietCoke.png'));
images.set('ChocolateBiscuit', require('../assets/ChocolateBiscuit.png'));

function FirstRoute() {
  const [fastfoodItems, setFastfoodItems] = useState([]);

  useEffect(() => {
    const fetchFastfoodItems = async () => {
      const dbRef = firebase.database().ref('/Food/Fastfood');
      const snapshot = await dbRef.once('value');
      const items = [];
      snapshot.forEach((childSnapshot) => {
        const item = childSnapshot.val();
        items.push(item);
      });
      setFastfoodItems(items);
    };

    fetchFastfoodItems();
  }, []);
  // Cart.push("Hello");
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <FlatList
        data={fastfoodItems}
        renderItem={({ item }) => (
          <View >
            <TouchableOpacity style={styles.itemContainer} onPress={()=>Cart.push(item)} >
            <Image
              style={styles.imgsize}
              source={images.get(item.itemName) ? images.get(item.itemName) : require('../assets/loading.png')}
            />
            <Text style={styles.itemTitle}>{item.itemName}</Text>
            <Text style={styles.itemSubtitle}>Rs.{item.itemPrice}</Text>
            <Text></Text>
            </TouchableOpacity>
            
          </View>
        )}
      />
    </View>
  );
}

function SecondRoute(){
    const [drinksItems, setDrinksItems] = useState([]);
    useEffect(() => {
        const fetchDrinksItems = async () => {
          const dbRef = firebase.database().ref('/Food/Drinks');
          const snapshot = await dbRef.once('value');
          const items2 = [];
          snapshot.forEach((childSnapshot) => {
            const item = childSnapshot.val();
            items2.push(item);
          });
          setDrinksItems(items2);
        };
    
        fetchDrinksItems();
      }, []);
    
  return (
  <View style={{ flex: 1, backgroundColor: '#fff' }}>
    <FlatList
        data={drinksItems}
        renderItem={({ item }) => (
          <View >
            <TouchableOpacity style={styles.itemContainer} onPress={()=>Cart.push(item)}>
            <Image
              style={styles.imgsize}
              source={images.get(item.itemName) ? images.get(item.itemName) : require('../assets/loading.png')}
            />
            {/* <Image style={styles.imgsize} source={images.get(item.itemName)} /> */}
            <Text style={styles.itemTitle}>{item.itemName}</Text>
            <Text style={styles.itemSubtitle}>Rs.{item.itemPrice}</Text>
            <Text></Text>
            </TouchableOpacity>
           
          </View>
        )}
      />
  </View>
  );
};
function ThirdRoute() { 
    const [biscuitsItems, setBiscuitsItems] = useState([]);
    useEffect(() => {
        const fetchBiscuitsItems = async () => {
          const dbRef = firebase.database().ref('/Food/Biscuits');
          const snapshot = await dbRef.once('value');
          const items3 = [];
          snapshot.forEach((childSnapshot) => {
            const item = childSnapshot.val();
            items3.push(item);
          });
          setBiscuitsItems(items3);
        };
    
        fetchBiscuitsItems();
      }, []);
    return(
  <View style={{ flex: 1, backgroundColor: '#fff' }}>
    <FlatList
        data={biscuitsItems}
        renderItem={({ item }) => (
          <View >
            <TouchableOpacity style={styles.itemContainer} onPress={()=>Cart.push(item)}>
            <Image
              style={styles.imgsize}
              source={images.get(item.itemName) ? images.get(item.itemName) : require('../assets/loading.png')}
            />
            <Text style={styles.itemTitle}>{item.itemName}</Text>
            <Text style={styles.itemSubtitle}>Rs.{item.itemPrice}</Text>
            <Text></Text>
            </TouchableOpacity>
          </View>
        )}
      />
  </View>
  );
}

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
});

export default function Tabviewall() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Fast Food' },
    { key: 'second', title: 'Drinks' },
    { key: 'third', title: 'Biscuits' },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
  
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#6ebe44",
    },
    itemContainer: {
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        borderWidth: 1,
        alignContent:'center',
        alignItems:'center',
        borderColor: '#ddd',
        borderRadius: 4
      },
      itemTitle: {

        fontSize: 16,
        fontWeight: 'bold',
        color: 'black' ,
        paddingTop: 20 
      },
      itemSubtitle: {
        fontSize: 14,
        color: 'black',
        fontWeight:'bold'
      },
     
      imgsize: {
        width: 100,
        height: 100,
        borderRadius: 15,
        marginTop: 10,
        alignContent:'center',
        //alignContent:'center',
      },

});