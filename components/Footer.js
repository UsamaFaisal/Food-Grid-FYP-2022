import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
export default function Footer(){
    const navigation = useNavigation();
    return (
        <View style={styles.footerContainer}>
          {/* Ye footer ha */}
            <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Dashboard')}>
                  <Image style={styles.footerIcon} source={require('../assets/home_icon.png')} />
                  <Text style={styles.footerButtonText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Login')}>
                  <Image style={styles.footerIcon} source={require('../assets/menu_icon.png')} />
                  <Text style={styles.footerButtonText}>Menu</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Login')}>
                  <Image style={styles.footerIcon} source={require('../assets/deals_icon.png')} />
                  <Text style={styles.footerButtonText}>Deals</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Message')}>
                  <Image style={styles.footerIcon} source={require('../assets/chat_icon.png')} />
                  <Text style={styles.footerButtonText}>Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('GiveFeedback')}>
                  <Image style={styles.footerIcon} source={require('../assets/more_icon.png')} />
                  <Text style={styles.footerButtonText}>More</Text>
            </TouchableOpacity>
      </View>
    );
  };
  const styles = StyleSheet.create({
    footerContainer: {
        height: 70,
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
      },
      footerIcon: {
        height: 20,
        width: 20,
        //marginRight: 10,
      },
      footerButton: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        width: 70,
        //backgroundColor: '#cccccc',
        borderRadius: 20,
      },
      footerButtonText: {
        //fontWeight: 'bold',
        fontSize: 16,
      },
});