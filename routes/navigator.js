import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
//import Loading from "../Screens/Loading";
import GiveFeedback from "../Screens/GiveFeedback";
import Welcome from "../Screens/Welcome";
import MakePayment from "../Screens/MakePayment";
import Onboarding from "../Screens/Onboarding";
import TabviewScreen from "../Screens/TabviewScreen";
import Tabviewallscreen from "../Screens/Tabviewallscreen";
import Profile from "../Screens/Profile";
import Signup from "../Screens/Signup";
import ManageCart from "../Screens/ManageCart";
import Login from "../Screens/Login";
import Order from "../Screens/Order";
import Map from "../Screens/Map";
import Admindashboard from "../Screens/Admindashboard";
import Dashboard from "../Screens/Dashboard";
import TrackOrder from "../Screens/TrackOrder";
import Message from "../Screens/Message";
import AdminMessage from "../Screens/AdminMessage";
import ManageUsers from "../Screens/ManageUsers";
import ManageFooditems from "../Screens/ManageFooditems";
import EditUser from "../Screens/EditUser";
import EditFooditem from "../Screens/EditFooditem";
import AddUser from "../Screens/AddUser";
import AddFooditem from "../Screens/AddFooditem";
import ChatHandling from "../Screens/ChatHandling";
import Vouchers from "../Screens/Vouchers";
import Details from "../Screens/Details";
import { AuthContext } from "./Authenticationprovider";
import * as firebase from 'firebase';
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import TrackLocation from "../Screens/TrackLocation";
import AdminTrackOrders from '../Screens/AdminTrackOrders';
import Deals from "../Screens/Deals";
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
        <Stack.Screen name="Signup" component={Signup} />
        {/* <Stack.Screen name="Dashboard" component={Dashboard} /> */}
        <Stack.Screen name="GiveFeedback" component={GiveFeedback} />
        <Stack.Screen name="MakePayment" component={MakePayment} />
        <Stack.Screen name="TabviewScreen" component={TabviewScreen} />
        <Stack.Screen name="Tabviewallscreen" component={Tabviewallscreen} />
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="Login" component={Login} />
        {user ? <Stack.Screen name="TrackOrder" component={TrackOrder} /> :<Stack.Screen name="TrackOrder" component={TrackOrder} />}
        {user ? <Stack.Screen name="Admindashboard" component={Admindashboard} /> :<Stack.Screen name="Admindashboard" component={Admindashboard} />}
        {user ? <Stack.Screen name="Dashboard" component={Dashboard} /> :<Stack.Screen name="Dashboard" component={Dashboard} />}
        {user ? <Stack.Screen name="Profile" component={Profile} /> :<Stack.Screen name="Profile" component={Profile} />}
        {user ? <Stack.Screen name="Message" component={Message} /> :<Stack.Screen name="Message" component={Message} />}
        {user ? <Stack.Screen name="AdminMessage" component={AdminMessage} /> :<Stack.Screen name="AdminMessage" component={AdminMessage} />}
        {user ? <Stack.Screen name="ManageUsers" component={ManageUsers} /> :<Stack.Screen name="ManageUsers" component={ManageUsers} />}
        {user ? <Stack.Screen name="ManageFooditems" component={ManageFooditems} /> :<Stack.Screen name="ManageFooditems" component={ManageFooditems} />}
        {user ? <Stack.Screen name="AddUser" component={AddUser} /> :<Stack.Screen name="AddUser" component={AddUser} />}
        {user ? <Stack.Screen name="AddFooditem" component={AddFooditem} /> :<Stack.Screen name="AddFooditem" component={AddFooditem} />}
        {user ? <Stack.Screen name="EditFooditem" component={EditFooditem} /> :<Stack.Screen name="EditFooditem" component={EditFooditem} />}
        {user ? <Stack.Screen name="EditUser" component={EditUser} /> :<Stack.Screen name="EditUser" component={EditUser} />}
        {user ? <Stack.Screen name="ChatHandling" component={ChatHandling} /> :<Stack.Screen name="ChatHandling" component={ChatHandling} />}
        {user ? <Stack.Screen name="ManageCart" component={ManageCart} /> :<Stack.Screen name="ManageCart" component={ManageCart} />}
        {user ? <Stack.Screen name="Order" component={Order} /> :<Stack.Screen name="Order" component={Order} />}
        {user ? <Stack.Screen name="Map" component={Map} /> :<Stack.Screen name="Map" component={Map} />}
        {user ? <Stack.Screen name="TrackLocation" component={TrackLocation} /> :<Stack.Screen name="TrackLocation" component={TrackLocation} />}
        {user ? <Stack.Screen name="Vouchers" component={Vouchers} /> :<Stack.Screen name="Vouchers" component={Vouchers} />}
        {user ? <Stack.Screen name="Details" component={Details} /> :<Stack.Screen name="Details" component={Details} />}
        {user ? <Stack.Screen name="AdminTrackOrders" component={AdminTrackOrders} /> :<Stack.Screen name="AdminTrackOrders" component={AdminTrackOrders} />}
        {user ? <Stack.Screen name="Deals" component={Deals} /> :<Stack.Screen name="Deals" component={Deals} />}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
