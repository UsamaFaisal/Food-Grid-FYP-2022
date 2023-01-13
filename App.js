import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SplashScreen } from 'expo-splash-screen';
import React from 'react';
import Appnavigator from './routes/navigator'
import * as firebase from 'firebase';
import { AuthProvider } from './routes/Authenticationprovider';
const firebaseConfig = {
    // add your own config values here
    apiKey: "AIzaSyAmVXYAiYFPmKoXDO3jmMsM6xhcXdl3qqk",
    authDomain: "foodgrid-1.firebaseapp.com",
    projectId: "foodgrid-1",
    
    storageBucket: "foodgrid-1.appspot.com",
    messagingSenderId: "1022672518984",
    appId: "1:1022672518984:web:c7562ba82450d931a9fd7d",
    measurementId: "G-M9EFVZMT0J"
  };



firebase.initializeApp(firebaseConfig);
console.log("Hello");
console.log(firebase.app.name);




export default function App() {
  
  return (
    <AuthProvider>
       <Appnavigator/>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
