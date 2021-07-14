import React, { createContext, useContext, useState, useEffect } from 'react'
import { auth } from '../firebase'

export const AuthContext = createContext();

export function useAuth() {
    const value = useContext(AuthContext)
    return value;
}

export function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] = useState();

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    //so executa quando motamos nosso componet
    useEffect(() => {
        //notifica sempre que um user for definido
        const unsubscriber =  auth.onAuthStateChanged(user => {
            setCurrentUser(user)
        })

        return unsubscriber;

    }, [])

    //estado do user
    const value = {
        currentUser,
        signup
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>

    )
}
