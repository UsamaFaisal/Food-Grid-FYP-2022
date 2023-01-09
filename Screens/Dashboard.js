import React, { useState,useContext } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    FlatList,
    StatusBar,
    Image,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFValue as rf } from "react-native-responsive-fontsize";
import { AntDesign } from '@expo/vector-icons';
import Header from '../components/Header';
import * as firebase from 'firebase';
import { Button, SearchBar } from 'react-native-elements';
import EmailField from '../components/EmailField';
import PasswordField from '../components/PasswordField';
import Btn from '../components/Btn';
import { AuthContext } from '../routes/Authenticationprovider';
export default function Dashboard({ navigation }) {
    const [disable,setdisable]=useState(false);
    const [mail,setmail]=useState("");
    const [searchText, setSearchText] = useState('');
  const [items, setItems] = useState([]);
    const [error,seterror]=useState("");
    
    


    const {logout}=useContext(AuthContext);
    function errors(value){
        seterror(value);
        console.log(value)
        setdisable(false)
    }
    const searchfun=()=>{
        firebase.database().ref('Fooditems')
        .orderByChild('itemname')
        .startAt(searchText)
        .endAt(searchText + '\uf8ff')
        .once('value')
        .then((snapshot) => {
          const items = snapshot.val();
          if(items===null)
          {
            return;
          }
          setItems(Object.values(items));
        })
        .catch((error) => {
          console.error(error);
        });
    };
       return (
         
         <View style={styles.container}>
            <StatusBar style='auto' />
                <View>
        <Text></Text>   
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TextInput 
            style={{ borderRadius: 10,alignSelf: 'center', backgroundColor:'white',width:'80%',height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={setSearchText}
            value={searchText}
        />
        <Button title="Search" onPress={searchfun} />
        </View> 
        
        <Text></Text>
        
        <FlatList
                    data = {items}
                    renderItem={({ item,index }) => (
                    <View style={styles.messageContainer}>
                    <Text style={styles.itemSubtitle}>Name:{item.itemname}</Text>
                    <Text style={styles.itemSubtitle}>Price:{item.itemprice}</Text>
                    <Text style={styles.itemSubtitle}>Quantity:{item.itemquantity}</Text>
                    </View>)}
                />
        </View>
             
            <ScrollView>
                <View style={styles.BtnWrapper}>
                    <Btn
                        //disabled={disable}
                        color={'#555555'}
                        title='Chat'
                        btntextcolor='#fff'
                        navigation={() => {
                            navigation.navigate('Message');
                            //setdisable(true);
                    }} 
                        />
                </View>
               <Text></Text>
                <View >
                    <Btn
                        title='Logout'
                        color='#fff'
                        btntextcolor='#000000'
                        navigation={
                            () => {
                                logout();
                                navigation.navigate('Login')
                            }
                        } />
                </View>
                </ScrollView>
            
        </View>
    );
}
const styles = StyleSheet.create({
    error:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        color:'#ff0000',
        fontSize:24
    },
    container: {
        flex: 1,
        backgroundColor: "#47b749",
    },
    itemSubtitle: {
        fontSize: 14,
        color:'white'
      },
    EmailWrapper: {
        height: hp('15%'),
        justifyContent: 'flex-end',
        marginBottom: 10
    },
    messageContainer: {
        //flexDirection: 'row',
        padding: 10,
        margin: 10,
        borderWidth: 1,
        color:'#000000',
        borderColor: '#ccc',
        borderRadius: 10,
        alignItems: 'flex-start',
      },
    PasswordWrapper: {
        height: hp('12%'),
        justifyContent: 'flex-end'
    },
    BtnWrapper: {
        height: hp('15%'),
        justifyContent: 'flex-end'
    },
    SignUBtnWrapper: {
        height: hp('30%'),
        justifyContent: 'flex-end'
    },
    AccountTxt: {
        fontSize: rf(10),
        color: '#fff',
        textAlign: 'center',
        marginBottom: 10
    }

});
