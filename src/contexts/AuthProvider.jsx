import React, { createContext, useState, useEffect} from 'react'
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from '../firebase/firebase.config';
import { FaChevronCircleLeft } from 'react-icons/fa';
import axios from 'axios';

export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    //create User
    const createUser =  (email,password) => {
      setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password);
    }

    //sign in with Gmail
    const signupWithGmail=()=>{
      setLoading(true);
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
          
              setUser(currentUser);
              if(currentUser){
                const userInfo = {email: currentUser.email};
                axios.post('http://localhost:3000/jwt' , userInfo)
                .then((response)=>{
                  if(response.data.token){
                    localStorage.setItem( "Access-Token" , response.data.token)
                  }
                })
              }
              else{
                localStorage.removeItem("Access-Token")
              }
              setLoading(false);
            
          })
          return ()=>{
            return unsubscribe()
          }
    },[])
    const authInfo = {
        user,
        createUser,
        signupWithGmail,
        loginwithEmail,
        logOut,
        updateUserProfile,
        loading
      }
  return (
    <AuthContext.Provider value={authInfo}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
