import { useState, useEffect } from 'react';
import * as React from 'react';
import { View, useWindowDimensions, Text, FlatList,StyleSheet } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import * as firebase from 'firebase';
import { Button } from 'react-native-elements';
//import { ScrollView } from 'react-navigation';

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

  return (
    <View style={{ flex: 1, backgroundColor: '#ff4081' }}>
      <FlatList
        data={fastfoodItems}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemTitle}>Name: {item.itemName}</Text>
            <Text style={styles.itemSubtitle}>Price: {item.itemPrice}</Text>
            <Text></Text>
            <Button title="Add to Cart"/>
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
  <View style={{ flex: 1, backgroundColor: '#673ab7' }}>
    <FlatList
        data={drinksItems}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemTitle}>Name: {item.itemName}</Text>
            <Text style={styles.itemSubtitle}>Price: {item.itemPrice}</Text>
            <Text></Text>
            <Button title="Add to Cart"/>
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
  <View style={{ flex: 1, backgroundColor: '#000000' }}>
    <FlatList
        data={biscuitsItems}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemTitle}>Name: {item.itemName}</Text>
            <Text style={styles.itemSubtitle}>Price: {item.itemPrice}</Text>
            <Text></Text>
            <Button title="Add to Cart"/>
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
        borderColor: '#ddd',
        borderRadius: 4
      },
      itemTitle: {

        fontSize: 16,
        fontWeight: 'bold',
        color: 'white' ,
        paddingTop: 20 
      },
      itemSubtitle: {
        fontSize: 14,
        color: 'white',
        fontWeight:'bold'
      },

});