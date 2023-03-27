import React, { useState,useContext, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    TextInput,
    ScrollView
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFValue as rf } from "react-native-responsive-fontsize";
import { FontAwesome5 } from 'react-native-vector-icons';
import EmailField from '../components/EmailField';
import PasswordField from '../components/PasswordField';
import Btn from '../components/Btn';
import { AuthContext } from '../routes/Authenticationprovider';
import * as firebase from 'firebase'
import { createStackNavigator } from '@react-navigation/stack';
// import { TextInput } from 'react-native-paper';


const Stack = createStackNavigator();
export default function Signup({ navigation }) {
    const [disable,setdisable]=useState(false);
    const [name, setname] = useState("");
    const [phone, setphone] = useState("");
    const [mail, setmail] = useState("");
    const [password, setpassword] = useState("");
    const [disease, setdisease] = useState("");
    const [allergicitems, setallergicitems] = useState("");
    const [error, seterror] = useState("");
   const {register}= useContext(AuthContext);
   const [showPassword, setShowPassword] = useState(false);
    function errors(value) {
        seterror(value);
        setdisable(false)
    }
    
    function getname(val) {
        setname(val)
    }
    function getphone(val) {
        setphone(val)
    }
    function getemail(val) {
        setmail(val.toLowerCase().trim());
    }
    function getpassword(val) {
        setpassword(val)
    }
    function getdisease(val) {
        setdisease(val)
    }
    function getallergicitems(val) {
        setallergicitems(val)
    }
    async function getEmails(mail) {
        try {
          const snapshot = await firebase.database().ref('Users').once('value');
          const users = snapshot.val();
          //const emails = [];
            for (const user of Object.values(users)) 
            {
                    console.log(user.email)
                    console.log(mail)
                    if(user.email.toString() === mail.toString())
                    {
                        console.log('aya')
                        return true;
                    }
            }
            return false
          //console.log(emails);
        } catch (error) {
          console.log(error);
        }
        return false
      } 
         
    const handlevalidation=()=>{
        const validator = require('validator');
        if(name.length==0){
            seterror("Name Required")
            return false;
        }
        if(phone.length==0 || (phone.length<11 || phone.length>11)){
            seterror("PhoneNumber Not Valid")
            return false;
        }
        if (!validator.isEmail(mail) || mail.length==0)
        {
            seterror("Email Not valid")
            return false;
        }
        if (password.length<6)
        {
            seterror("Password's length should be minimum of 6 characters")
            return false;
        }
        else
        {
            return true;
        }
        
    };
    const handlename = () => {
        // Only allow alphabets and limit input to 15 characters
        const regex = /^[a-zA-Z]{0,15}$/;
        if (!regex.test(name)) {
          seterror('Please enter a valid name (letters only, max 15 characters)');
        } else {
          seterror('');
        }
      };
      const handlephone = () => {
        // Regex to check if phone number is valid
        const regex = /^[0-9]{11}$/;
        if (!regex.test(phone)) {
          seterror('Phone Number Not Valid');
        }
        else {
            seterror('');
          }
      };
      const handleEmail = () => {
        // Regular expression to check if input is a valid email address containing '@' symbol and ending with 'gmail.com'
        const emailRegex = /\S+@gmail\.com$/;
        if (!emailRegex.test(mail)) {
          seterror('Please enter a valid email address');
        } else {
          seterror('');
        }
      };
    const handlePassword = () => {
        // Regular expression to check if password meets certain criteria (contains at least one uppercase letter, one lowercase letter, one number, and one special character)
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        if (!passwordRegex.test(password)) {
          seterror('Please enter a valid password (at least 8 characters, containing at least one uppercase letter, one lowercase letter, one number, and one special character)');
        } else {
          seterror('');
        }
      };
    return (
        <View style={styles.container}>
            <Text style ={styles.TextLable}>
                <Text style={{ color: 'green' , fontSize: rf(25) ,textAlign: 'center',fontWeight: 'bold'}}>F O O D </Text>
                <Text style={{ color: 'black' , fontSize: rf(25) ,textAlign: 'center',fontWeight: 'bold'}}>G R I D </Text>     
            </Text>
            
        <ScrollView style={{marginBottom:10}}>
            
            <View >
                <Text style={styles.error}>{error}</Text>
            </View>
            <Text></Text>
            <View>
                    <TextInput
                        style={styles.input}
                        placeholder='Name'
                        placeholderTextColor='#000000'
                        value={name}
                        
                        onchangeEditing={handlename}
                        // onEndEditing={handlename}
                        onChangeText={setname}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Phone No'
                        placeholderTextColor='#000000'
                        value={phone}
                        maxLength={11}
                        keyboardType='numeric'
                        onchangeEditing={handlephone}
                        onChangeText={setphone}
                    />  
                    <TextInput
                        style={styles.input}
                        placeholder='Email'
                        placeholderTextColor='#000000'
                        value={mail}
                        autoCapitalize='none'
                        keyboardType='email-address'
                        onchangeEditing={handleEmail}
                        onChangeText={setmail}
                    />
                    <View style={styles.inputContainer}>  
                            <TextInput
                                style={styles.inputc}
                                placeholder='Password'
                                placeholderTextColor='#000000'
                                value={password}
                                secureTextEntry={!showPassword}
                                onBlur={handlePassword}
                                onChangeText={setpassword}
                            />
                            <TouchableOpacity
                                    onPress={() => setShowPassword(!showPassword)}
                                    style={styles.iconContainer}>
                                    <FontAwesome5 
                                        name={showPassword ? 'eye-slash' : 'eye'} 
                                        size={20} 
                                        color='gray' 
                                    />
                            </TouchableOpacity>
                    </View>             
                </View>
                <View>
                    <Btn
                        title='Sign Up'
                      //  disabled={disable}
                       color={disable?'#555555':'#000000'}
                        btntextcolor='white'
                        navigation={async() => {
                        if(handlevalidation())
                        {
                        if(await register(mail,password))
                            {
                                var userid = firebase.database().ref().push().key;
                                firebase.database().ref('Users/'+userid).set({
                                name:name,
                                phoneno:phone,
                                email:mail,
                                password:password,
                                disease:disease,
                                allergicitems:allergicitems})
                                
                                navigation.navigate('Login');  
                                seterror("");                     
                                 
                            }   
                            else
                            {
                                seterror('USER ALREADY THERE')
                            }     
                            }}
                        } />
                        
                </View>
                <View>
                    <Text style={styles.AccountTxt}>Already have an account?</Text>
                    <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
                            <Text style={styles.AccountTxt1}>    Login   </Text>
                        </TouchableOpacity>
                </View>
                </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    error: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ff0000',
        marginTop:15,
        marginLeft:15,
        fontSize: 15
    },
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    EmailWrapper: {
        height: hp('45%'),
        justifyContent: 'space-evenly',
        marginBottom: 50,
        marginTop:20

    },
    text:{
        fontSize: rf(37),
        color: '#fcfefc',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    BtnWrapper: {
        height: hp('10%'),
        justifyContent: 'flex-end',
        color: '#6ebe44',
        bottom:-20
    },
    SignUBtnWrapper: {
        height: hp('10%'),
        justifyContent: 'flex-end',
        color: 'white',
    },
    AccountTxt: {
        fontSize: rf(12),
        color: '#000000',
        textAlign: 'left',
        marginBottom: 10,
        bottom:-35,
        right:-65
    },
    AccountTxt1: {
        fontSize: rf(12),
        fontWeight:'bold',
        color: '#000000',
        textAlign: 'left',
        marginBottom: 10,
        bottom:-8,
        right:-200
    },
    TextLable: {
        fontSize: rf(20),
        color: '#fcfefc',
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop:100,
    },
    TextLable3: {
        fontSize: rf(25),
        color: '#fcfefc',
        textAlign: 'center',
        fontWeight: 'Agency',
        bottom:-20        
    },
    input: {
        height: 45,
        borderRadius: 7,
        borderWidth: 1,
        borderColor: '#000000',
        paddingHorizontal: 15,
        marginHorizontal: 15,
        marginBottom: 20,
      },
      inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 7,
        borderWidth:1,
        paddingHorizontal: 10,
        marginHorizontal: 15,
        marginBottom: 20,        
      },
      iconContainer: {
        padding: 10,
      },
      inputc: {
        flex: 1,
        fontSize: 16,
        color: 'black',
        paddingVertical: 10,
      },
});
