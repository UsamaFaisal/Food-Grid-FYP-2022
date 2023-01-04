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

export default function ProfileHeader(props) {
    return (
        <View style={styles.container}>
            <View style={{ marginTop: hp('5%'), flexDirection: 'row' }}>
                <TouchableOpacity
                    onPress={props.back}>
                    <AntDesign name="arrowleft" size={rf(15)} color="#fff" />
                </TouchableOpacity>
                <View style={{ flex: 0.95, alignItems: 'center' }}>
                    <Text style={styles.CompleteText}>Complete your profile</Text>
                </View>
            </View>


        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        height: hp('22%'),
        width: wp('100%'),
        backgroundColor: "#47b749",
        paddingHorizontal: wp('5%'),
    },
    CompleteText: {
        fontSize: rf(12),
        color: '#fff',
        fontWeight:'bold'
    }






});
