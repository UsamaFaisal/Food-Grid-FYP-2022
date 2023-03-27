import React, { useState,useContext } from 'react';
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    Image,
    TextInput,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import { FontAwesome5 } from 'react-native-vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFValue as rf } from "react-native-responsive-fontsize";
import Btn from '../components/Btn';
import { AuthContext } from '../routes/Authenticationprovider';
export default function Login({ navigation }) {
    const [disable,setdisable]=useState(false);
    const [mail,setmail]=useState("");
    const [password,setpassword]=useState("");
    const [error,seterror]=useState("");
    const {login}= useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    function errors(value){
        seterror(value);
        console.log(value)
        setdisable(false)
    }
    function getemail(val) {
        setmail(val.toLowerCase().trim())
        //console.log(mail)
    }
    function getpassword(val) {
        setpassword(val)
    }
    const handleEmail = () => {
        // Regular expression to check if input is a valid email address containing '@' symbol and ending with 'gmail.com'
        const emailRegex = /\S+@gmail\.com$/;
        if (!emailRegex.test(mail)) {
          seterror('Please enter a valid email address');
        } else {
          seterror('');
        }
      };
   // logoutuser(navigation, false);
    return (
        <View style={styles.container}>
            <StatusBar style='auto' />
            <ScrollView style={styles.brder}>
            <Text style ={styles.TextLable}>
                <Text style={styles.f} >F O O D </Text>
                <Text style={styles.g}>G R I D </Text>     
            </Text>
                <Text style={styles.TextLable3}>Sign In </Text>
                <Text></Text>
                <View style={styles.error}>
                    <Text style={styles.error}>{error}</Text>
                </View>
                <TextInput
                        style={styles.input}
                        placeholder='Email'
                        placeholderTextColor='#000000'
                        value={mail}
                        autoCapitalize='none'
                        keyboardType='email-address'
                        onchangeEditing={handleEmail}
                        onChangeText={getemail}
                    />
                    <View style={styles.inputContainer}>  
                            <TextInput
                                style={styles.inputc}
                                placeholder='Password'
                                placeholderTextColor='#000000'
                                value={password}
                                secureTextEntry={!showPassword}
                                //onBlur={handlePassword}
                                onChangeText={getpassword}
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
                <View >
                    <Btn
                        //disabled={disable}
                        color={disable?'#555555':'#000000'}
                        title='Log In'
                        btntextcolor='#fff'
                        navigation={async() => {setdisable(true);
                        
                            if(await login(mail,password) && mail=='admin1@gmail.com' && password=='adminadmin')
                            {
                                console.log('Admin logged in');
                                 navigation.navigate('Admindashboard') 
                            }
                            else if(await login(mail,password))
                            {
                                console.log('User Logged in');
                                // navigation.navigate('Dashboard', { mail: mail });
                                navigation.navigate('Dashboard') 

                            }
                            else
                            {
                                seterror("INVALID DETAILS");
                                console.log('Invalid Details'); 
                            }
                        
                    }} 
                        />
                </View>
                <View style={styles.SignUBtnWrapper}>
                    <Text style={styles.AccountTxt}>Dont't have an account ?</Text>
                    <TouchableOpacity >
                        <Text style={styles.AccountTxt1} onPress={()=>navigation.navigate('Signup')}>     Sign Up    </Text>
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
        fontSize: 15,
        marginBottom:15
    },
    // brder:{
    //     borderWidth:1,
    //     borderRadius:8,
    //     margin:10,
    //     // marginTop:40
        
    // },
    f:{
        color: 'green' ,
        fontSize: rf(25) ,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    g:{
        color: 'black' ,
        fontSize: rf(25) ,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    EmailWrapper: {
        height: hp('15%'),
        justifyContent: 'flex-end',
        marginBottom: 10
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
        color: '#000000',
        textAlign: 'center',
        marginBottom: 10
    },


    TextLable: {
        fontSize: rf(25),
        color: '#fcfefc',
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop:120
    },
    TextLable3: {
        fontSize: rf(25),
        color: '#000000',
        textAlign: 'center',
        fontWeight: 'Agency',
        bottom:-60        
    },
    SignUBtnWrapper: {
        height: hp('18%'),
        justifyContent: 'flex-end',
        color: 'white',
        
    },
    AccountTxt: {
        fontSize: rf(12),
        color: '#000000',
        textAlign: 'left',
        marginBottom: 10,
        bottom:19,
        right:-65
    },
    AccountTxt1: {
        fontSize: rf(12),
        fontWeight:'bold',
        color: '#000000',
        textAlign: 'left',
        marginBottom: 10,
        bottom:46,
        right:-190
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
        marginBottom: 35,        
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
