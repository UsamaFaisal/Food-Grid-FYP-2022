import React, { useState,useContext,useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    FlatList,
    Image,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFValue as rf } from "react-native-responsive-fontsize";
import EmailField from '../components/EmailField';
import Btn from '../components/Btn';
import * as firebase from 'firebase';
import { useNavigation,useRoute } from '@react-navigation/native';
import { Button } from 'react-native-elements';

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
    const m = firebase.auth().currentUser && firebase.auth().currentUser.email;
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
            <Text style ={styles.TextLable}>
        <Text style={{ color: 'white' , fontSize: rf(25) ,textAlign: 'center',fontWeight: 'bold'}}>U S E R </Text>
        <Text style={{ color: 'green' , fontSize: rf(25) ,textAlign: 'center',fontWeight: 'bold'}}>M E S S A G E S  </Text></Text>
            <ScrollView>         
                <View style={styles.error}><Text style={styles.error}>{error}</Text></View>
               
            </ScrollView>
            <FlatList
                  data = {messages}
                  renderItem={({ item, index }) => (
                <View style={styles.messageContainer}>
                 <Text style={styles.sender}> {messages[index]}</Text>
                 {/* <Text style={styles.sender}> {msg[index]}</Text> */}
                 <Button  title="Message"  onPress={() => chatt(messages[index])}
                />
                 {/* <Text style={styles.text}>{item.message}</Text> */}
                 </View>)}/>
        </View>
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
        backgroundColor: "#47b749",
    },
    EmailWrapper: {
        height: hp('15%'),
        justifyContent: 'flex-end',
        marginBottom: 10
    },
    TextLable: {
        fontSize: rf(37),
        color: '#fcfefc',
        textAlign: 'center',
        fontWeight: 'bold'
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
    }

});
