// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAlFKyRRoT4i4_zh-r1eDTf1Ux2RwoixfY",
  authDomain: "mj-music-react-app.firebaseapp.com",
  projectId: "mj-music-react-app",
  storageBucket: "mj-music-react-app.appspot.com",
  messagingSenderId: "538591301088",
  appId: "1:538591301088:web:5baf838309784fb25aef85",
  measurementId: "G-C3SMHD1W7V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore();