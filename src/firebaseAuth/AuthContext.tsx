import { auth, database } from "./firebase";
import firebase from "firebase/app";
import React, { useContext, useState, useEffect, ReactNode } from "react";
import { CartInfo } from "../Modal";

// @ts-ignore
const userContext = React.createContext();

//Custom Hook
export function useAuth() {
  return useContext(userContext);
}

//Auth Provider
export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>();
  const [loading, setLoading] = useState(true);

  async function signUp(email: string, password: string) {
    try {
      await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      await auth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      alert(error);
    }
  }

  function signOut() {
    return auth.signOut();
  }

  async function login(email: string, password: string) {
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      alert(error);
    }
  }

  async function updateCartHistory(
    userId: number,
    info: CartInfo,
    date: string
  ) {
    try {
      const userInfo = database.ref("user/" + userId + `/${Date.now()}`);
      await userInfo.set({
        name: info.name,
        address: info.address,
        cartItem: info.cartItem,
        date: date,
      });
    } catch (error) {
      alert(error);
    }
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    setCurrentUser,
    signUp,
    login,
    signOut,
    updateCartHistory,
  };

  return (
    <userContext.Provider value={value}>
      {!loading && children}
    </userContext.Provider>
  );
}
