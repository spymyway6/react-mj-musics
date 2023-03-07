import React from 'react';
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { toast } from 'react-toastify';
import { db } from '../firebase';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
    const navigate = useNavigate();
    async function onGoogleClick(){
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // check for the user

            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            if(!docSnap.exists()){
                await setDoc(docRef, {
                    name: user.displayName,
                    email: user.email,
                    timestamp: serverTimestamp(),
                });
            }
            navigate('/');
        } catch (error) {
            toast.error("Could not authorize with google.");
        }
    }
    return (
        <button onClick={onGoogleClick} className="google-button" id="google-button" type="button"> <FcGoogle /> Continue with Google</button>
    )
}
