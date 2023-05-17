import React,{useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
export default function Header (){
    const onPressCart = () => {
      navigation.navigate('Login');
    }
    const navigation = useNavigation(); // import useNavigation hook from react-navigation

    const [menuOpen, setMenuOpen] = useState(false); // initialize menuOpen state
    
    const handleMenu = () => {
      setMenuOpen(!menuOpen); // toggle menuOpen state
    };
    return (
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Tabviewallscreen')}>
          <Image source={require('../assets/arrow.png')} style={styles.cartIcon}/>
        </TouchableOpacity>
            <Image source={require('../assets/foodpic.png')} style={styles.logoIcon} />
        <TouchableOpacity onPress={() => navigation.navigate('ManageCart')}>
          <Image source={require('../assets/cart_icon.png')} style={styles.cartIcon} />
        </TouchableOpacity>
        
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    header: {
        height: 50,
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
      },  
      logoIcon: {
        width: 70,
        height: 50,
      },
      cartIcon: {
        width: 30,
        height: 30,
        marginLeft: 10,
      },
});