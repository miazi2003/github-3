import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile
} from 'firebase/auth';
import { auth } from '../firebase/firebase.init';
import useAxiosSecure from '../hook/useAxiosSecure';
import axios from 'axios';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();
  const axiosSecure = useAxiosSecure();

  // 🔐 Google Login
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // 📝 Create new user with email/password
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // 🔑 Sign in with email/password
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // ✏️ Update profile (name/photo)
  const updateUserProfile = (profileInfo) => {
    return updateProfile(auth.currentUser, profileInfo);
  };

  // 🚪 Sign out
  const signOutUser = () => {
    setLoading(true);
    localStorage.removeItem("roavia-access-token"); // ✅ Clear token
    return signOut(auth);
  };

  // 🔁 Auth state listener
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);

      if (currentUser?.email) {
        try {
          // ✅ Step 1: Get JWT token from backend
          const jwtRes = await axios.post("http://localhost:3000/jwt", {
            email: currentUser.email,
          });
          const token = jwtRes.data.token;

          // ✅ Step 2: Save token to localStorage
          localStorage.setItem("roavia-access-token", token);

          // ✅ Step 3: Fetch user data from DB
          const userRes = await axiosSecure.get(`/users/${currentUser.email}`);
          const userFromDB = userRes.data;

          // ✅ Step 4: Set user in state
          setUser({
            email: currentUser.email,
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
            role: userFromDB?.role || "tourist",
          });
        } catch (error) {
          console.error("🔥 Auth error:", error.message);

          // fallback setUser without DB role
          setUser({
            email: currentUser.email,
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
            role: "tourist",
          });
        }
      } else {
        setUser(null);
        localStorage.removeItem("roavia-access-token"); // if user logs out or is null
      }

      setLoading(false);
    });

    return () => unSubscribe();
  }, [axiosSecure]);

  // 👇 Expose everything via context
  const authInfo = {
    user,
    loading,
    createUser,
    signInUser,
    signOutUser,
    googleLogin,
    updateUserProfile,
  };

  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
