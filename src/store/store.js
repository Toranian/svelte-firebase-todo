import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { writable } from "svelte/store";
import {auth} from '../lib/firebase/firebase';

export const authStore = writable({
    user: null,
    loading: true,
    data: {}
})

/**
 * Allows for easier use of the Firebase functions to create and signin users.
 */
export const authHandlers = {
    /**
     * @param {string} email
     * @param {string} password
     */
    signup: async (email, password) => {
        await createUserWithEmailAndPassword(auth, email, password);
    },
    
    /**
     * @param {string} email
     * @param {string} password
     */
    login: async (email, password) => {
        await signInWithEmailAndPassword(auth, email, password);
    },
    logout: async () => {
        await signOut(auth);
    },
}
