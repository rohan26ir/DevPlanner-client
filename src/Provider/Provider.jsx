import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from "firebase/auth";
import { auth } from "../Firebase/Firebase.config";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const Provider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();

  // Create New User
  const createNewUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
      .catch(error => {
        setLoading(false);
        console.error(error);
      });
  };

  // Log In with Email & Password
  const logIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
      .catch(error => {
        setLoading(false);
        console.error(error);
      });
  };

  // Sign in with Google
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider)
      .catch(error => {
        setLoading(false);
        console.error(error);
      });
  };

  // Log Out
  const logOut = () => {
    setLoading(true);
    return signOut(auth)
      .catch(error => {
        setLoading(false);
        console.error(error);
      });
  };

  // Monitor Authentication State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    createNewUser,
    logIn,
    signInWithGoogle,
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default Provider;
