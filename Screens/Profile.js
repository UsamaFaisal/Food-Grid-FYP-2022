import React, { useState,useEffect } from 'react';
import {StyleSheet,SafeAreaView,ScrollView, View, Text, Image, TextInput, Button, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';
import Header from '../components/Header1';
const Profile = () => {
  const [editable, setEditable] = useState(false);

  const [username, setusername] = useState('');
  const [phoneno, setphoneno] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [allergicitems, setallergicitems] = useState('');
  const [disease, setdisease] = useState('');
  const [error, seterror] = useState("");
  const cuser = firebase.auth().currentUser;
  const handleEdit = () => {
    setEditable(true);
  };
  const handlevalidation=()=>{
    const validator = require('validator');
    if(username.length==0){
        seterror("Name Required")
        return false;
    }
    if(phoneno.length==0 ){
        seterror("PhoneNumber Not Valid")
        return false;
    }
    
    if (password.length<6)
    {
        seterror("Enter valid password (8 length,1uppercase,1lowercase,1number,1special character)")
        return false;
    }
    else
    {
        return true;
    }
    
};
const getUserInfo = () => {
    const usersRef = firebase.database().ref('Users');
    const unsubscribe = usersRef.on('value', (snapshot) => {
      const users = snapshot.val();
      const usernamesArray = Object.keys(users).map((key) => {
        const user = users[key];
        if (user.email === cuser.email) {
          setusername(user.name);
          setphoneno(user.phoneno);
          setemail(user.email);
          setpassword(user.password);
          setallergicitems(user.allergicitems);
          setdisease(user.disease);
          return user.name;
        }
        return null;
      }).filter((username) => username !== null);
    });
  
    // Unsubscribe when component unmounts
    return () => unsubscribe();
  };
  const handleSave = () => {
    // Save user details to database
    if(handlevalidation())
    {
    firebase.database().ref('Users/'+cuser.uid).set({
        name:username,
        phoneno:phoneno,
        password:password,
        email:email,
        disease:disease,
        allergicitems:allergicitems})    
    setEditable(false);
    }
  };
  
  
  
  useEffect(() => {
    getUserInfo();
  }, []); 
  return (
    <SafeAreaView>
    <View>
        <Header />
    </View>
    <ScrollView>
        <View style={styles.container}>
        <Text style={styles.title}>Profile</Text>
      <Image style={styles.img}
        source={require('../assets/account.png')}
      />
      </View>
      <View >
                <Text style={styles.error}>{error}</Text>
       </View>
      <Text style={styles.heading}>Name</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setusername}
        editable={editable}
      />
      <Text style={styles.heading}>Phone Number</Text>
      <TextInput
        style={styles.input}
        value={phoneno}
        maxLength={11}
        keyboardType='numeric'
        onChangeText={setphoneno}
        editable={editable}
      />
      <Text style={styles.heading}>Email</Text>
      <TextInput
      style={styles.input}
        value={email}
        editable={false}
      />
      <Text style={styles.heading}>Password</Text>
      <TextInput
      style={styles.input}
        value={password}
         onChangeText={setpassword}
        editable={false}
      />
      <Text style={styles.heading}>Allergic Items</Text>
      <TextInput
      style={styles.input}
        value={allergicitems}
        onChangeText={setallergicitems}
        editable={editable}
      />
      <Text style={styles.heading}>Diseases</Text>
      <TextInput
      style={styles.input}
        value={disease}
        onChangeText={setdisease}
        editable={editable}
      />
      <TouchableOpacity style={styles.button} onPress={handleEdit}>
          <Text >Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button1} onPress={handleSave}>
          <Text >Save</Text>
      </TouchableOpacity>
      <Text></Text>
      <Text></Text>
      <Text></Text>
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
      //flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    error: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ff0000',
        marginTop:15,
        marginLeft:15,
        fontSize: 15
    },
    img:{
        width: 200, 
        height: 200,
    },
    chart: {
      height: 200,
      width: 200,
      marginBottom: 16,
    },
    heading: {
      marginLeft:3,
      fontSize: 16,
      fontWeight: 'bold',
      
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
      paddingLeft:9,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 8,
      color:'black',
      backgroundColor:'#D3D3D3',
      marginBottom: 16,
      marginTop:5,
      width: '94%',
      borderRadius: 8,
      marginLeft:10,
    },
    button: {
      backgroundColor: 'steelblue',
      padding: 12,
      width:'94%',
      borderRadius: 8,
      marginBottom:30,
      marginLeft:10,
      
    },
    button1: {
        backgroundColor: '#ADD8E6',
        padding: 12,
        width:'100%',
        borderRadius: 8,
        marginBottom:30,
        marginLeft:8,
        marginRight:18,

      },
  });
  
export default Profile;
