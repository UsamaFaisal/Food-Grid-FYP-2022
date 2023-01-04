import React, { useState, } from 'react';
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    Image,
    TouchableOpacity
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFValue as rf } from "react-native-responsive-fontsize";
import { AntDesign } from '@expo/vector-icons';
import Header from '../components/Header'
import Btn from '../components/Btn';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Membership({ navigation }) {
    const [active, SetActive] = useState(-1)
    var setmembership=(value)=>{
        SetActive(value);
    }
    return (
        <View style={styles.container}>
            <StatusBar style='auto' />
            <Header
                back={() => navigation.goBack()} />
            <Text style={styles.MembershipText}>Choose Membership Type</Text>
            <View style={styles.Wrapper}>
                
            </View>
            <View>
                <Btn
                    title='Next'
                    color='#000000'
                    btntextcolor='#fff'
                    navigation={() => {
                        console.log(active); 
                        if (active != -1) {
                            AsyncStorage.setItem('membership',active.toString()).then(()=>{
                                
                                navigation.reset({
                                    index: 0,
                                    routes: [{ name: 'Home' }],
                                }
                                );
                            });
                        }
                    }}
                />
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#47b749",
    },
    MembershipText: {
        fontSize: rf(12),
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    Wrapper: {
        height: hp('60%'),
        justifyContent: 'center',

    }





});