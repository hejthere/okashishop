import { auth } from './firebase';
import firebase from 'firebase/app';


import React, { useContext, useState, useEffect } from 'react';

const userContext = React.createContext();

//Custom Hook 
export function useAuth() {
    return useContext(userContext);
}

//Auth Provider 
export function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] = useState()

    async function signUp(email, password) {
        try {
            await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
            await auth.createUserWithEmailAndPassword(email, password);
        } catch (error) {
            alert(error);
        }
    }

    function signOut() {
        return auth.signOut()
    }

    async function login(email, password) {
        try {
            await auth.signInWithEmailAndPassword(email, password);
        } catch (error) {
            alert(error);
        }
    }

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe =
            auth.onAuthStateChanged((user) => {
                setCurrentUser(user)
                setLoading(false)
            });
        return unsubscribe
    }, [])


    const value = {
        currentUser,
        setCurrentUser,
        signUp,
        login,
        signOut
    }

    return (
        <userContext.Provider value={value}>
            {!loading && children}
        </userContext.Provider>
    )
}
