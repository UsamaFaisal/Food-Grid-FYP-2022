import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    FlatList,
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { RFValue as rf } from 'react-native-responsive-fontsize';
import EmailField from '../components/EmailField';
import Header from '../components/Header1';
import Btn from '../components/Btn';
import * as firebase from 'firebase';

export default function Message({ navigation }) {
    const [disable, setdisable] = useState(false);
    const [msg, setmsg] = useState([]);
    const [error, seterror] = useState('');
    const [messages, setMessages] = useState([]);
    const [usernames, setUsernames] = useState([]);
    const [process, setProcess] = useState([])
    const m = firebase.auth().currentUser && firebase.auth().currentUser.email;
    const cuseremail = firebase.auth().currentUser.email;
    useEffect(() => {
        const unsubscribe = getUserName();
        return () => {
            unsubscribe();
        };
    }, []);

    function getUserName() {
        const usersRef = firebase.database().ref('Users');
        const unsubscribe = usersRef.on('value', (snapshot) => {
            const users = snapshot.val();
            const usernamesArray = Object.keys(users).map((key) => {
                const user = users[key];
                if (user.email === m) {
                    return user.username || user.name;
                }
                return null;
            }).filter((username) => username !== null);
            setUsernames(usernamesArray);
        });
        return () => {
            usersRef.off('value', unsubscribe);
        };
    };

    function sendMessage() {
        firebase.database().ref('chat/' + usernames).push({
            message: msg,
            email: m,
            sender: firebase.auth().currentUser.uid,
            timestamp: new Date(),
        });
    }

    function updatemessages() {
        firebase.database().ref('chat/' + usernames).get().then((snapshot) => {
            var namm = [];
            snapshot.forEach((element) => {
                namm.push(element.val());
            });
            setProcess(namm);
        });
    }
    useEffect(() => {
        updatemessages(); // update messages initially
        setMessages(process)

    }, [process]);

    return (
        <View style={styles.container}>
            {/* {getUserName()} */}
            <StatusBar style="auto" />
            <Header style={styles.header}
                title="Admin"
                back={() => navigation.goBack('Dashboard')}
            ></Header>
            <View>
            <Text style={styles.adminText}>Admin</Text>
            </View>
            <FlatList
                data={messages}
                extraData={messages}
                renderItem={({ item }) => (
                    <View style={[styles.messageContainer, { backgroundColor: item.email === cuseremail ? '#4CAF50' : '#EFEFEF' }]}>
                        {(item.email === cuseremail) > 0 ? (
                            <Text style={[styles.text, { color: '#000000',textAlign: "right" }]}>{item.message}</Text>                     
                        ) : (
                            <Text style={[styles.text,{ textAlign: "left",color: '#000000' }]}>{item.message}</Text>
                        )}
                    </View>
                )}
            />
            <View  >
                <EmailField
                    email="Enter Message"
                    onChange={setmsg}
                />
            </View>
            <View style={styles.BtnWrapper}>
                <Btn
                    color={disable ? '#555555' : 'steelblue'}
                    title="Send"
                    btntextcolor="#fff"
                    navigation={() => {
                        sendMessage();
                        updatemessages();
                    }}
                />
            </View>
            <Text></Text><Text></Text>
        </View>
    );
}

const styles = StyleSheet.create({
    textInputContainer: {
    backgroundColor: 'white',
       
      },
    text: {
        padding: 10,
        color: '#000000',
        borderRadius: 10,
        fontSize: rf(16)
      },
    adminText: {
        fontWeight: 'bold',
        fontSize: rf(20),
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 10,
      },
    header:{
        marginTop:100
    },
    container: {
        flex: 1,
        backgroundColor: "#D3D3D3",
    },
    EmailWrapper: 
    {
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
        padding: 10,
        margin: 10,
        borderWidth: 1,
        color: '#000000',
        borderColor: '#ccc',
        borderRadius: 10,
    },
    sender: {
        fontWeight: 'bold',
    },
    text: {
        color: '#000000',
        textAlign: 'right',
        //  marginLeft: 270,
    },

});