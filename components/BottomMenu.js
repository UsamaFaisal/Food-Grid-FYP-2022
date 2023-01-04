import React, { useState, } from 'react';
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    Image,
    TouchableOpacity,
    ScrollView,
    TextInput,
    ImageBackground
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFValue as rf } from "react-native-responsive-fontsize";
import { AntDesign, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';


export default function BottomMenu(props) {
    return (
        <View style={styles.MenuWrapper}>
            <TouchableOpacity>
                <AntDesign name="home" size={rf(18)} color="#bdbec0" />
            </TouchableOpacity>
            <TouchableOpacity>
                <AntDesign name="search1" size={rf(18)} color="#bdbec0" />
            </TouchableOpacity>
            {
                props.disable ?<></>:
                    <TouchableOpacity onPress={props.navigation}>
                        <AntDesign name="pluscircle" size={rf(28)} color="#46b749" />
                    </TouchableOpacity>

            }
            <TouchableOpacity onPress={props.comments}>
                <MaterialCommunityIcons name="message-processing-outline" size={rf(18)} color="#bdbec0" />
            </TouchableOpacity>
            <TouchableOpacity onPress={props.profile}>
                <FontAwesome name="user-o" size={rf(18)} color="#bdbec0" />
            </TouchableOpacity>

        </View>
    );
}
const styles = StyleSheet.create({
    MenuWrapper: {
        height: hp('9%'),
        width: wp('100%'),
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        position: 'absolute',
        bottom: 0,
        paddingHorizontal: wp('5%'),
        justifyContent: 'space-between'
    }


});
