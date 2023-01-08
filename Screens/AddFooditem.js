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

export default function AddFooditem({ navigation }) {
    const [disable,setdisable]=useState(false);
    
    const [name, setname] = useState("");
    const [quantity, setquantity] = useState("");
    const [price, setprice] = useState("");
    const [calories, setcalories] = useState("");
    const [fats, setfats] = useState("");
    const [sodium, setsodium] = useState("");
    const [carbs, setcarbs] = useState("");
    const [protein, setprotein] = useState("");
    const [sugar, setsugar] = useState("");
    
    const [error, seterror] = useState("");
   const {register}= useContext(AuthContext);

    function errors(value) {
        seterror(value);
        setdisable(false)
    }
    
    function getname(val) {
        setname(val)
    }
    function getprice(val) {
        setprice(val)
    }
    function getcalories(val) {
        setcalories(val)
    }
    function getfats(val) {
        setfats(val)
    }
    function getsodium(val) {
        setsodium(val)
    }
    function getcarbs(val) {
        setcarbs(val)
    }
    function getprotein(val) {
        setprotein(val)
    }
    function getsugar(val) {
        setsugar(val)
    }
    const handlevalidation=()=>{
        const validator = require('validator');
        if (name.length==0)
        {
            seterror("name Not valid")
            return false;
        }
        else
        {
            return true;
        }   
    };
    const registerfooditem=()=>{
        var userid = firebase.database().ref().push().key;
        firebase.database().ref('Fooditems/'+userid).set({
        itemname:name,
        itemprice:price,
        itemquantity:quantity,
        calories:calories,
        fats:fats,
        sodium:sodium,
        carbs:carbs,
        protein:protein,
        sugar:sugar,
    })
    };
    const func=()=>{
    if(handlevalidation())
    {
        registerfooditem()
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
                    title='Add Fooditems'
                    back={() => navigation.goBack('ManageFooditems')} />
                <View style={styles.error}>
                    <Text style={styles.error}>{error}</Text>
                </View>
                <View style={styles.EmailWrapper}>
                    <EmailField
                        title='Name'
                        //Icon
                        email='Enter Name'
                        onChange={setname} />
                    <EmailField
                        title='Quantity'
                        //Icon
                        email='Enter Quantity'
                        onChange={setquantity} />
                    <EmailField
                        title='Price'
                        email='Enter Price'
                        onChange={setprice}
                    />
                    <EmailField
                        title='Calories'
                        email='Enter Calories'
                        onChange={setcalories} />
                    <EmailField
                        title='Fats'
                        email='Enter Fats'
                        onChange={setfats}
                    />
                    <EmailField
                        title='Sodium'
                        email='Enter Sodium'
                        onChange={setsodium}
                    />
                    <EmailField
                        title='Carbs'
                        email='Enter Carbs'
                        onChange={setcarbs}
                    />
                    <EmailField
                        title='Protein'
                        email='Enter Protein'
                        onChange={setprotein}
                    />
                    <EmailField
                        title='Sugar'
                        email='Enter Sugar'
                        onChange={setsugar}
                    />
                </View>

                <View style={styles.BtnWrapper}>
                    <Btn
                        title='Add Fooditem'
                      //  disabled={disable}
                       color={disable?'#555555':'#000000'}
                        btntextcolor='#fff'
                        navigation={
                            () => {       
                            if(func())
                            {
                                Alert.alert('Added item Successfully!');
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
