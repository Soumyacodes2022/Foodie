import React, { createContext, useState, useEffect} from 'react'
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from '../firebase/firebase.config';
import { FaChevronCircleLeft } from 'react-icons/fa';

export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    //create User
    const createUser =  (email,password) => {
        return createUserWithEmailAndPassword(auth,email,password);
    }

    //sign in with Gmail
    const signupWithEmail=()=>{
        return signInWithPopup(auth , googleProvider)
    }

    //login using email and password
    const loginwithEmail = (email,password) => {
        return signInWithEmailAndPassword(auth,email,password)
    }

    //logout of a User
    const logOut = () => {
        signOut(auth);
    }

    //update a User's Profile
    const updateUserProfile= (name,photoURL) => {
        updateProfile(auth.currentUser,{
            displayName: name , photoURL: photoURL  
        })    
    }

    //check user sign in
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
              setUser(currentUser);
              setLoading(false);
            } else {
              // User is signed out
              // ...
            }
          })
          return ()=>{
            return unsubscribe()
          }
    },[])
    const authInfo = {
        user,
        createUser,
        signupWithEmail,
        loginwithEmail,
        logOut,
        updateUserProfile,


    }
  return (
    <AuthContext.Provider value={authInfo}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider