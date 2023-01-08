import React, { useState, useEffect,} from 'react';
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    FlatList,
    Button,
    Alert,
    TouchableOpacity,
    
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFValue as rf } from "react-native-responsive-fontsize";
import Btn from '../components/Btn';
import * as firebase from 'firebase';
import  Header  from '../components/Header';
import {useNavigation} from '@react-navigation/native';

export default function ManageFooditems() {
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
        dbRef.child("Fooditems").get().then((snapshot) => {
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

    const EditFooditem = (id)=>{
      navigation.navigate('EditFooditem',{id})
    }

    const onDelete = (id) => {
        const fireDb = firebase.database().ref();
        fireDb.child(`Fooditems/${id}`).remove((err)=>{
          if(!err)
          {
            Alert.alert('Success', 'Delete Footitem successful!', [{text: 'OK'}]);
          }
          else{
            Alert.alert('Item Not Found', [{text: 'OK'}]);
          }
        
        })   
    }
    return (

      <View style={styles.container}>
          <StatusBar style='auto' /> 
        
                <Header
                    //title='Sign Up'
                    back={() => navigation.goBack()} />         
          <Text style ={styles.TextLable}>
        <Text style={{ color: 'white' , fontSize: rf(25) ,textAlign: 'center',fontWeight: 'bold'}}>M A N A G E   </Text>
        <Text style={{ color: 'green' , fontSize: rf(25) ,textAlign: 'center',fontWeight: 'bold'}}>I T E M  </Text>     
      </Text>
  
              <View style={styles.BtnWrapper}>
                  <Btn
                      //disabled={disable}
                      color={disable?'#555555':'green'}
                      title='Add Fooditem'
                      btntextcolor='#fff'
                      navigation={() => {
                        navigation.navigate('AddFooditem');
                         // console.log(users);
                         // setdisable(true);
                  }} 
                      />
                       </View>
                       {/* <Text style={styles.TextLable3}>Available Items </Text>     */}
             {/* <View style={styles.itemTitle4}>     
              <Text >
              <Text style={styles.itemTitle}>   Name    </Text>
               <Text style={styles.itemTitle}>  Quantity</Text>
               <Text style={styles.itemTitle}>      Price</Text>
               <Text style={styles.itemTitle}>      Update</Text>
               <Text style={styles.itemTitle}>      Delete</Text>
               </Text>
               </View>   */}
          <FlatList 
                data = {users}
                renderItem={({ item,index }) => (
              <View style={styles.itemContainer}>
                {/* <Text style={styles.itemTitle}>ID: {user[index]}</Text> */}
               <Text style={styles.itemTitle}>Name: {item.itemname}</Text>
               <Text style={styles.itemSubtitle}>Quantity: {item.itemquantity}</Text>
               <Text style={styles.itemSubtitle}>Price: {item.itemprice}</Text>
               <Text></Text>
               <Button color="green" title="Update" onPress={() => EditFooditem(user[index])}
                />
                <Text></Text>
                <Button color="red" title="Delete" onPress={()=> onDelete(user[index])}
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
        backgroundColor: "#6ebe44",
    },
     itemName:{
       fontWeight:'300',
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
        fontWeight: 'bold',
        color: 'white' ,
        paddingTop: 20 
      },
      itemTitle4: {

        fontSize: 16,
        fontWeight: 'bold',
        color: 'white' ,
        paddingTop: 40 
      },
      itemSubtitle: {
        fontSize: 14,
        color: 'white',
        fontWeight:'bold'
      },
    AccountTxt: {
        fontSize: rf(10),
        color: '#fff',
        textAlign: 'center',
        marginBottom: 10
    },
    button: {
        fontSize: rf(6),
        color: 'red',
        textAlign: 'right',
        marginBottom: 10,
        bottom:11,
        right:-200

    },
    AccountTxt1: {
        fontSize: rf(12),
        color: 'black',
        borderColor:"blue", 
        textAlign: 'left',
        marginBottom: 10,
        bottom:-11,
        right:-50
    },
    TextLable: {
        fontSize: rf(37),
        color: '#fcfefc',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    TextLable3: {
        fontSize: rf(25),
        color: '#fcfefc',
        textAlign: 'center',
        fontWeight: 'Agency',
        bottom:-20        
    },
    itembtn:{
        color:'green',
    }


});