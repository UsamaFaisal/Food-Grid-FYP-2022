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
          await firebase.auth().createUserWithEmailAndPassword(email, password);
        } catch (e) {
          console.log(e);
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