import React, { useState,useContext,useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    FlatList,
    Image,
    TouchableOpacity,
    ScrollView,
    Button
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFValue as rf } from "react-native-responsive-fontsize";
import EmailField from '../components/EmailField';
import Btn from '../components/Btn';
import * as firebase from 'firebase';
import { useNavigation,useRoute } from '@react-navigation/native';

import Header from '../components/Header';

export default function AdminMessage() {
    const [disable,setdisable]=useState(false);
    const [msg,setmsg]=useState("");
    const [error,seterror]=useState("");
    const navigation = useNavigation();
    //const route=useRoute();
    //const userid= route.params.id;

    var [messages, setMessages] = useState([]);
    function errors(value){
        seterror(value);
        console.log(value)
        setdisable(false)
    }
    //const m = firebase.auth().currentUser && firebase.auth().currentUser.email;
    useEffect(()=>{
        const dbRef = firebase.database().ref();
                            dbRef.child("chat").get().then((snapshot) => {
                            if (snapshot.exists()) {
                                var arr2=[];
                                var arr1=[];
                                snapshot.forEach(element => {
                                    arr2.push(element.key)
                                    arr1.push(element.val())                                    
                                });
                                setMessages(arr2);
                                setmsg(arr1);
                                // console.log('message');
                            } else {
                                console.log("No data available");
                            }
                            }).catch((error) => {
                            console.error(error);
                            });
        
    },[]);
    const chatt = (id)=>{

        navigation.navigate('ChatHandling',{id})
      }
    return (
        <View style={styles.container}>
            <StatusBar style='auto' />
            <Header
                    //title='Sign Up'
                    back={() => navigation.goBack('AdminDashboard')} /> 
                    <View style={styles.error}><Text style={styles.error}>{error}</Text></View>
            <Text style ={styles.TextLable}>
        <Text style={{ color: 'black' , fontSize: rf(25) ,textAlign: 'center',fontWeight: 'bold'}}>Messages  </Text></Text>
            <FlatList
                  data = {messages}
                  renderItem={({ item, index }) => (
                <View style={styles.messageContainer}>
                 <Text style={styles.itemTitle}>{messages[index]}</Text>
                 <Text style={styles.messagebtn} ><Button color='green' title="Message"  onPress={() => chatt(messages[index])}/></Text>
                 {/* <Text style={styles.text}>{item.message}</Text> */}
                 </View>)}/>
        </View>
    );
}
const styles = StyleSheet.create({
    error:{
        alignItems: 'center',
        justifyContent: 'center',
        color:'#ff0000',
        fontSize:10
    },
    messageContainer:{
        marginTop:20,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        margin:35
    },
    container: {
        flex: 1,
    },
    EmailWrapper: {
        height: hp('15%'),
        justifyContent: 'flex-end',
        marginBottom: 10
    },
    TextLable: {
        marginTop:20,
        fontSize: rf(37),
        color: '#fcfefc',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    messagebtn: {
        flex:1,
        width:200,
        padding:10,
        marginLeft:30
    },
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
    itemContainer: {
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4
      },
    itemTitle: {
        marginLeft:40,
        marginTop:20,
        fontSize: 16,
        fontWeight: 'bold',
        color:'black'
      }

});
