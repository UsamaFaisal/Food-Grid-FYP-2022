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
import PagerView from 'react-native-pager-view'
export default function Onboarding({ navigation }) {
    return (
        <View style={styles.container}>
            <StatusBar style='auto' />
            <PagerView style={styles.viewPager} initialPage={0}>
                <View style={styles.page} key="1">
                 
                    <View style={styles.PicWrapper}>
                        <View style={styles.BodyPic}>
                             <Image source={require('../assets/food.jpg')}
                                style={{ height: '100%', width: '100%' }} />
                        </View>
                    </View>
                    <View style={styles.TextWrapper}>
                   
                    <Text style={styles.TextLable}>Order Food
                        </Text>
                        <Text style={styles.TextLable3}>These kind of delicious food can be </Text>   
                <Text style={styles.TextLable3}>Accessable on restaurant and also u can order </Text>
                <Text style={styles.TextLable3}>it online by using our app </Text>
                
               </View>
                    <View style={styles.DotWrapper}>
                        <View style={[styles.Dots,{backgroundColor:'#fff'} ]}></View>
                        <View style={styles.Dots}></View>
                        <View style={styles.Dots}></View>
                    </View>
               
                </View>



                <View style={styles.page} key="2">
                    
                    <View style={styles.PicWrapper}>
                        <View style={styles.BodyPic}>
                            <Image source={require('../assets/screen1.jpg')}
                                style={{ height: '100%', width: '100%' }} />
                        </View>
                    </View>
                    <View style={styles.TextWrapper}>
                    <Text style={styles.TextLable}>Choose Online
                    </Text>
                    <Text style={styles.TextLable3}>These kind of delicious food can be </Text>   
                <Text style={styles.TextLable3}>Accessable on restaurant and also u can order </Text>
                <Text style={styles.TextLable3}>it online by using our app </Text>
                    </View>
                    <View style={styles.DotWrapper}>
                        <View style={styles.Dots}></View>
                        <View style={[styles.Dots,{backgroundColor:'#fff'} ]}></View>
                        <View style={styles.Dots}></View>
                    </View>
                   
                </View>
                <View style={styles.page} key="3">
                  
                    <View style={styles.PicWrapper}>
                        <View style={styles.BodyPic}>
                            <Image source={require('../assets/OnlineShop.jpg')}
                                style={{ height: '100%', width: '100%' }} />
                        </View>
                    </View>
                    <View style={styles.TextWrapper}>

                   <Text style={styles.TextLable}>Free Dilvery
                  </Text>
                  <Text style={styles.TextLable3}>These kind of delicious food can be </Text>   
                <Text style={styles.TextLable3}>Accessable on restaurant and also u can order </Text>
                <Text style={styles.TextLable3}>it online by using our app </Text>
                    </View>
                    <View style={styles.DotWrapper}>
                        <View style={styles.Dots}></View>
                        <View style={styles.Dots}></View>
                        <View style={[styles.Dots,{backgroundColor:'#fff'} ]}></View>
                    </View>
                    <View style={styles.SkipWrapper}>
                        <TouchableOpacity onPress={()=>navigation.navigate('Signup')}>
                            <Text style={styles.SkipText}>   Signup   </Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </PagerView>

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
        fontSize: rf(30),
        color: '#fcfefc',
        textAlign: 'center',
        fontWeight: 'bold',
        bottom:80

    },
    TextLable3: {
        fontSize: rf(15),
        color: '#fcfefc',
        textAlign: 'center',
        fontWeight: 'Agency'
        
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
    DotWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    Dots: {
        height: 5,
        width: 5,
        borderRadius: 5,
        backgroundColor: '#58585a',
        margin: 4
    },
    SkipWrapper: {
        height: hp('5%'),
        width: wp('100%'),
        justifyContent: 'center',
        alignItems: 'center',

    },
    SkipText: {
        fontSize: rf(15),
        color: 'white',
        borderRadius: 4,
        backgroundColor:'green',
        bottom:-25,
        height:30,
        width:100,
        textAlign:"center"
    },
    SkipText1: {
        fontSize: rf(25),
        color: '#454545',
        bottom:-35,   
    },
    IconWrappr: {
        height: hp('6%'),
        width: hp('10%'),
        borderRadius: 5,
        borderWidth: 5,
        borderColor: '#FFFF00',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: '#FFFFE0 ',
        position: 'absolute', 
        right: -20, 
        marginRight:0, 
        bottom:-30,   
      },
});