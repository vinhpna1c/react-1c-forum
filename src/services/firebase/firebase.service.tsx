// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDxuCInvyRsmL18OhUMF97aAl_pFKkvvnA",
    authDomain: "tinh-te-web.firebaseapp.com",
    projectId: "tinh-te-web",
    storageBucket: "tinh-te-web.appspot.com",
    messagingSenderId: "127097549444",
    appId: "1:127097549444:web:ae4e1608fec357bc5848d1",
    measurementId: "G-YSN1737BKE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const initFirebase = () => {

    return app;
}

export const auth = getAuth();
