import React, { useState,useContext ,useEffect,useRef} from 'react';
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
//import SideMenu from 'react-native-sidebar';
import HomeCarousel from '../components/Carousel';
//import SideDrawer from 'react-native-side-drawer';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Welcome from '../Screens/Welcome'
import { RFValue as rf } from "react-native-responsive-fontsize";
import * as firebase from 'firebase';
import { Button, SearchBar } from 'react-native-elements';
import { AuthContext } from '../routes/Authenticationprovider';
export default function Dashboard({ navigation }) {
    const Tab = createBottomTabNavigator();

    const [disable,setdisable]=useState(false);
    const [searchText, setSearchText] = useState('');
  const [items, setItems] = useState([]);
    const [error,seterror]=useState("");
    const {logout}=useContext(AuthContext);
    function errors(value){
        seterror(value);
        console.log(value)
        setdisable(false)
    }
    
    const Header = () => {
      const onPressCart = () => {
        navigation.navigate('Login');
      }
      return (
        <View style={styles.header}>
          <TouchableOpacity>
        <Image source={require('../assets/drawer_icon.png')} style={styles.cartIcon} />
      </TouchableOpacity>
          <Image source={require('../assets/foodpic.png')} style={styles.logoIcon} />
          <TouchableOpacity onPress={onPressCart}>
            <Image source={require('../assets/cart_icon.png')} style={styles.cartIcon} />
          </TouchableOpacity>
        </View>
      );
    };
      
      const Footer = () => {
        const navigation = useNavigation();
        return (
            <View style={styles.footerContainer}>
              {/* Ye footer ha */}
                <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Dashboard')}>
                      <Image style={styles.footerIcon} source={require('../assets/home_icon.png')} />
                      <Text style={styles.footerButtonText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Login')}>
                      <Image style={styles.footerIcon} source={require('../assets/menu_icon.png')} />
                      <Text style={styles.footerButtonText}>Menu</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Login')}>
                      <Image style={styles.footerIcon} source={require('../assets/deals_icon.png')} />
                      <Text style={styles.footerButtonText}>Deals</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Message')}>
                      <Image style={styles.footerIcon} source={require('../assets/chat_icon.png')} />
                      <Text style={styles.footerButtonText}>Chat</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('GiveFeedback')}>
                      <Image style={styles.footerIcon} source={require('../assets/more_icon.png')} />
                      <Text style={styles.footerButtonText}>More</Text>
                </TouchableOpacity>
          </View>
        );
      };
    const searchfun=()=>{
      if(searchText.trim() === '') {
        // set the items to an empty array to clear the previous search results
        setItems([]);
        return;
      }
      
      firebase.database().ref('Fooditems')
        .orderByChild('itemname')
        .startAt(searchText)
        .endAt(searchText + '\uf8ff')
        .once('value')
        .then((snapshot) => {
          // const items = snapshot.val();
          // if(items===null || items=="")
          // {
          //   // set the items to an empty array to clear the previous search results
          //   setItems([]);
          //   return;
          // }
          // else{
            setItems(Object.values(items));
            //setSearchClicked(true);
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
         <View>
         <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
         {/* ye search bar ha */}
                <TextInput 
                    style={{ borderRadius: 10,alignSelf: 'center', backgroundColor:'white',width:'80%',height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={setSearchText}
                    value={searchText}
                  /> 
                <Button title="Search" onPress={searchfun} />
        </View> 
        <Text></Text>

        {/* ye jb search hoga to list show krega */}
      
          <FlatList
            data={items}
            renderItem={({ item, index }) => (
              <View style={styles.messageContainer}>
                <Text style={styles.itemSubtitle}>Name: {item.itemname}</Text>
                <Text style={styles.itemSubtitle}>Price: {item.itemprice}</Text>
                <Text style={styles.itemSubtitle}>Quantity: {item.itemquantity}</Text>
              </View>
            )}
          />
      
        </View>
        <View style={styles.containern}>
           <HomeCarousel />
        </View>
    {/* yha ye buutons wala scene shuru ha     */}
    <ScrollView>
        <View style={styles.container1}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button1} onPress={() => navigation.navigate('TabviewScreen')}>
                    <Image style={styles.buttonImage1} source={require('../assets/Customizeorder.jpg')} />
                    <Text style={styles.buttonText1} >Customize Order</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button1} onPress={() => navigation.navigate('Tabviewallscreen')}>
                    <Image style={styles.buttonImage1} source={require('../assets/food.jpg')} />
                    <Text style={styles.buttonText1}>Quick Ordering</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button1} onPress={() => alert('Button 1 pressed!')}>
                    <Image style={styles.buttonImage1} source={require('../assets/food.jpg')} />
                    <Text style={styles.buttonText1}>Track Order</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button1} onPress={() => navigation.navigate('MakePayment')}>
                    <Image style={styles.buttonImage1} source={require('../assets/food.jpg')} />
                    <Text style={styles.buttonText1}>Make Payment</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button1} onPress={() => alert('Button 1 pressed!')}>
                    <Image style={styles.buttonImage1} source={require('../assets/food.jpg')} />
                    <Text style={styles.buttonText1}>Manage Cart</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button1} onPress={() => alert('Button 2 pressed!')}>
                    <Image style={styles.buttonImage1} source={require('../assets/food.jpg')} />
                    <Text style={styles.buttonText1}>Apply Vouchers</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button1} onPress={() => alert('Button 1 pressed!')}>
                    <Image style={styles.buttonImage1} source={require('../assets/food.jpg')} />
                    <Text style={styles.buttonText1}>Deals</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button1} onPress={() =>  navigation.navigate('GiveFeedback')}>
                    <Image style={styles.buttonImage1} source={require('../assets/food.jpg')} />
                    <Text style={styles.buttonText1}>Give Feedback</Text>
                </TouchableOpacity>
            </View>     
        </View>
    </ScrollView>
        </View>
        <Footer />
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
    container: {
        flex: 1,
        //backgroundColor: "#47b749",
    },
    containern: {
      width: '100%',
      height:'40%',
      paddingBottom:15,
    backgroundColor:"#eeeee4",
  },
    itemSubtitle: {
        fontSize: 14,
        color:'white'
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
      },
    //
    container1: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        //flexDirection: 'row',

      },
      button1: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 150,
        width: 150,
        //backgroundColor: '#cccccc',
        borderRadius: 20,
        margin: 20,
        flexDirection: 'row',
      },
      buttonImage1: {
        height: 150,
        width: 150,
        borderRadius:20,
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
    footerContainer: {
        height: 70,
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
      },
      footerIcon: {
        height: 20,
        width: 20,
        //marginRight: 10,
      },
      footerButton: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        width: 70,
        //backgroundColor: '#cccccc',
        borderRadius: 20,
      },
      footerButtonText: {
        //fontWeight: 'bold',
        fontSize: 16,
      },
      header: {
        height: 50,
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
      },
      menuIcon: {
        width: 30,
        height: 30,
        marginRight: 10,
      },
      logoIcon: {
        width: 50,
        height: 50,
      },
      cartIcon: {
        width: 30,
        height: 30,
        marginLeft: 10,
      },

});
