import React, { useState, useEffect,useContext} from 'react';
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    FlatList,
    Button,
    Alert,
    ScrollView
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFValue as rf } from "react-native-responsive-fontsize";
import Btn from '../components/Btn';
import * as firebase from 'firebase';
import {useNavigation, useRoute} from '@react-navigation/native';
import EmailField from '../components/EmailField';
import PasswordField from '../components/PasswordField';
import Header from '../components/Header'
import { AuthContext } from '../routes/Authenticationprovider';
import { registerCustomIconType } from 'react-native-elements';

const EditUser = () => {
    const [disable,setdisable]=useState(false);
    const [name, setname] = useState("");
    const [phone, setphone] = useState("");
    const [mail, setmail] = useState("");
    const [password, setpassword] = useState();
    const [disease, setdisease] = useState("");
    const [allergicitems, setallergicitems] = useState("");
    const [showname, setshowname] = useState("");
    const [showphone, setshowphone] = useState("");
    const [showmail, setshowmail] = useState("");
    // const [password, setpassword] = useState();
    const [showdisease, setshowdisease] = useState("");
    const [showallergicitems, setshowallergicitems] = useState("");
    const [users, setUser] = useState("");
    const [error,seterror]=useState("");
    const navigation = useNavigation();
    const {register}= useContext(AuthContext);
    const {update}= useContext(AuthContext);
    const route = useRoute();
    const itemId = route.params.id;
    function errors(value){
        seterror(value);
        console.log(value)
        setdisable(false)
    }

    function getname(val) {
      setname(val)
  }
  function getphone(val) {
      setphone(val)
  }
  function getemail(val) {
      setmail(val.toLowerCase().trim());
  }
  function getpassword(val) {
      setpassword(val)
  }
  function getdisease(val) {
      setdisease(val)
  }

  useEffect(()=>{
    firebase.database().ref('Users/' + itemId).once('value').then(function(snapshot){
      if (snapshot.exists()) {
        var arr2=[];
        snapshot.forEach(element => {
            arr2.push(element.val())
        });
        // console.log(arr2);
        setUser(arr2)
        setshowname(arr2[5])
        setshowphone(arr2[4])
        // setpassword(arr2[3])
        setshowmail(arr2[2])
        setshowdisease(arr2[1])
        setshowallergicitems(arr2[0])
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
},[]);
    // firebase.database().ref('Users/' + itemId).once('value').then(function(snapshot) {
    //   var item = snapshot.val();
    //   console.log(item);
    //   // Do something with the item data.
    // });
  return (
    <View style={styles.container}>
      <StatusBar style='auto' />
        <ScrollView>
          <Header
            title='User Details'
            back={() => navigation.goBack('ManageUsers')} />
          <View style={styles.error}><Text style={styles.error}>{error}</Text></View>
          <View style={styles.EmailWrapper}>
            <EmailField
              title='Name'
              //Icon
              email={showname}
              onChange={setname} />
            <EmailField
              title='Phone'
              //Icon
              email={showphone}
              onChange={setphone} />
            <EmailField
              title='Email address'
              email={showmail}
              onChange={setmail}/>
            <PasswordField
              title='Password'
              onChange={setpassword} />
            <EmailField
              title='Disease'
              email={showdisease}
              onChange={setdisease}/>
            <EmailField
              title='Allergic Items'
              email={showallergicitems}
              onChange={setallergicitems}/>
          </View>
          <View style={styles.BtnWrapper}>
                    <Btn
                        title='Update'
                       color={disable?'#555555':'#000000'}
                        btntextcolor='#fff'
                        navigation={
                            () => {

                                // const validator = require('validator');
                                // if(name.length<2){
                                //     seterror("Please enter a valid name")
                                // }
                                // // else if (!validator.isEmail(mail))
                                // //     seterror("Email is not valid")
                                // else if (password.length<6)
                                // seterror("Password's length should be minimum of 6 characters")
                                // else{
                                //     setdisable(true);
                                 
                                // }
                                    firebase.database().ref('Users/'+itemId).set({
                                    username:name,
                                    phone:phone,
                                    email:mail,
                                    password:password,
                                    disease:disease,
                                    allergicitems:allergicitems
                                });
                                update(mail,password)
                                register(mail,password)
                                Alert.alert('Success', 'Update User successfully!', [{text: 'OK'}]);
                            }
                        } />
                </View>
        </ScrollView>
    </View>
  )
}

export default EditUser;

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
    height: hp('45%'),
    justifyContent: 'space-evenly',
    marginBottom: 10,
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
  AccountTxt: {
      fontSize: rf(10),
      color: '#fff',
      textAlign: 'center',
      marginBottom: 10
  }

});
