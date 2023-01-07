import React from 'react';
import * as firebase from 'firebase';
//import auth from '@react-native-firebase/auth';
import { createContext } from 'react';
import { useState } from 'react';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{
      user,
      setUser,
      login: async (email, password) => {
        try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
       // console.log(varr.user.email);
       if(firebase.auth().currentUser==null)
         {return false;}
        else
         return true;
        //console.log(firebase.auth().currentUser.email);
        } catch (e) {
          console.log(e);
        }
      },
      register: async (email, password) => {
        try {
          const user=await firebase.auth().createUserWithEmailAndPassword(email, password);
          if(user)
          {return true}
          else
          {return false}
        } catch (e) {
          console.log(e);
          //return false
        }
        return false
      },
      update:async function (email, password) {
        try {
          console.log(email);
          const user = firebase.auth().currentUser;
          await user.updateEmail(email);
          await user.updatePassword(password);
          console.log('Email and password updated successfully');
        } catch (error) {
          console.log(error);
        }
      },
      logout: async () => {
        try {
          await firebase.auth().signOut();
        } catch (error) {
          console.log(error);
        }
      }
    }}>
      {children}
    </AuthContext.Provider>
  )
};