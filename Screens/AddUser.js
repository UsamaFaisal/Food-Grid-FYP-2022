import React, { useState,useContext } from 'react';
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    Image,
    TouchableOpacity,
    ScrollView,
    Alert
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFValue as rf } from "react-native-responsive-fontsize";
import Header from '../components/Header'

import EmailField from '../components/EmailField';
import PasswordField from '../components/PasswordField';
import Btn from '../components/Btn';
import { AuthContext } from '../routes/Authenticationprovider';
import * as firebase from 'firebase'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

export default function Signup({ navigation }) {
    const [disable,setdisable]=useState(false);
    
    const [name, setname] = useState("@username");
    const [phone, setphone] = useState("@contact");
    const [mail, setmail] = useState("");
    const [password, setpassword] = useState("");
    const [disease, setdisease] = useState("@disease");
    const [allergicitems, setallergicitems] = useState("@allergicitems");
    
    const [error, seterror] = useState("");
     const flagg=false;
   const {register}= useContext(AuthContext);

    function errors(value) {
        seterror(value);
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
    function getallergicitems(val) {
        setallergicitems(val)
    }
    // function checkIfUserExists(email,password) {
    //     firebase.auth().createUserWithEmailAndPassword(email, password)
    //     .then(u => {})
    //     .catch(error => {
    //        switch (error.code) {
    //           case 'Error: The email address is already in use by another account.':
    //             return true
    //             break;
    //           default:
    //             return false
    //             //console.log(error.message);
    //             break;
    //         }
    //     });
    //   }
    async function getEmails(mail) {
        try {
          const snapshot = await firebase.database().ref('Users').once('value');
          const users = snapshot.val();
          //const emails = [];
            for (const user of Object.values(users)) 
            {
                    console.log(user.email)
                    console.log(mail)
                    if(user.email.toString() === mail.toString())
                    {
                        console.log('aya')
                        return true;
                    }
            }
            return false
          //console.log(emails);
        } catch (error) {
          console.log(error);
        }
        return false
      } 
         
    const handlevalidation=()=>{
        const validator = require('validator');
        // getEmails(mail).then(result => {
        //     console.log(result);
        //     if(result){
        //         seterror("mail already")
        //     return false;
        //     }
        //   });
        // if(name.length==0){
        //     seterror("Name Required")
        //     return false;
        // }
        // if(phone.length==0 || (phone.length<11 || phone.length>11)){
        //     seterror("PhoneNumber Not Valid")
        //     return false;
        // }
        if (!validator.isEmail(mail) || mail.length==0)
        {
            seterror("Email Not valid")
            return false;
        }
        if (password.length<6)
        {
            seterror("Password's length should be minimum of 6 characters")
            return false;
        }
        else
        {
            return true;
        }
        
    };
    
    const registeruserr=()=>{
        var t=true
        var userid = firebase.database().ref().push().key;
        firebase.database().ref('Users/'+userid).set({
        username:name,
        phone:phone,
        email:mail,
        password:password,
        disease:disease,
        allergicitems:allergicitems
    })
    register(mail,password).then(result=>{
        if(!result)
        {
            t=false
        }

    });
    return t
    };
    const func=()=>{
    if(handlevalidation() && registeruserr())
    {
          return true
    }
    else 
        return false;
    };
    return (
        <View style={styles.container}>
            <StatusBar style='auto' />
            <ScrollView>
                <Header
                    title='Add User'
                    back={() => navigation.goBack('ManageUsers')} />
                <View style={styles.error}>
                    <Text style={styles.error}>{error}</Text>
                </View>
                <View style={styles.EmailWrapper}>
                    {/* <EmailField
                        title='Name'
                        //Icon
                        email='Enter Name'
                        onChange={setname} />
                    <EmailField
                        title='Phone'
                        //Icon
                        email='Enter Phone'
                        onChange={setphone} /> */}
                    <EmailField
                        title='Email address'
                        email='Enter email'
                        onChange={setmail}
                    />
                    <PasswordField
                        title='Password'
                        onChange={setpassword} />
                    {/* <EmailField
                        title='Disease'
                        email='Enter Disease'
                        onChange={setdisease}
                    />
                    <EmailField
                        title='Allergic Items'
                        email='Enter Allergic Items'
                        onChange={setallergicitems}
                    /> */}
                </View>

                <View style={styles.BtnWrapper}>
                    <Btn
                        title='Add User'
                      //  disabled={disable}
                       color={disable?'#555555':'#000000'}
                        btntextcolor='#fff'
                        //onPress={()=> register(mail,password)}
                        navigation={
                            () => {       
                            if(func())
                            {
                                Alert.alert('Added User Successfully!');
                            }        
                        }
                        } />
                </View>
            </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    error: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ff0000',
        fontSize: 24
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
        height: hp('10%'),
        justifyContent: 'flex-end'
    },
    SignUBtnWrapper: {
        height: hp('18%'),
        justifyContent: 'flex-end'
    },
    AccountTxt: {
        fontSize: rf(10),
        color: '#fff',
        textAlign: 'center',
        marginBottom: 10
    }
});
