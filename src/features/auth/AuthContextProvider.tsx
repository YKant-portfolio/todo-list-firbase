import { useSnackbar } from '@features/todo/SnackbarMessage';
import { FirebaseApp } from 'firebase/app';
import {
  ProviderId,
  GoogleAuthProvider,
  GithubAuthProvider,
  User,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  browserLocalPersistence,
  signOut,
  UserCredential,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import React, { createContext, FC, useContext, useState, useEffect } from 'react';
import { TAuthContext } from './types';

type TProps = {
  firebaseApp: FirebaseApp;
  children: React.ReactNode;
};

const AuthContext = createContext<TAuthContext>({
  isAuthenticate: null,
  user: null,
  loginWithEmailAndPassword: () => Promise.reject(),
  logOut: () => void 0,
  loginWithPopup: () => Promise.reject(),
  signUpUserWithEmailAndPassword: () => Promise.reject(),
});

export const ALLOWED_OAUTH_PROVIDERS: Record<string, any> = {
  [ProviderId.GOOGLE]: new GoogleAuthProvider(),
  [ProviderId.GITHUB]: new GithubAuthProvider(),
};

export const useAuth = (): TAuthContext => useContext(AuthContext);

export const AuthContextProvider: FC<TProps> = ({ firebaseApp, children }) => {
  const [isAuthenticate, setIsAuthenticate] = useState<TAuthContext['isAuthenticate']>(null);
  const [user, setUser] = useState<User | null>(null);
  const [auth] = useState(getAuth(firebaseApp));

  const { showSnackbar } = useSnackbar();

  const processLogin = async (promise: Promise<UserCredential>): Promise<UserCredential> => {
    setIsAuthenticate(null);
    setUser(null);

    try {
      const result = await promise;
      return result;
    } catch (error) {
      showSnackbar('Ошибка при входе в систему:');
      throw error;
    }
  };

  const loginWithEmailAndPassword: TAuthContext['loginWithEmailAndPassword'] = (email, password) => {
    return processLogin(signInWithEmailAndPassword(auth, email, password));
  };

  const loginWithPopup: TAuthContext['loginWithPopup'] = (provider: string) => {
    const authProvider = ALLOWED_OAUTH_PROVIDERS[provider];
    return processLogin(signInWithPopup(auth, authProvider));
  };

  const signUpUserWithEmailAndPassword: TAuthContext['signUpUserWithEmailAndPassword'] = (email, password) => {
    return processLogin(createUserWithEmailAndPassword(auth, email, password));
  };

  useEffect(() => {
    auth.setPersistence(browserLocalPersistence);
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticate(true);
        setUser(user);
      } else {
        setIsAuthenticate(false);
        setUser(null);
      }
    });
  }, [auth]);

  const logOut = () => signOut(auth);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticate,
        user,
        loginWithEmailAndPassword,
        logOut,
        loginWithPopup,
        signUpUserWithEmailAndPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
