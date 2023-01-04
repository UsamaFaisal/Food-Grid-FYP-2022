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
                    <View style={styles.TextWrapper}>
                        <Text style={styles.TextLable}>Encourage interracial
                            communication and{'\n'}collaboration</Text>
                    </View>
                    <View style={styles.PicWrapper}>
                        <View style={styles.BodyPic}>
                            <Image source={require('../assets/icon.png')}
                                style={{ height: '100%', width: '100%' }} />
                        </View>
                    </View>
                    <View style={styles.DotWrapper}>
                        <View style={[styles.Dots,{backgroundColor:'#fff'} ]}></View>
                        <View style={styles.Dots}></View>
                        <View style={styles.Dots}></View>
                    </View>
                    <View style={styles.SkipWrapper}>
                        
                    </View>
                </View>
                <View style={styles.page} key="2">
                    <View style={styles.TextWrapper}>
                        <Text style={styles.TextLable}>Provide healing
                        , emotional calidation, and{'\n'}resources to those who are impacted by{'\n'} 
                        substantiated bias behaivior</Text>
                    </View>
                    <View style={styles.PicWrapper}>
                        <View style={styles.BodyPic}>
                            <Image source={require('../assets/icon.png')}
                                style={{ height: '100%', width: '100%' }} />
                        </View>
                    </View>
                    <View style={styles.DotWrapper}>
                        <View style={styles.Dots}></View>
                        <View style={[styles.Dots,{backgroundColor:'#fff'} ]}></View>
                        <View style={styles.Dots}></View>
                    </View>
                    <View style={styles.SkipWrapper}>
                        
                    </View>
                </View>
                <View style={styles.page} key="3">
                    <View style={styles.TextWrapper}>
                        <Text style={styles.TextLable}>lorem ipsum dolar sit amet,
                        consectetuer{'\n'}adipiscing elit, sod diam nomummy{'\n'}nibh euismod tincuin
                        </Text>
                    </View>
                    <View style={styles.PicWrapper}>
                        <View style={styles.BodyPic}>
                            <Image source={require('../assets/icon.png')}
                                style={{ height: '100%', width: '100%' }} />
                        </View>
                    </View>
                    <View style={styles.DotWrapper}>
                        <View style={styles.Dots}></View>
                        <View style={styles.Dots}></View>
                        <View style={[styles.Dots,{backgroundColor:'#fff'} ]}></View>
                    </View>
                    <View style={styles.SkipWrapper}>
                        <TouchableOpacity onPress={()=>navigation.navigate('Signup')}>
                            <Text style={styles.SkipText}>Signup</Text>
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
        fontSize: rf(12),
        color: '#fff',
        textAlign: 'center'
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
        color: '#fff'
    }

});
