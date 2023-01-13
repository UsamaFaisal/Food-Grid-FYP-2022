import React, { useState,useContext,useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    Image,
    TouchableOpacity,
    ScrollView,
    FlatList,
    RefreshControl
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFValue as rf } from "react-native-responsive-fontsize";
import EmailField from '../components/EmailField';
import Btn from '../components/Btn';
import Header from '../components/Header';
import * as firebase from 'firebase';
import { GiftedChat } from 'react-native-gifted-chat';
import {useNavigation, useRoute} from '@react-navigation/native';
// import { Header } from 'react-native-elements';



export default function ChatHandling() {
    const [disable,setdisable]=useState(false);
    const [msg,setmsg]=useState([]);
    const [error,seterror]=useState("");
    const navigation = useNavigation();
    var [messages, setMessages] = useState([]);
    const [mid, setmid] = useState([]);
    const route = useRoute();
    const itemId = route.params.id;
    const sendername = 'Admin: '
    function errors(value){
        seterror(value);
        console.log(value)
        setdisable(false)
    }

    const m = firebase.auth().currentUser && firebase.auth().currentUser.email;
    // console.log(id)
    // const AdminMessage=(id)=>{
    //     console.log("1",id)
    // navigation.navigate('AdminMessage',{id});
    // console.log("2",id)
    // }
    
   
    
    //function getmsg(val) {
      //  setmsg(val)
        //console.log(mail)
    //}
    
    // function sendMessage() {
    //     //setMessages(previousMessages=>GiftedChat.append(previousMessages,messages));
    //     firebase.database().ref('chat/'+ firebase.auth().currentUser.uid).push({
    //       message: msg,
    //       sender: firebase.auth().currentUser.uid,
    //       timestamp: new Date() 
    //       //firebase.database.ServerValue.TIMESTAMP
          
    //     });
    //   }

    

    function sendMessage() {
        //setMessages(previousMessages=>GiftedChat.append(previousMessages,messages));
        firebase.database().ref('chat/'+ itemId).push({
          message: sendername+msg,
          email:m,
          sender: firebase.auth().currentUser.uid,
          timestamp: new Date() 
          //firebase.database.ServerValue.TIMESTAMP
        });
      }
    useEffect(()=>{
        firebase.database().ref('chat/'+ itemId).get('child').then ((snapshot) => {
            var msg=[];
            snapshot.forEach(element => {
                msg.push(element.val());
            });
            setMessages(msg);
          });
    },[]);
    return (
        <View style={styles.container}>
            <StatusBar style='auto' />
            <Header title='User' 
                back={() => navigation.goBack('AdminMessage')}></Header>
                     
                <FlatList
                    data = {messages}
                    renderItem={({ item,index }) => (
                    <View style={styles.messageContainer}>
                    {/* <Text style={styles.sender}> {item.message}</Text> */}
                    <Text style={styles.text}>{messages[index].message}</Text>
                    </View>)}
                />
                <View >
                    <EmailField 
                        email='Enter Message'
                        onChange={setmsg}
                    />
                </View>
                
                <View style={styles.BtnWrapper}>
                    <Btn
                        color={disable?'#555555':'#000000'}
                        title='Send Message'
                        btntextcolor='#fff'
                        navigation={() => {
                            sendMessage();}} 
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
        height: hp('10%'),
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
