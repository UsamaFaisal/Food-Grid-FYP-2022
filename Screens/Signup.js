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

export default function Signup({ navigation }) {
    const [disable,setdisable]=useState(false);
    const [mail, setmail] = useState("");
    const [password, setpassword] = useState("");
    const [name, setname] = useState("");
    const [error, seterror] = useState("");
     
   const {register}= useContext(AuthContext);

    function errors(value) {
        seterror(value);
        setdisable(false)
    }
    function getemail(val) {
        setmail(val.toLowerCase().trim());
    }
    function getpassword(val) {
        setpassword(val)
    }
    function getname(val) {
        setname(val)
    }

    return (
        <View style={styles.container}>
            <StatusBar style='auto' />
            <ScrollView>
                <Header
                    title='Sign Up'
                    back={() => navigation.goBack()} />
                

                <View style={styles.error}>
                    <Text style={styles.error}>{error}</Text>
                </View>
                <View style={styles.EmailWrapper}>
                    <EmailField
                        title='Name'
                        Icon
                        email='Enter Name'
                        onChange={setname} />
                    <EmailField
                        title='Email address'
                        email='Enter email'
                        onChange={setmail}
                    />
                    <PasswordField
                        title='Password'
                        onChange={setpassword} />
                </View>

                <View style={styles.BtnWrapper}>
                    <Btn
                        title='Sign Up'
                        disabled={disable}
                        color={disable?'#555555':'#000000'}
                        btntextcolor='#fff'
                        //onPress={()=> register(mail,password)}
                        navigation={
                            () => {

                                const validator = require('validator');
                                if(name.length<2){
                                    seterror("Please enter a valid name")
                                }
                                else if (!validator.isEmail(mail))
                                    seterror("Email is not valid")
                                else if (password.length<6)
                                seterror("Password's length should be minimum of 6 characters")
                                else{
                                    setdisable(true);
                                 
                                }
                                register(mail,password)
                                navigation.navigate('Login');
                            }
                        } />
                </View>
                <View style={styles.SignUBtnWrapper}>
                    <Text style={styles.AccountTxt}>Already have an account?</Text>
                    <Btn
                        title='Log In'
                        color='#fff'
                        btntextcolor='#000000'
                        
                        navigation={() => navigation.navigate('Login')} />
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
