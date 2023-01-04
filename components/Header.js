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
export default function Login(props) {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={props.back}>
                <AntDesign name="arrowleft" size={rf(15)} color="#fff" />
            </TouchableOpacity>
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Text style={{
                    fontSize: rf(13),
                    color: '#fff', fontWeight: 'bold'
                }}>{props.title}</Text>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        height: hp('10%'),
        width: wp("100%"),
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: wp('5%'),
    },
});
