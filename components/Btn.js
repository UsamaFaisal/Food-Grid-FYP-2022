import React, { useState, } from 'react';
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    Image,
    TouchableOpacity,
    TextInput
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFValue as rf } from "react-native-responsive-fontsize";
export default function Btn(props) {
    return (

        <TouchableOpacity
            disabled={props.disabled}
            onPress={props.navigation}
            style={[styles.Contain, { backgroundColor: props.color }]}>
            <Text style={[styles.BtnText, { color: props.btntextcolor }]}>{props.title}</Text>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    Contain: {
        width: wp('90%'),
        height: hp('7%'),
        borderRadius: 5,
        backgroundColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: '#000000'

    },
    BtnText: {
        fontSize: rf(12),
        color: '#fff',
        fontWeight: "bold"
    }

});
