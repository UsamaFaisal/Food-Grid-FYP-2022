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

export default function PasswordField(props) {
    return (
    <View style={styles.Contain}>
        <Text style={styles.PasswordText}>{props.title}</Text>
            <View style={styles.container}>
                <TextInput
                placeholder='Enter Password'
                secureTextEntry={true}
                placeholderTextColor='#000000'
                style={styles.InputText}
                onChangeText={props.onChange}/>
           
           </View>
    </View>
    );
}
const styles = StyleSheet.create({
    Contain:{
        width:wp('100%'),
        paddingHorizontal:wp('5%'),
    },
    container: {
        width: wp("90%"),
        paddingHorizontal: wp('5%'),
        height:hp('7%'),
        backgroundColor:'#fff',
        alignSelf:'center',
        borderRadius:5,
        borderWidth:1,
        borderColor:'#000000',
        overflow:'hidden'

    },
    PasswordText:{
        fontSize:rf(10),
        color:'#fff',
       marginVertical:10
    },
    InputText:{
        height:'100%',
        width:'100%',
        fontSize:rf(10),
        color:'#000000'
    }
    





});
