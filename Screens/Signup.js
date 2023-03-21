import React, { useState,useContext } from 'react';
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    Image,
    TouchableOpacity,
    ScrollView
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


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();
export default function Signup({ navigation }) {
    const [disable,setdisable]=useState(false);
    const [name, setname] = useState("");
    const [phone, setphone] = useState("");
    const [mail, setmail] = useState("");
    const [password, setpassword] = useState("");
    const [disease, setdisease] = useState("");
    const [allergicitems, setallergicitems] = useState("");
    
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
        if(name.length==0){
            seterror("Name Required")
            return false;
        }
        if(phone.length==0 || (phone.length<11 || phone.length>11)){
            seterror("PhoneNumber Not Valid")
            return false;
        }
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
    return (
        <View style={styles.container}>
            <StatusBar style='auto' />
                <Header
                    //title='Sign Up'
                    back={() => navigation.goBack()} />

        <Text style ={styles.TextLable}>
            <Text style={{ color: 'white' , fontSize: rf(25) ,textAlign: 'center',fontWeight: 'bold'}}>F O O D </Text>
            <Text style={{ color: 'green' , fontSize: rf(25) ,textAlign: 'center',fontWeight: 'bold'}}>G R I D </Text>     
        </Text>
      {/* <Text style={styles.TextLable3}>Sign Up </Text> */}
                <ScrollView>
                <View style={styles.error}>
                    <Text style={styles.error}>{error}</Text>
                </View>
                <View style={styles.EmailWrapper}>
                    <EmailField
                        //Icon
                        email='Name'
                        onChange={setname} />
                        
                    <EmailField
                      //  title='Phone'
                        //Icon
                        email='Phone No'
                        onChange={setphone} />
                    <EmailField
                        //title='Email address'
                        email='Email'
                        onChange={setmail}
                    />
                    <PasswordField
                      //  title='Password'
                
                        onChange={setpassword} />
                    <EmailField
                        //title='Disease'
                        email='Disease'
                        onChange={setdisease}
                    />
                    <EmailField
                      //  title='Allergic Items'
                        email='Allergic Items'
                        onChange={setallergicitems}
                    />
                </View>
                <View>
                    <Btn
                        title='Sign Up'
                      //  disabled={disable}
                       color={disable?'#555555':'#000000'}
                        btntextcolor='white'
                        navigation={async() => {
                        if(handlevalidation())
                        {
                        if(await register(mail,password))
                            {
                                var userid = firebase.database().ref().push().key;
                                firebase.database().ref('Users/'+userid).set({
                                name:name,
                                phoneno:phone,
                                email:mail,
                                password:password,
                                disease:disease,
                                allergicitems:allergicitems})
                                
                                navigation.navigate('Login');  
                                seterror("");                     
                                 
                            }   
                            else
                            {
                                seterror('USER ALREADY THERE')
                            }     
                            }}
                        } />
                        
                </View>
                <View>
                    <Text style={styles.AccountTxt}>Already have an account?</Text>
                    <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
                            <Text style={styles.AccountTxt1}>    Login   </Text>
                        </TouchableOpacity>
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
        backgroundColor: "#6ebe44",
    },
    EmailWrapper: {
        height: hp('45%'),
        justifyContent: 'space-evenly',
        marginBottom: 50,
        marginTop:20

    },
    text:{
        fontSize: rf(37),
        color: '#fcfefc',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    BtnWrapper: {
        height: hp('10%'),
        justifyContent: 'flex-end',
        color: '#6ebe44',
        bottom:-20
    },
    SignUBtnWrapper: {
        height: hp('10%'),
        justifyContent: 'flex-end',
        color: 'white',
    },
    AccountTxt: {
        fontSize: rf(12),
        color: '#fff',
        textAlign: 'left',
        marginBottom: 10,
        bottom:-35,
        right:-65
    },
    AccountTxt1: {
        fontSize: rf(12),
        fontWeight:'bold',
        color: '#fff',
        textAlign: 'left',
        marginBottom: 10,
        bottom:-8,
        right:-200
    },
    TextLable: {
        fontSize: rf(20),
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


});
