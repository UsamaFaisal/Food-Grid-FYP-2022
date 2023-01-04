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
import { apiLink, gettoken } from '../Staticdata';


export default function ReplyBox(props) {
    const [likebool, Setlikebool] = useState(props.likebool);
    const [unlikebool, Setunlikebool] = useState(props.unlikebool);
    const [likecount, Setlikecount] = useState(props.Likes);
    const [unlikecount, Setunlikecount] = useState(props.unlikes);
    const submitreact = async (reactname) => {
        var url = apiLink('/' + 'reply/' + reactname);

        var xhr = new XMLHttpRequest();
        xhr.open("POST", url);

        xhr.setRequestHeader("Authorization", "Bearer " + await gettoken());
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                console.log(xhr.status);
                console.log(xhr.responseText);
            }
        };
        var data = `{"reply_id":"${props.id}"}`;

        xhr.send(data);

    }
    return (
        <View style={styles.MenuWrapper}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <View style={styles.PicBody}>
                    <Image source={{ uri: props.Image }}
                        style={{ height: '100%', width: '100%' }}
                        resizeMode='cover' />
                </View>
                <View style={{ width: '75%' }}>
                    <Text style={styles.TextNAme}>{props.Name}</Text>
                </View>
                <Text style={{ color: '#939598', fontSize: rf(7) }}>{props.Time}</Text>

            </View>
            <View style={styles.TexWrapper}>
                <Text style={{ fontSize: rf(10), color: '#58585a' }}>{props.Body}</Text>
                <View style={{ flexDirection: "row", marginTop: 5 }}>
                    <TouchableOpacity onPress={() => {
                        submitreact('like'); Setlikecount(likebool ? likecount - 1 : likecount + 1);
                        Setlikebool(!likebool);
                        if (unlikebool) {
                            submitreact('unlike');
                            Setunlikecount(unlikebool ? unlikecount - 1 : unlikecount + 1);
                            Setunlikebool(!unlikebool)
                        }
                    }} style={styles.IconBody} onclick>
                        <AntDesign name="like2" size={rf(12)} color={likebool == true ? "#288BA8" : "#58585a"} />
                        <Text style={{ color: '#58585a', fontSize: rf(6), marginLeft: 5 }}>{likecount}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        submitreact('unlike'); Setunlikecount(unlikebool ? unlikecount - 1 : unlikecount + 1);
                        Setunlikebool(!unlikebool);
                        if (likebool) {
                            submitreact('like');
                            Setlikecount(likebool ? likecount - 1 : likecount + 1);
                            Setlikebool(!likebool);
                        }
                    }} style={styles.IconBody}>
                        <AntDesign name="dislike2" size={rf(12)} color={unlikebool == true ? "#288BA8" : "#58585a"} />
                        <Text style={{ color: '#58585a', fontSize: rf(6), marginLeft: 5 }}>{unlikecount}</Text>
                    </TouchableOpacity>

                </View>


            </View>


        </View>
    );
}
const styles = StyleSheet.create({
    MenuWrapper: {
        height: hp('13%'),
        width: wp('80%'),
        borderRadius: 20,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 9,
        alignSelf: 'center',
        marginVertical: 8,
        padding: 15,
        marginLeft: 20

    },
    PicBody: {
        height: 30,
        width: 30,
        borderRadius: 30,
        overflow: 'hidden',
        marginTop: 5
    },
    TextNAme: {
        fontSize: rf(15),
        color: '#000000',
        marginLeft: 10,
    },
    TexWrapper: {
        marginLeft: wp('10%'),

    },
    IconBody: {
        flexDirection: 'row',
        marginRight: 5,
        alignItems: 'center'
    },
    ReplayWrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    RepPic: {
        height: 20,
        width: 20,
        borderRadius: 20,
        overflow: 'hidden',
        marginTop: 5
    }


});
