import React, { useState, useEffect,useContext} from 'react';
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    FlatList,
    Button,
    Alert,
    ScrollView
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFValue as rf } from "react-native-responsive-fontsize";
import Btn from '../components/Btn';
import * as firebase from 'firebase';
import {useNavigation, useRoute} from '@react-navigation/native';
import EmailField from '../components/EmailField';
import PasswordField from '../components/PasswordField';
import Header from '../components/Header'
import { registerCustomIconType } from 'react-native-elements';

const EditFooditem= () => {
    const [name, setname] = useState("");
    const [quantity, setquantity] = useState("");
    const [price, setprice] = useState("");
    const [calories, setcalories] = useState("");
    const [fats, setfats] = useState("");
    const [sodium, setsodium] = useState("");
    const [carbs, setcarbs] = useState("");
    const [protein, setprotein] = useState("");
    const [sugar, setsugar] = useState("");

    const [disable,setdisable]=useState(false);
    const [showname, setshowname] = useState("");
    const [showquantity, setshowquantity] = useState("");
    const [showprice, setshowprice] = useState("");
    const [showcalories, setshowcalories] = useState("");
    const [showfats, setshowfats] = useState("");
    const [showsodium, setshowsodium] = useState("");
    const [showcarbs, setshowcarbs] = useState("");
    const [showprotein, setshowprotein] = useState("");
    const [showsugar, setshowsugar] = useState("");
    const [error,seterror]=useState("");
    const navigation = useNavigation();
    const route = useRoute();
    const itemId = route.params.id;
    function errors(value){
        seterror(value);
        console.log(value)
        setdisable(false)
    }

    function getname(val) {
        setname(val)
    }
    function getprice(val) {
        setprice(val)
    }
    function getcalories(val) {
        setcalories(val)
    }
    function getfats(val) {
        setfats(val)
    }
    function getsodium(val) {
        setsodium(val)
    }
    function getcarbs(val) {
        setcarbs(val)
    }
    function getprotein(val) {
        setprotein(val)
    }
    function getsugar(val) {
        setsugar(val)
    }

  useEffect(()=>{
    firebase.database().ref('Fooditems').once('value').then(function(snapshot){
      if (snapshot.exists()) {
        var arr2=[];
        snapshot.forEach(element => {
            arr2.push(element.val())
        });
        // console.log(arr2);
        //setUser(arr2)
        setshowname(arr2[3])
        setquantity(arr2[5])
        setprice(arr2[4])
        setcalories(arr2[0])
        setfats(arr2[2])
        setsodium(arr2[7])
        setcarbs(arr2[1])
        setprotein(arr2[6])
        setsugar(arr2[8])
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
},[]);
  return (
    <View style={styles.container}>
      <StatusBar style='auto' />
        <ScrollView>
          <Header
        
            back={() => navigation.goBack('ManageFooditems')} />
        <Text style={styles.TextLable1}>Edit Food Items </Text>
                <View style={styles.error}>
                    <Text style={styles.error}>{error}</Text>
                </View>
                <View >
                    <EmailField
                      //  title='Name'
                        //Icon
                        email='Name'
                        onChange={setname} />
                    
                    <EmailField
                      //  title='Quantity'
                        //Icon
                        email='Quantity'
                        onChange={setquantity} />
                    <EmailField
                      //  title='Price'
                        email='Price'
                        onChange={setprice}
                    />
                    <EmailField
                       // title='Calories'
                        email='Calories'
                        onChange={setcalories} />
                    <EmailField
                      //  title='Fats'
                        email='Fats'
                        onChange={setfats}
                    />
                    <EmailField
                       // title='Sodium'
                        email='Sodium'
                        onChange={setsodium}
                    />
                    <EmailField
                       // title='Carbs'
                        email='Carbs'
                        onChange={setcarbs}
                    />
                    <EmailField
                       // title='Protein'
                        email='Protein'
                        onChange={setprotein}
                    />
                    <EmailField
                     //   title='Sugar'
                        email='Sugar'
                        onChange={setsugar}
                    />
                </View>
                
          <View style={styles.BtnWrapper}>
                    <Btn
                        title='Update'
                       color={disable?'#555555':'#000000'}
                        btntextcolor='#fff'
                        navigation={
                            () => {

                                    firebase.database().ref('Fooditems/'+itemId).set({
                                        itemname:name,
                                        itemprice:price,
                                        itemquantity:quantity,
                                        calories:calories,
                                        fats:fats,
                                        sodium:sodium,
                                        carbs:carbs,
                                        protein:protein,
                                        sugar:sugar
                                });
                               // update(mail,password)
                                //register(mail,password)
                                Alert.alert('Success', 'Update item successfully!', [{text: 'OK'}]);
                            }
                        } />
                </View>
        </ScrollView>
    </View>
  )
}

export default EditFooditem;

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
      backgroundColor: "#6ebe44",
  },
  EmailWrapper: {
    height: hp('45%'),
    justifyContent: 'space-evenly',
    marginBottom: 10,
},
  BtnWrapper: {
      height: hp('15%'),
      justifyContent: 'flex-end'
  },
  itemContainer1: {
      padding: 10,
      marginVertical: 8,
      marginHorizontal: 16,
      borderWidth: 1,
      borderColor: '#00000',
      borderRadius: 4
    },
  itemContainer: {
      padding: 10,
      marginVertical: 8,
      marginHorizontal: 16,
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 4
    },
  AccountTxt: {
      fontSize: rf(10),
      color: '#fff',
      textAlign: 'center',
      marginBottom: 10
  },
  TextLable1: {

    fontSize: rf(37),
    color: '#fcfefc',
    textAlign: 'center',
    fontWeight: 'bold'
},
});
