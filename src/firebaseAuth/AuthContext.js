import { auth, database } from './firebase';
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



    async function updateCartHistory(userId, info, date) {
        try {
            const userInfo = database.ref('user/' + userId + `/${Date.now()}`);
            await userInfo.set({
                name: info.name,
                address: info.address,
                cartItem: info.cartItem,
                date: date
            })
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
        signOut,
        updateCartHistory,
    }

    return (
        <userContext.Provider value={value}>
            {!loading && children}
        </userContext.Provider>
    )
}
