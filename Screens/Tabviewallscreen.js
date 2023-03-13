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
//import HomeCarousel from '../components/Carousel';
import TabViewComponentall from '../components/Tabviewall';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RFValue as rf } from "react-native-responsive-fontsize";
import { AuthContext } from '../routes/Authenticationprovider';
export default function TabviewScreen({ navigation }) {
    const Tab = createBottomTabNavigator();
    const [disable,setdisable]=useState(false);
    const [error,seterror]=useState("");
    const {logout}=useContext(AuthContext);
    function errors(value){
        seterror(value);
        console.log(value)
        setdisable(false)
    }
    const Header = () => {
        return (
          <View style={{ height: 50, backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Header</Text>
          </View>
        );
      };
      
      const Footer = () => {
        const navigation = useNavigation();
        return (
          <View style={styles.footerContainer}>
          {/* Ye footer ha */}
            <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Login')}>
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
       return (
        
        <SafeAreaView style={{ flex: 1 }}>
        <Header />
        <TabViewComponentall />
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

});
