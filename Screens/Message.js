import React, { useState,useContext ,useEffect} from 'react';
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    Image,
    TouchableOpacity,
    ScrollView,
    FlatList
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFValue as rf } from "react-native-responsive-fontsize";
import EmailField from '../components/EmailField';
import Header from '../components/Header';
import Btn from '../components/Btn';
import * as firebase from 'firebase';
import { GiftedChat } from 'react-native-gifted-chat';



export default function Message({navigation}) {
    const [disable,setdisable]=useState(false);
    const [msg,setmsg]=useState([]);
    const [error,seterror]=useState("");
    const [messages, setMessages] = useState([]);
    const [mid, setmid] = useState([]);
   const sendername='User: '

    function errors(value){
        seterror(value);
        console.log(value)
        setdisable(false)
    }
    const m = firebase.auth().currentUser && firebase.auth().currentUser.email;
    
    function sendMessage() {
        //setMessages(previousMessages=>GiftedChat.append(previousMessages,messages));
        firebase.database().ref('chat/'+ firebase.auth().currentUser.uid).push({
            message:sendername + msg ,
            email:m,
          sender: firebase.auth().currentUser.uid,
          timestamp: new Date() 
          //firebase.database.ServerValue.TIMESTAMP
          
        });
      }
      useEffect(()=>{
        firebase.database().ref('chat/'+ firebase.auth().currentUser.uid).get().then ((snapshot) => {
            // update the chat interface with the 
            var namm=[];
            snapshot.forEach(element => {
                namm.push(element.val());
                //console.log("Elemnt:",element.val());
            });
            setMessages(namm);
          });
          
    },[]);
      
    return (
        <View style={styles.container}>
        <StatusBar style='auto' />
        <Header title='Admin' 
            back={() => navigation.goBack('Dashboard')}></Header>        
            <View style={styles.error}><Text style={styles.error}>{error}</Text></View>
         <FlatList
            //   data = {messages}
              data={messages}
              extraData={messages}
              renderItem={({ item }) => (
            <View style={styles.messageContainer}>
             {/* <Text style={styles.sender}> {item.sender}</Text> */}
             <Text style={styles.text}>{item.message}</Text>
             </View>)}/>
             <View>
                <EmailField   
                    email='Enter Message'
                    onChange={setmsg}
                />
            </View>
            
            <View style={styles.BtnWrapper}>
                <Btn
                    color={disable?'#555555':'#000000'}
                    title='Send'
                    btntextcolor='#fff'
                    navigation={() => {
                        sendMessage();       
                }}
                    />
            </View>
            <Text></Text><Text></Text>

        
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
    messageContainer: {
        flexDirection: 'row',
        padding: 10,
        margin: 10,
        borderWidth: 1,
        color:'#000000',
        borderColor: '#ccc',
        borderRadius: 10,
        alignItems: 'flex-start',
      },
      sender: {
        fontWeight: 'bold',
      },
      text: {
        color:'#000000',
        textAlign: 'right',
      //  marginLeft: 270,
      },

});
