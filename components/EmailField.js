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
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

export default function EmailField(props) {
    return (
        <View style={styles.container}>
            <Text style={styles.EmailText}>{props.title}</Text>
            <View style={styles.EmailBody}>
                <TextInput
                    placeholder={props.email}
                    placeholderTextColor='white'
                    style={styles.InputText} 
                    onChangeText={props.onChange}/>
                {props?.Icon?<View style={styles.IconBody}>
                    <MaterialIcons name="done" size={rf(15)} color="#000000" />
                </View>: null}
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        width: wp("100%"),
        paddingHorizontal: wp('5%')
    },
    EmailText: {
        fontSize: rf(10),
        color: '#fff',
        marginVertical:10
    },
    EmailBody: {
        height: hp('6%'),
        width: wp('90%'),
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#6ebe44',
        paddingHorizontal: 10,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 5
    },
    InputText: {
        height: '100%',
        width: '90%',
        fontSize: rf(10),

    },
    IconBody: {
        height: 20,
        width: 20,
        borderRadius: 10,
        backgroundColor: '#d1d2d4',
        justifyContent: 'center',
        alignItems: 'center'
    }

});
