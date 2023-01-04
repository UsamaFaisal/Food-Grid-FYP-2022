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
export default function Welcome({ navigation }) {
    return (
        <View style={styles.container}>
            <StatusBar style='auto' />
            <View style={styles.page}>
                <View style={styles.TextWrapper}>
                    <Text style={styles.TextLable}>Welcome!</Text>
                </View>
                <View style={styles.PicWrapper}>
                    <View style={styles.BodyPic}>
                        <Image source={require('../assets/foodpic.png')}
                            style={{ height: '100%', width: '100%' }}
                            resizeMode='contain' />
                    </View>
                </View>
                <TouchableOpacity onPress={()=>navigation.navigate('Onboarding')}
                style={styles.IconWrappr}>
                    <AntDesign name="arrowright" size={rf(15)} color="#050505" />
                </TouchableOpacity>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    viewPager: {
        flex: 1
    },
    TextWrapper: {
        alignItems: 'center',
        width: wp('100%'),
        height: hp('15%'),
        justifyContent: 'flex-end'
    },
    TextLable: {
        fontSize: rf(14),
        color: '#050505',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    PicWrapper: {
        height: hp('65%'),
        width: wp("100%"),
        alignItems: 'center',
        justifyContent: 'center'
    },
    BodyPic: {
        height: hp('40%'),
        width: wp('80%'),
        borderRadius: 10,
        overflow: 'hidden'
    },
    IconWrappr: {
        height: hp('4%'),
        width: hp('4%'),
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#050505',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },



});
