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
import { AntDesign } from '@expo/vector-icons';
import Header from '../components/Header'
import EmailField from '../components/EmailField';
import PasswordField from '../components/PasswordField';
import Btn from '../components/Btn';
import { AuthContext } from '../routes/Authenticationprovider';
import * as firebase from 'firebase';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';




export default function Login({ navigation }) {
    const [disable,setdisable]=useState(false);
    const [mail,setmail]=useState("");
    const [password,setpassword]=useState("");
    const [error,seterror]=useState("");
    const {login}= useContext(AuthContext);
    function errors(value){
        seterror(value);
        console.log(value)
        setdisable(false)
    }
    function getemail(val) {
        setmail(val.toLowerCase().trim())
        //console.log(mail)
    }
    function getpassword(val) {
        setpassword(val)
    }
   // logoutuser(navigation, false);
    return (
        <View style={styles.container}>
            <StatusBar style='auto' />
            <ScrollView>
                <Header
                  //  title='Log In'
                     
               back={() => navigation.goBack()} />
          
            <Text style ={styles.TextLable}>
                <Text style={{ color: 'white' , fontSize: rf(25) ,textAlign: 'center',fontWeight: 'bold'}}>F O O D </Text>
                <Text style={{ color: 'green' , fontSize: rf(25) ,textAlign: 'center',fontWeight: 'bold'}}>G R I D </Text>     
            </Text>
                <Text style={styles.TextLable3}>Sign In </Text>
                <Text></Text>
                <View style={styles.error}>
                    <Text style={styles.error}>{error}</Text>
                </View>
                <View style={styles.EmailWrapper}>
                    <EmailField
                       // title='Email'
                       // Icon
                        email='Email'
                        onChange={getemail}
                    />
                </View>
                <View style={styles.PasswordWrapper}>
                    <PasswordField
                      //  title='Password'
                        onChange={getpassword} />
                </View>
                <View style={styles.BtnWrapper}>
                    <Btn
                        //disabled={disable}
                        color={disable?'#555555':'#000000'}
                        title='Log In'
                        btntextcolor='#fff'
                        navigation={async() => {setdisable(true);
                        
                            if(await login(mail,password) && mail=='admin1@gmail.com' && password=='adminadmin')
                            {
                                console.log('Admin logged in');
                                 navigation.navigate('Admindashboard') 
                            }
                            else if(await login(mail,password))
                            {
                                console.log('User Logged in');
                                navigation.navigate('Dashboard') 

                            }
                            else
                            {
                                seterror("INVALID DETAILS");
                                console.log('Invalid Details'); 
                            }
                        /*else
                        {
                            login(mail,password)
                            console.log('User logged in ');
                            navigation.navigate('Welcome')
                        }*/
                        
                    }} 
                        />
                </View>
                <View style={styles.SignUBtnWrapper}>
                    <Text style={styles.AccountTxt}>Dont't have an account ?</Text>
                        <TouchableOpacity onPress={()=>navigation.navigate('Signup')}>
                        <Text style={styles.AccountTxt1}>     Sign Up    </Text>
                    </TouchableOpacity>    
                        
                    
                </View>
            </ScrollView>
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
        backgroundColor: "#6ebe44",
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


    TextLable: {
        fontSize: rf(25),
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
    SignUBtnWrapper: {
        height: hp('18%'),
        justifyContent: 'flex-end',
        color: 'white',
        
    },
    AccountTxt: {
        fontSize: rf(12),
        color: '#fff',
        textAlign: 'left',
        marginBottom: 10,
        bottom:19,
        right:-65
    },
    AccountTxt1: {
        fontSize: rf(12),
        fontWeight:'bold',
        color: '#fff',
        textAlign: 'left',
        marginBottom: 10,
        bottom:46,
        right:-190
    },

});
