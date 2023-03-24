import { useState, useEffect } from 'react';
import * as React from 'react';
import { View, useWindowDimensions, Text, FlatList,StyleSheet,TouchableOpacity, ScrollView,Image } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import * as firebase from 'firebase';
import { Button } from 'react-native-elements';

const images = new Map();

images.set('OriginalCrust', require('../assets/OriginalCrust.png'));
images.set('ThinzaCrust', require('../assets/ThinzaCrust.png'));
images.set('XtremeCrust', require('../assets/XtremeCrust.png'));
images.set('PanCrust', require('../assets/PanCrust.png'));
images.set('CrispyChicken', require('../assets/CrispyChicken.png'));
images.set('FootLong', require('../assets/FootLong.png'));
images.set('Fruits', require('../assets/Fruits.png'));
images.set('ChickenTikka', require('../assets/ChickenTikka.png'));
images.set('Pepperoni', require('../assets/Pepperoni.png'));
images.set('ChickenFajita', require('../assets/ChickenFajita.png'));
images.set('Cheeselicious', require('../assets/Cheeselicious.png'));
images.set('Vegeterian', require('../assets/Vegeterian.png'));
images.set('TurkeyChunks', require('../assets/TurkeyChunks.png'));
images.set('FieryChicken', require('../assets/FieryChicken.png'));
images.set('BBQChicken', require('../assets/BBQChicken.png'));
images.set('Mild', require('../assets/Mild.png'));
images.set('Hot', require('../assets/Hot.png'));
images.set('ExtraHot', require('../assets/ExtraHot.png'));
images.set('FierySauce', require('../assets/FierySauce.png'));
images.set('Onion', require('../assets/Onion.png'));
images.set('Tomato', require('../assets/Tomato.png'));
images.set('Mushrooms', require('../assets/Mushrooms.png'));
images.set('Capsicum', require('../assets/Capsicum.png'));
images.set('Brioche', require('../assets/Brioche.png'));
images.set('Sourdough', require('../assets/Sourdough.png'));
images.set('Englishmuffin', require('../assets/Englishmuffin.png'));
images.set('Chicken', require('../assets/ChickenBurger.png'));
images.set('Cheese', require('../assets/Cheese.png'));
images.set('Bacon', require('../assets/Bacon.png'));
images.set('BBQ', require('../assets/BBQ.png'));
images.set('Plain', require('../assets/Round.png'));
images.set('Chocolate', require('../assets/Chocolate.png'));
images.set('Vanilla', require('../assets/Vanilla.png'));
images.set('Straberry', require('../assets/Straberry.png'));
images.set('Sprinkles', require('../assets/Sprinkles.png'));
images.set('Nuts', require('../assets/Nuts.png'));
images.set('Chips', require('../assets/Chips.png'));
images.set('Caramel', require('../assets/Caramel.png'));
images.set('Honey', require('../assets/Honey.png'));
images.set('Round', require('../assets/Round.png'));
images.set('Square', require('../assets/Square.png'));
images.set('Heart', require('../assets/Heart.png'));
const HorizontalList = ({ title, data, onSelect }) => {
  return (
    <View>
        <View style={styles.itemContainer}>
          <Text>{title}</Text>
          <FlatList
            horizontal
            data={data}
            renderItem={({ item }) => (
            <View style={styles.itemContainerinner}> 
            <TouchableOpacity>
            <Image
              style={styles.imgsize}
              source={images.get(item.itemName) ? images.get(item.itemName) : require('../assets/loading.png')}
            />
            {/* <Image style={styles.imgsize} source={images.get(item.itemName)} /> */}
           
              <Text style= {styles.listtext} onPress={() => onSelect(item)}> 
              {item.itemName}  
              </Text>
            </TouchableOpacity>
              </View>
            )}
            //keyExtractor={(item) => item.id}
          />
          
        </View>
        
    </View>
  );
};
function FirstRoute() {
  const [breads, setBreads] = useState([]);
  const [flavors, setFlavors] = useState([]);
  const [sauces, setSauces] = useState([]);
  const [veggies, setVeggies] = useState([]);

  useEffect(() => {
    // fetch breads data from Firebase
    const fetchbreads = async () => {
      const dbRef = firebase.database().ref('/Singlefooditem/Pizza/Breads');
      const snapshot = await dbRef.once('value');
      const Bitems = [];
      snapshot.forEach((childSnapshot) => {
        const Bitem = childSnapshot.val();
        Bitems.push(Bitem);
      });
      setBreads(Bitems);
    };
    const fetchflavours = async () => {
      const dbRef = firebase.database().ref('/Singlefooditem/Pizza/Flavours');
      const snapshot = await dbRef.once('value');
      const Fitems = [];
      snapshot.forEach((childSnapshot) => {
        const Fitem = childSnapshot.val();
        Fitems.push(Fitem);
      });
      setFlavors(Fitems);
    };
    
    // fetch sauces data from Firebase
    const fetchsauces = async () => {
      const dbRef = firebase.database().ref('/Singlefooditem/Pizza/Sauces');
      const snapshot = await dbRef.once('value');
      const Sitems = [];
      snapshot.forEach((childSnapshot) => {
        const Sitem = childSnapshot.val();
        Sitems.push(Sitem);
      });
      setSauces(Sitems);
    };

    // fetch veggies data from Firebase
    const fetchvegies = async () => {
      const dbRef = firebase.database().ref('/Singlefooditem/Pizza/Vegies');
      const snapshot = await dbRef.once('value');
      const Vitems = [];
      snapshot.forEach((childSnapshot) => {
        const Vitem = childSnapshot.val();
        Vitems.push(Vitem);
      });
      setVeggies(Vitems);
    };

    fetchbreads();
    fetchflavours();
    fetchsauces();
    fetchvegies();
  }, []);

  const handleBreadSelect = (bread) => {
    // handle bread selection
  };

  const handleFlavorSelect = (flavor) => {
    // handle flavor selection
  };

  const handleSauceSelect = (sauce) => {
    // handle sauce selection
  };

  const handleVeggieSelect = (veggie) => {
    // handle veggie selection
  };
  const [count, setCount] = useState(1);
  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const increment = () => {
    setCount(count + 1);
  };

  const addToCart = () => {
    // code to add item to cart
  };
  return(
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
            <View>
                <HorizontalList title="Breads" data={breads} onSelect={handleBreadSelect} />
                <HorizontalList title="Flavors" data={flavors} onSelect={handleFlavorSelect} />
                <HorizontalList title="Sauces" data={sauces} onSelect={handleSauceSelect} />
                <HorizontalList title="Veggies" data={veggies} onSelect={handleVeggieSelect} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={decrement}>
                <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>
                <Text style={{ marginHorizontal: 10 }}>{count}</Text>
                <TouchableOpacity onPress={increment}>
                <Text style={styles.buttonText}>+</Text>          
              </TouchableOpacity>
            
                <Button title="Add to cart" onPress={addToCart} />   
            </View>
    </ScrollView>
  );
}
function SecondRoute (){ 
  const [breads, setBreads] = useState([]);
  const [flavors, setFlavors] = useState([]);
  const [sauces, setSauces] = useState([]);
  const [veggies, setVeggies] = useState([]);

  useEffect(() => {
    // fetch breads data from Firebase
    const fetchbreads = async () => {
      const dbRef = firebase.database().ref('/Singlefooditem/Burger/Breads');
      const snapshot = await dbRef.once('value');
      const Bitems = [];
      snapshot.forEach((childSnapshot) => {
        const Bitem = childSnapshot.val();
        Bitems.push(Bitem);
      });
      setBreads(Bitems);
    };
    const fetchflavours = async () => {
      const dbRef = firebase.database().ref('/Singlefooditem/Burger/Flavours');
      const snapshot = await dbRef.once('value');
      const Fitems = [];
      snapshot.forEach((childSnapshot) => {
        const Fitem = childSnapshot.val();
        Fitems.push(Fitem);
      });
      setFlavors(Fitems);
    };
    
    // fetch sauces data from Firebase
    const fetchsauces = async () => {
      const dbRef = firebase.database().ref('/Singlefooditem/Burger/Sauces');
      const snapshot = await dbRef.once('value');
      const Sitems = [];
      snapshot.forEach((childSnapshot) => {
        const Sitem = childSnapshot.val();
        Sitems.push(Sitem);
      });
      setSauces(Sitems);
    };
    // fetch veggies data from Firebase
    const fetchvegies = async () => {
      const dbRef = firebase.database().ref('/Singlefooditem/Burger/Vegies');
      const snapshot = await dbRef.once('value');
      const Vitems = [];
      snapshot.forEach((childSnapshot) => {
        const Vitem = childSnapshot.val();
        Vitems.push(Vitem);
      });
      setVeggies(Vitems);
    };

     fetchbreads();
     fetchflavours();
     fetchsauces();
     fetchvegies();
  }, []);

  const handleBreadSelect = (bread) => {
    // handle bread selection
  };

  const handleFlavorSelect = (flavor) => {
    // handle flavor selection
  };

  const handleSauceSelect = (sauce) => {
    // handle sauce selection
  };

  const handleVeggieSelect = (veggie) => {
    // handle veggie selection
  };
  const [count, setCount] = useState(1);
  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const increment = () => {
    setCount(count + 1);
  };

  const addToCart = () => {
    // code to add item to cart
  };
  return(
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
            <View>
                <HorizontalList title="Breads" data={breads} onSelect={handleBreadSelect} />
                <HorizontalList title="Flavors" data={flavors} onSelect={handleFlavorSelect} />
                <HorizontalList title="Sauces" data={sauces} onSelect={handleSauceSelect} />
                <HorizontalList title="Veggies" data={veggies} onSelect={handleVeggieSelect} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={decrement}>
                <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>
                <Text style={{ marginHorizontal: 10 }}>{count}</Text>
                <TouchableOpacity onPress={increment}>
                <Text style={styles.buttonText}>+</Text>          
              </TouchableOpacity>
            
                <Button title="Add to cart" onPress={addToCart} />   
            </View>
    </ScrollView>
  );
  }
