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


export default function Admindashboard({ navigation }) {
    const [disable,setdisable]=useState(false);
    const [mail,setmail]=useState("");
    const [password,setpassword]=useState("");
    const [error,seterror]=useState("");
    const {logout}=useContext(AuthContext);
    function errors(value){
        seterror(value);
        console.log(value)
        setdisable(false)
    }
    function getemail(val) {
        setmail(val.toLowerCase().trim())
        console.log(mail)
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
                    //title='Dashboard'
                    back={() => navigation.goBack('Login')}
                     />
                 <Text style={{ color: 'white' , fontSize: rf(25) ,textAlign: 'center',fontWeight: 'bold'}}>DASHBOARD</Text>
                <View style={styles.error}><Text style={styles.error}>{error}</Text></View>
                <View style={styles.BtnWrapper}>
                    <Btn
                        //disabled={disable}
                        color={disable?'#555555':'green'}
                        title='Manage Users'
                        btntextcolor='#fff'
                        navigation={() => {
                            navigation.navigate('ManageUsers');
                            //setdisable(true);
                    }} 
                        />
                </View>
                <View style={styles.BtnWrapper}>
                    <Btn
                       // disabled={disable}
                        color={disable?'#555555':'green'}
                        title='Manage Food Items'
                        btntextcolor='#fff'
                        navigation={() => {
                            navigation.navigate('ManageFooditems');
                            //setdisable(true);
                    }} 
                        />
                </View>
                <View style={styles.BtnWrapper}>
                    <Btn
                        //disabled={disable}
                        color={disable?'#555555':'green'}
                        title='Chat'
                        btntextcolor='#fff'
                        navigation={() => {
                            //setdisable(true);
                            navigation.navigate('AdminMessage');
                    }} 
                        />
                </View>
                <View style={styles.SignUBtnWrapper}>
                    <Btn
                        title='Logout'
                        color='#000000'
                        btntextcolor='#fff'
                        navigation={
                            () => {
                                logout();
                                navigation.navigate('Login')
                            }
                        } />
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
        height: hp('10%'),
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
