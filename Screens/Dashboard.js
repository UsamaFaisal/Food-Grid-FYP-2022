import React, { useState,useContext ,useEffect} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    FlatList,
    StatusBar,
    SafeAreaView,
    Image,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { FontAwesome5 } from 'react-native-vector-icons';
import HomeCarousel from '../components/Carousel';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { RFValue as rf } from "react-native-responsive-fontsize";
import * as firebase from 'firebase';
import { Button, SearchBar } from 'react-native-elements';
import { AuthContext } from '../routes/Authenticationprovider';
import Cart from '../components/Cart';
export default function Dashboard({ navigation }) {
    const Tab = createBottomTabNavigator();
    const [disable,setdisable]=useState(false);
    const [isSearchClicked, setIsSearchClicked] = useState(false);
    const [searchText, setSearchText] = useState('');
  const [items, setItems] = useState([]);
    const [error,seterror]=useState("");
    // Cart=[];
    const {logout}=useContext(AuthContext);
  
    // Access the params object from the route
    function errors(value){
        seterror(value);
        console.log(value)
        setdisable(false)
    } 
      
      const searchfun = () => {
       
        if (searchText.trim() === '') {
          setIsSearchClicked(false);
          setItems([]);
          return;
        }     
        setIsSearchClicked(true); 
        firebase
        .database()
        .ref('Food/Fastfood')
        .orderByChild('itemName')
        .once('value')
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            const items = Object.values(data);
            let filteredItems = items;
            const searchWords = searchText.trim().toLowerCase().split(' ');
            searchWords.forEach((word) => {
              filteredItems = filteredItems.filter((item) =>
                item.itemName.toLowerCase().includes(word)
              );
            });
            setItems(filteredItems);
          } else {
            setItems([]);
            seterror('Item not Found');
          }
        })
        .catch((error) => {
          console.error(error);
        });
      };
       return (
        <SafeAreaView style={{ flex: 1 }}>
        <Header />
         <View style={styles.container}>
            <StatusBar style='auto' />
         <View  style={{ marginTop: 10}}>
         <View>
         {/* ye search bar ha */}
         <View style={styles.inputContainer}> 
                <TextInput 
                    // style={{ borderRadius: 15,alignSelf: 'center', backgroundColor:'white',width:'70%',height: 40, borderColor: 'gray', borderWidth: 1,paddingLeft:10,marginLeft:10 }}
                    onChangeText={setSearchText}
                    value={searchText}
                    placeholder='Search'
                  /> 
                  <TouchableOpacity
                                   onPress={searchfun}
                                    style={styles.iconContainer}>
                                    <FontAwesome5 
                                        name={'search'} 
                                        size={17} 
                                        color='gray' 
                                    />
                            </TouchableOpacity>
                </View>
        </View> 

        {/* ye jb search hoga to list show krega */}
        <View>
          {/* Display FlatList only if items array is populated */}
          {isSearchClicked && items.length > 0 && (
            <FlatList
              data={items}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => navigation.navigate('Tabviewallscreen')}>
                  <View style={styles.messageContainer}>
                    <Text style={styles.itemSubtitle}>{item.itemName}</Text>
                    <Text style={styles.itemSubtitle}>Rs.{item.itemPrice}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          )}

          {/* Display "No items found" message if items array is empty */}
          {isSearchClicked && searchText.trim() !== '' && items.length === 0 && (
          <View style={styles.messageContainer}>
            <Text style={styles.itemSubtitle}>No items found</Text>
          </View>
        )}
        </View>
        </View>
        
    {/* yha ye buutons wala scene shuru ha     */}
    <View style={styles.containern}>
           <HomeCarousel />
        </View>
    <ScrollView>
    
        <View style={styles.container1}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button1} onPress={() => navigation.navigate('TabviewScreen')}>
                    <Image style={styles.buttonImage1} source={require('../assets/customorder.png')} />
                    {/* <Text style={styles.buttonText1} >Customize Order</Text> */}
                </TouchableOpacity>
                <TouchableOpacity style={styles.button1} onPress={() => navigation.navigate('Tabviewallscreen')}>
                    <Image style={styles.buttonImage1} source={require('../assets/quickorder.png')} />
                    {/* <Text style={styles.buttonText1}>Quick Ordering</Text> */}
                </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>    
                <TouchableOpacity style={styles.button1} onPress={() =>  navigation.navigate('Vouchers')}>
                    <Image style={styles.buttonImage1} source={require('../assets/applyvouchers.png')} />
                    {/* <Text style={styles.buttonText1}>Apply Vouchers</Text> */}
                </TouchableOpacity>
                <TouchableOpacity style={styles.button1} onPress={() =>  navigation.navigate('GiveFeedback')}>
                    <Image style={styles.buttonImage1} source={require('../assets/feedback.png')} />
                    {/* <Text style={styles.buttonText1}>Give Feedback</Text> */}
                </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button1} onPress={() => navigation.navigate('TrackLocation')}>
                    <Image style={styles.buttonImage1} source={require('../assets/trackorder.png')} />
                    {/* <Text style={styles.buttonText1}>Track Order</Text> */}
                </TouchableOpacity>
                <TouchableOpacity style={styles.button1} onPress={() => navigation.navigate('Deals')}>
                    <Image style={styles.buttonImage1} source={require('../assets/deals.png')} />
                    {/* <Text style={styles.buttonText1}>Deals</Text> */}
                </TouchableOpacity>
            </View>
            
        </View>
    
        </ScrollView>
        <Footer />
        
      </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    error:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        color:'#ff0000',
        fontSize:24
    },
    scrollcontainer:{
      marginBottom:10,
    },
    iconContainer: {
      padding: 10,
      
    },
    container: {
        flex: 1,
        //backgroundColor: "#47b749",
    },
    containern: {
      width: '100%',
      height:'40%',
      // paddingBottom:15,
      // marginTop:-20,
    backgroundColor:"#eeeee4",
  },
    itemSubtitle: {
        fontSize: 14,
        color:'black'
      },
    EmailWrapper: {
        height: hp('15%'),
        justifyContent: 'flex-end',
        marginBottom: 10
    },
    container3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
      },
      slideshow: {
        width: '100%',
      },
    customSlide: {
        alignItems: 'center',
        justifyContent: 'center',
      },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent:'space-evenly',
        // flexWrap:'wrap-reverse',
      },
    //
    container1: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:"#D3D3D3",
        // marginBottom:50,
        //flexDirection: 'row',

      },
      buttonn:{
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        width: 50,
        //backgroundColor: '#cccccc',
        borderRadius: 20,
        margin: 20,
        flexDirection: 'row',
      },
      button1: {
        alignItems: 'center',
        justifyContent:'center', 
        height: 150,
        width: 150,
        //backgroundColor: '#cccccc',
        borderRadius: 20,
        margin: 20,
        flexDirection: 'row',
      },
      buttonImage1: {
        height: 125,
        width: 150,
        borderRadius:20,
        backgroundColor:'white',
        opacity:0.8,
      },
      buttonText1: {
        fontWeight: 'bold',
        fontSize: 16,
        alignItems:'center',
        alignContent:'center',
        backgroundColor: 'transparent',
        color:'white',
        position: 'absolute',
       // bottom: 5,
        //right: 5,
      },//
    messageContainer: {
        //flexDirection: 'row',
        padding: 10,
        margin: 10,
        borderWidth: 1,
        color:'#000000',
        borderColor: '#ccc',
        borderRadius: 10,
        alignItems: 'flex-start',
      },
      //
      imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 400,
        width: 400,
      },
      image: {
        height: 350,
        width: 350,
      },
      imageText: {
        fontWeight: 'bold',
        fontSize: 18,
        backgroundColor: 'transparent',
        position: 'absolute',
        bottom: 5,
        right: 5,
      },//
    PasswordWrapper: {
        height: hp('12%'),
        justifyContent: 'flex-end'
    },
    BtnWrapper: {
        height: hp('15%'),
        justifyContent: 'flex-end'
    },
    SignUBtnWrapper: {
        height: hp('30%'),
        justifyContent: 'flex-end'
    },
    AccountTxt: {
        fontSize: rf(10),
        color: '#fff',
        textAlign: 'center',
        marginBottom: 10
    },
      menuIcon: {
        width: 30,
        height: 30,
        marginRight: 10,
      },
      inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        borderRadius: 7,
        borderWidth:1,
        paddingHorizontal: 10,
        marginHorizontal: 15,
        marginBottom: 35,        
      },

});