function ThirdRoute() { 
  const [flavors, setFlavors] = useState([]);
  const [toppings, setToppings] = useState([]);
  const [coatings, setCoatings] = useState([]);
  const [shape, setShape] = useState([]);

  useEffect(() => {
    // fetch breads data from Firebase
    const fetchflavours = async () => {
      const dbRef = firebase.database().ref('/Singlefooditem/Biscuits/Flavour');
      const snapshot = await dbRef.once('value');
      const Fitems = [];
      snapshot.forEach((childSnapshot) => {
        const Fitem = childSnapshot.val();
        Fitems.push(Fitem);
      });
      setFlavors(Fitems);
    };
    const fetchtoppings = async () => {
      const dbRef = firebase.database().ref('/Singlefooditem/Biscuits/Toppings');
      const snapshot = await dbRef.once('value');
      const Titems = [];
      snapshot.forEach((childSnapshot) => {
        const Titem = childSnapshot.val();
        Titems.push(Titem);
      });
      setToppings(Titems);
    };
    
    // fetch sauces data from Firebase
    const fetchcoatings = async () => {
      const dbRef = firebase.database().ref('/Singlefooditem/Biscuits/Coatings');
      const snapshot = await dbRef.once('value');
      const Citems = [];
      snapshot.forEach((childSnapshot) => {
        const Citem = childSnapshot.val();
        Citems.push(Citem);
      });
      setCoatings(Citems);
    };

    // fetch veggies data from Firebase
    const fetcshapes = async () => {
      const dbRef = firebase.database().ref('/Singlefooditem/Biscuits/Shape');
      const snapshot = await dbRef.once('value');
      const Sitems = [];
      snapshot.forEach((childSnapshot) => {
        const Sitem = childSnapshot.val();
        Sitems.push(Sitem);
      });
      setShape(Sitems);
    };
    
    fetchflavours();
    fetchtoppings();
    fetchcoatings();
    fetcshapes();
  }, []);

  

  const handleFlavorSelect = (flavor) => {
    // handle flavor selection
  };
  const handleToppingsSelect = (topping) => {
    // handle bread selection
  };

  const handleCoatingsSelect = (coating) => {
    // handle sauce selection
  };

  const handleShapeSelect = (shape) => {
    // handle veggie selection
  };
  const [count, setCount] = useState(1);
  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const increment = () => {
    setCount(count + 1);
  };

  const addToCart = () => {
    // code to add item to cart
  };
  return(
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
            <View>
                <HorizontalList title="Flavours" data={flavors} onSelect={handleFlavorSelect} />
                <HorizontalList title="Toppings" data={toppings} onSelect={handleToppingsSelect} />
                <HorizontalList title="Coatings" data={coatings} onSelect={handleCoatingsSelect} />
                <HorizontalList title="Shapes" data={shape} onSelect={handleShapeSelect} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={decrement}>
                <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>
                <Text style={{ marginHorizontal: 10 }}>{count}</Text>
                <TouchableOpacity onPress={increment}>
                <Text style={styles.buttonText}>+</Text>          
              </TouchableOpacity>
            
                <Button title="Add to cart" onPress={addToCart} />   
            </View>
    </ScrollView>
  );
};
const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third:ThirdRoute,
});

export default function TabViewExample() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Pizza' },
    { key: 'second', title: 'Burger' },
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
      // height:100,
      // width:100,
      padding: 10,
      marginVertical: 8,
      marginHorizontal: 16,
      borderWidth: 1,
      borderColor: '#000000',
      borderRadius: 4
    },
    listtext:{
      textAlign:'center',
    },
    itemContainerinner: {
      height:100,
      width:90,
      // padding: 10,
      backgroundColor:"#fff",
      justifyContent:'center',
      alignItems:'center',
      marginVertical: 10,
      marginHorizontal: 12,
      //borderWidth: 1,
      borderColor: '#000000',
      borderRadius: 15
    },
    itemTitle: {

      fontSize: 14,
      fontWeight:'bold',
      color: '#000000' ,
      paddingTop: 10 
    },
    itemSubtitle: {
      fontSize: 14,
      color: 'white',
      fontWeight:'bold'
    },
    button: {
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: 'green',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: 'black',
      fontSize: 30,
      fontWeight: 'bold',
    },

    imgsize: {
      width: 75,
      height: 70,
      borderRadius: 15,
      marginTop: 10,
      //alignContent:'center',
    },

});