import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    VirtualizedList,
    Image,
    TouchableOpacity,
    FlatList,
    Pressable,
    ScrollView
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFValue as rf } from "react-native-responsive-fontsize";
import Btn from '../components/Btn';
import * as firebase from 'firebase';

export default function ManageUsers({ navigation }) {
    const [users,setUsers]=useState([]);
    const [disable,setdisable]=useState(false);
    const [error,seterror]=useState("");
    
    function errors(value){
        seterror(value);
        console.log(value)
        setdisable(false)
    }

    useEffect(()=>{
        
        const dbRef = firebase.database().ref();
        dbRef.child("Users").get().then((snapshot) => {
          if (snapshot.exists()) {
            var arr=[];
            snapshot.forEach(element => {
                arr.push(element.val())
      //          console.log(element.val().email);

            });
            setUsers(arr);
            //console.log(snapshot.val());
          } else {
            console.log("No data available");
          }
        }).catch((error) => {
          console.error(error);
        });
    },[]);
    return (
        <View style={styles.container}>
            <StatusBar style='auto' />
            <ScrollView>
                <View style={styles.error}><Text style={styles.error}>{error}</Text></View>
                <View style={styles.BtnWrapper}>
                    <Btn
                        //disabled={disable}
                        color={disable?'#555555':'#000000'}
                        title='Add User'
                        btntextcolor='#fff'
                        navigation={() => {
                            console.log(users);
                           // setdisable(true);
                    }} 
                        />
                </View>
               
            </ScrollView>
            
            <FlatList style={styles.itemContainer1}
                  data = {users}
                  renderItem={({ item }) => (
                <View style={styles.itemContainer}>
                 <Text style={styles.itemTitle}>Username: {item.username}</Text>
                 <Text style={styles.itemSubtitle}>Email: {item.email}</Text>
                 <Text style={styles.itemSubtitle}>Phone: {item.phone}</Text>
                 <Text style={styles.itemSubtitle}>Allergic Items: {item.allergicitems}</Text>
                 <Text style={styles.itemSubtitle}>Disease: {item.disease}</Text>
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
     itemName:{
       fontWeight:'300'
     },
     itemEmail:{
       fontWeight:'300'
     },
     itemContact:{
       fontWeight:'300'
     },
    BtnWrapper: {
        height: hp('15%'),
        justifyContent: 'flex-end'
    },
    itemContainer1: {
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        borderWidth: 1,
        borderColor: '#00000',
        borderRadius: 4
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
        fontSize: 16,
        fontWeight: 'bold'
      },
      itemSubtitle: {
        fontSize: 14,
        color: '#999'
      },
    AccountTxt: {
        fontSize: rf(10),
        color: '#fff',
        textAlign: 'center',
        marginBottom: 10
    }

});