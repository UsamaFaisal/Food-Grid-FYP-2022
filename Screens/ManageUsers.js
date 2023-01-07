import React, { useState, useEffect,} from 'react';
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    FlatList,
    Button,
    Alert
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFValue as rf } from "react-native-responsive-fontsize";
import Btn from '../components/Btn';
import * as firebase from 'firebase';
import {useNavigation} from '@react-navigation/native';

export default function ManageUsers() {
    const [users,setUsers]=useState([]);
    const [user,setUser]=useState([]);
    const [disable,setdisable]=useState(false);
    const [error,seterror]=useState("");
    const navigation = useNavigation();
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
            var arr2=[];
            snapshot.forEach(element => {
                arr.push(element.val())
                arr2.push(element.key)
                // console.log(arr2);
                //var id = element.key;
                //console.log(id);


            });
            setUsers(arr);
            setUser(arr2)
          } else {
            console.log("No data available");
          }
        }).catch((error) => {
          console.error(error);
        });
    },[]);

    const EditUser = (id)=>{
      navigation.navigate('EditUser',{id})
    }

    const onDelete = (id) => {
        const fireDb = firebase.database().ref();
        fireDb.child(`Users/${id}`).remove((err)=>{
          if(!err)
          {
            Alert.alert('Success', 'Delete User successful!', [{text: 'OK'}]);
          }
          else{
            Alert.alert('User Not Found', [{text: 'OK'}]);
          }
        })
    }
    return (
      <View style={styles.container}>
          <StatusBar style='auto' />
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
          <FlatList 
                data = {users}
                renderItem={({ item,index }) => (
              <View style={styles.itemContainer}>
                {/* <Text style={styles.itemTitle}>ID: {user[index]}</Text> */}
               <Text style={styles.itemTitle}>Username: {item.username}</Text>
               <Text style={styles.itemSubtitle}>Email: {item.email}</Text>
               <Text style={styles.itemSubtitle}>Phone: {item.phone}</Text>
               <Text style={styles.itemSubtitle}>Allergic Items: {item.allergicitems}</Text>
               <Text style={styles.itemSubtitle}>Disease: {item.disease}</Text>
               <Button  title="Update" onPress={() => EditUser(user[index])}
                />
                <Text></Text>
                <Button title="Delete" onPress={()=> onDelete(user[index])}
                />
               </View>)}
            />
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
    btndelete:{
      color:"#FF0000",
      backgroundColor:"#FF0000"
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