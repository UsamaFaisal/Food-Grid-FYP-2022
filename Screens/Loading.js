import React, { useState, } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
import { ActivityIndicator } from 'react-native';
import { StackActions } from '@react-navigation/native';
export default function Loading({ navigation }) {
    const componentDidMount = function () {
        AsyncStorage.getItem('first_time').then((value) => {
            console.log(value)
        });
    }
    componentDidMount();
    return (
        <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#47b749",
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
        color: '#fff',
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
        borderColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },
});
