import React from "react";
import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
	User,
} from "firebase/auth";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { auth } from "../../firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const router = useRouter();

	const [loading, setLoading] = useState(false);
	const [user, setUser] = useState(null);
	const [error, setError] = useState(null);
	const [initialLoading, setInitialLoading] = useState(true);

	// useEffect(
	// 	() =>
	// 		onAuthStateChanged(auth, (user) => {
	// 			if (user) {
	// 				// Logged in...
	// 				setUser(user);
	// 				setLoading(false);
	// 			} else {
	// 				// Not logged in...
	// 				setUser(null);
	// 				setLoading(true);
	// 				router.push("/login");
	// 			}

	// 			setInitialLoading(false);
	// 		}),
	// 	[auth]
	// );

	//Sign up
	const signUp = async (email, password) => {
		setLoading(true);

		await createUserWithEmailAndPassword(auth, email, password)
			.then((userCre) => {
				setUser(userCre.user);
				router.push("/");
				setLoading(false);
			})
			.catch((err) => alert(err.message))
			.finally(() => setLoading(false));
	};
	//Sign in
	const logIn = async (email, password) => {
		setLoading(true);

		await signInWithEmailAndPassword(auth, email, password)
			.then((userCre) => {
				setUser(userCre.user);
				router.push("/");
				setLoading(false);
			})
			.catch((err) => alert(err.message))
			.finally(() => setLoading(false));
	};
	//logout
	const logOut = async () => {
		setLoading(true);

		signOut(auth)
			.then(() => {
				setUser(null);
				setLoading(false);
			})
			.catch((err) => alert(err.message))
			.finally(setLoading(false));
	};

	const memoValue = useMemo(
		() => ({
			user,
			signUp,
			logIn,
			logOut,
			loading,
			error,
		}),
		[user, loading]
	);

	return <AuthContext.Provider value={memoValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	return useContext(AuthContext);
};
