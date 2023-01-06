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
import EmailField from '../components/EmailField';
import Btn from '../components/Btn';
import * as firebase from 'firebase';




export default function AdminMessage({ navigation }) {
    const [disable,setdisable]=useState(false);
    const [msg,setmsg]=useState("");
    const [error,seterror]=useState("");
    
    function errors(value){
        seterror(value);
        console.log(value)
        setdisable(false)
    }
    function getmsg(val) {
        setmsg(val.toLowerCase().trim())
        //console.log(mail)
    }
    return (
        <View style={styles.container}>
            <StatusBar style='auto' />
            <ScrollView>         
                <View style={styles.error}><Text style={styles.error}>{error}</Text></View>
                <View style={styles.EmailWrapper}>
                    <EmailField
                        title='Message'
                        Icon
                        email='Enter Message'
                        onChange={getmsg}
                    />
                </View>
                <View style={styles.BtnWrapper}>
                    <Btn
                        //disabled={disable}
                        color={disable?'#555555':'#000000'}
                        title='Send'
                        btntextcolor='#fff'
                        navigation={() => {
                            //setdisable(true);
                            
                        
                    }} 
                        />
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
        backgroundColor: "#47b749",
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
    }

});
