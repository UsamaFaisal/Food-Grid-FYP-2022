import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
//import Loading from "../Screens/Loading";
import Welcome from "../Screens/Welcome";
import Onboarding from "../Screens/Onboarding";
import Signup from "../Screens/Signup";
import Login from "../Screens/Login";
import Admindashboard from "../Screens/Admindashboard";
import { AuthContext } from "./Authenticationprovider";
import * as firebase from 'firebase';
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";

const Stack = createStackNavigator();

function AppNavigator() {
  const {user,setUser}= useContext(AuthContext);
  const [initializing ,setInitializing]=useState(true);
const onAuthStateChanged=(user)=>{
    setUser(user);
    if(initializing) setInitializing(false);
}
  useEffect(()=>{
    const subscriber=firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;

  },[]);

  if(initializing) return null;
    return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>     
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Login" component={Login} />
        {user ? <Stack.Screen name="Admindashboard" component={Admindashboard} /> :<Stack.Screen name="Admindashboard" component={Admindashboard} />}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
