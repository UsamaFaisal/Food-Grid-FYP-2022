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
           
                <View style={styles.PicWrapper}>
                    <View style={styles.BodyPic}>
                        <Image source={require('../assets/l1img.png')}
                            style={{ height: '100%', width: '100%' }}
                            resizeMode='contain' />
                    </View>
                    <View style={styles.TextWrapper}>
                    <Text style ={styles.TextLable}>
        <Text style={{ color: 'white' , fontSize: rf(37) ,textAlign: 'center',fontWeight: 'bold'}}>F O O D </Text>
        <Text style={{ color: 'green' , fontSize: rf(37) ,textAlign: 'center',fontWeight: 'bold'}}>G R I D </Text>     
      </Text>    
                      
                    <Text style={styles.TextLable2}>F O O D  D E L I V E R  S E R V I C E S </Text> 
                   
            </View>
                </View>
                <Text style={styles.TextLable3}>Unlock your dinline </Text>   
                <Text style={styles.TextLable3}>Sign in now !</Text>   
                <TouchableOpacity onPress={()=>navigation.navigate('Onboarding')}
                style={styles.IconWrappr}>                
                    <AntDesign name="arrowright" marginleft="100" size={rf(15)} color="white" />
                </TouchableOpacity>                                
            
            </View>
           
        </View>
        
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#6ebe44",
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
        fontSize: rf(37),
        color: '#fcfefc',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    TextLable2: {
        fontSize: rf(15),
        color: '#fcfefc',
        textAlign: 'center',
        fontWeight: 'Agency'
    },
    TextLable3: {
        fontSize: rf(15),
        color: '#fcfefc',
        textAlign: 'justify',
        fontWeight: 'Agency',
        right: -45, 
        bottom:-100,
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
        alignSelf: 'center',
        right: -85, 
        marginRight:0, 
        bottom:-70,
    },



});