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
import { AntDesign } from '@expo/vector-icons';
export default function ReplyField(props) {
    return (
        <View style={styles.container}>
            {/* <Text>{props.holder}</Text> */}
            <TextInput
                // placeholder={props.holder}
                placeholderTextColor='#818285'
                style={styles.HolderStyle} 
                value={props.value}
                onChangeText={props.onChangeText}
                onSubmitEditing={props.submit}
                placeholder={props.placeholder}
                />
            {/* {props?.Icon ? <TouchableOpacity>
                <AntDesign name="down" size={rf(15)} color="#939598" />
            </TouchableOpacity> : null} */}


        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        height: hp('5%'),
        width: wp('70%'),
        borderRadius: 5,
        backgroundColor: "#fff",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        alignSelf: 'baseline',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
        marginVertical:10
    },
    HolderStyle: {
        height: '100%',
        width: '80%',
        fontSize: rf(10),
        color: '#818285'
    }

});
