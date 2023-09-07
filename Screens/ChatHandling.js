import React, { useState, useContext, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  RefreshControl,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { RFValue as rf } from 'react-native-responsive-fontsize';
import EmailField from '../components/EmailField';
import Btn from '../components/Btn';
import Header from '../components/Header';
import * as firebase from 'firebase';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function ChatHandling() {
  const [disable, setdisable] = useState(false);
  const [msg, setmsg] = useState([]);
  const navigation = useNavigation();
  const [messages, setMessages] = useState([]);
  const route = useRoute();
  const itemId = route.params.id;

  const m = firebase.auth().currentUser && firebase.auth().currentUser.email;

  function sendMessage() {
    firebase
      .database()
      .ref('chat/' + itemId)
      .push({
        message: msg,
        email: m,
        sender: firebase.auth().currentUser.uid,
        timestamp: new Date(),
        //firebase.database.ServerValue.TIMESTAMP
      });
  }

  function updateMessages() {
    firebase
      .database()
      .ref('chat/' + itemId)
      .get('child')
      .then((snapshot) => {
        var msg = [];
        snapshot.forEach((element) => {
          msg.push(element.val());
        });
        setMessages(msg);
      });
  }

  useEffect(() => {
    updateMessages(); // update messages initially
    const intervalId = setInterval(updateMessages, 100); // update messages every 500ms
    return () => clearInterval(intervalId); // clear the interval on component unmount
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Header />
      <FlatList
        data={messages}
        renderItem={({ item, index }) => (
          <View style={styles.messageContainer}>
            {(messages[index].email === "admin1@gmail.com") > 0 ?(
              <Text style={{textAlign:"right"}}>{messages[index].message}</Text>
            ):(
              <Text style={{textAlign:"left"}}>{messages[index].message}</Text>
            )}
          </View>
        )}
      />
      <View>
        <EmailField email="Enter Message" onChange={setmsg} />
      </View>

      <View style={styles.BtnWrapper}>
        <Btn
          color={disable ? '#555555' : '#000000'}
          title="Send Message"
          btntextcolor="#fff"
          navigation={() => {
            sendMessage();
            updateMessages();
          }}
        />
      </View>

      <Text></Text>
      <Text></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  error: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ff0000',
    fontSize: 24,
  },
  container: {
    flex: 1,
    backgroundColor: '#000000',
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
        padding: 10,
        margin: 10,
        borderWidth: 1,
        color:'#000000',
        borderColor: '#ccc',
        borderRadius: 10,
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
