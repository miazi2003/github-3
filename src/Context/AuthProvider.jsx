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
    return signOut(auth);
  };

  // 🔁 Auth state listener
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);

      if (currentUser?.email) {
        try {
          // 1️⃣ Fetch JWT
          const jwtRes = await axiosSecure.post('/jwt', { email: currentUser.email });
          if (jwtRes.data?.token) {
            localStorage.setItem('access-token', jwtRes.data.token);
          }

          // 2️⃣ Fetch user from DB (including role)
          const userRes = await axiosSecure.get(`/users/${currentUser.email}`);
          const userFromDB = userRes.data;

          // 3️⃣ Set user state with role
          setUser({
            email: currentUser.email,
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
            role: userFromDB?.role || "tourist", // fallback to 'tourist'
          });
        } catch (error) {
          console.error("🔥 Auth error:", error.message);

          // fallback setUser without DB role
          setUser({
            email: currentUser.email,
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
            role: "tourist", // fallback
          });
        }
      } else {
        setUser(null);
        localStorage.removeItem("access-token");
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

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
