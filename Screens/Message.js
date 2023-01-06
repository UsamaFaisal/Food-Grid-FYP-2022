import React, { useState,useContext } from 'react';
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
import Btn from '../components/Btn';
import * as firebase from 'firebase';
import { GiftedChat } from 'react-native-gifted-chat';




export default function Message({ navigation }) {
    const [disable,setdisable]=useState(false);
    const [msg,setmsg]=useState("");
    const [error,seterror]=useState("");
    var [messages, setMessages] = useState([]);
    function errors(value){
        seterror(value);
        console.log(value)
        setdisable(false)
    }
    //function getmsg(val) {
      //  setmsg(val)
        //console.log(mail)
    //}
    function sendMessage() {
        //setMessages(previousMessages=>GiftedChat.append(previousMessages,messages));
        firebase.database().ref('chat/'+ firebase.auth().currentUser.uid).push({
          message: msg,
          sender: firebase.auth().currentUser.uid,
          timestamp: firebase.database.ServerValue.TIMESTAMP
        });
      }
      
      
    return (
        <View style={styles.container}>
            <StatusBar style='auto' />
            <ScrollView>         
                <View style={styles.error}><Text style={styles.error}>{error}</Text></View>
                <View style={styles.EmailWrapper}>
                    <EmailField
                        title='Message'
                        Icon
                        email='Enter Message'
                        onChange={setmsg}
                    
                    />
                    
                </View>
                
                <View style={styles.BtnWrapper}>
                    <Btn
                        //disabled={disable}
                        color={disable?'#555555':'#000000'}
                        title='Send'
                        btntextcolor='#fff'
                        navigation={() => {
                            //setdisable(true);
                            firebase.database().ref('chat/'+ firebase.auth().currentUser.uid).on('child_added', snapshot => {
                                // update the chat interface with the 
                                var namm=[];
                                snapshot.forEach(element => {
                                    namm.push(element.val());
                                    console.log(element);
                                });
                                setMessages(namm);
                              }); 
                              
                        sendMessage();     
                    }} 
                        />
                </View>
                
               {/* <View>
                {messages.foreach(element =>
                 <Text key={element.timestamp}> {element.message} </Text> )}
                </View> */}
            </ScrollView>
            {/* <FlatList
            data={messages}
            renderItem={({ item }) => <Text>{item.message}</Text>}
            keyExtractor={item => item.id}
             /> */}
            
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
    }

});
