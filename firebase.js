import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyBVJKQ0w-vCd-UjLJgD6qsnBk_1DezwDhY",
	authDomain: "twister-eea1a.firebaseapp.com",
	projectId: "twister-eea1a",
	storageBucket: "twister-eea1a.appspot.com",
	messagingSenderId: "702698516185",
	appId: "1:702698516185:web:afe19daaf98581aa8298c8",
	measurementId: "G-L340G372X1",
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

export { app, auth, db };
