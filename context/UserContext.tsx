import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import React, { createContext, useCallback, useEffect, useMemo, useState } from "react";
import navigation from "../navigation";
import { BackHandler } from "react-native";
import { NotLoggedNavigationProp } from "../navigation/NotLogged";
import { useNavigation } from "@react-navigation/native";

interface LoginEntry {
  email: string;
  password: string;
}
interface RegisterEntry {
  email: string;
  password: string;
  confirmPassword?: string;
}

interface ContextProps {
  user: FirebaseAuthTypes.User | null;
  login: (data: LoginEntry) => void;
  logout: () => void;
  setUser: React.Dispatch<React.SetStateAction<FirebaseAuthTypes.User | null>>;
  isAuthenticated: boolean;
  isLoading: boolean;
  isError: boolean;
  setIsCreatedAccount: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  isCreatedAccount: boolean;
  cleanState: () => void;
}
export const UserContext = createContext<ContextProps | null>(null);

export function UserProvider({ children }: React.PropsWithChildren<unknown>) {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setError] = useState<boolean>(false);
  const [isCreatedAccount, setIsCreatedAccount] = useState<boolean>(false);

  const cleanState = () => {
    setError(false);
    setIsCreatedAccount(false);
  };

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      console.debug("Auth State Changed: ", user);
      if (user && user.emailVerified) {
        setUser(user);
      } else {
        setUser(null);
        logout();
      }
    });
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = useCallback((data: LoginEntry) => {
    if (data.email && data.password) {
      setIsLoading(true);
      auth()
        .signInWithEmailAndPassword(data.email, data.password)
        .then((credentials) => {
          if (credentials.user && credentials.user.emailVerified) {
            setUser(credentials.user);
            setError(false);
          } else {
            setUser(null);
            setError(true);
            logout();
          }
        })
        .catch((err: Error) => {
          setError(true);
          console.error(err);
        })
        .finally(() => setIsLoading(false));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = useCallback(() => {
    setIsLoading(true);
    auth()
      .signOut()
      .catch((error: Error) => console.error(error.message))
      .finally(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isAuthenticated = useMemo(() => !!user, [user]);

  const userContext = useMemo(
    () => ({
      login,
      logout,
      setUser,
      setIsCreatedAccount,
      setError,
      cleanState,
      isCreatedAccount,
      user,
      isAuthenticated,
      isLoading,
      isError,
    }),
    [login, logout, setIsCreatedAccount, setError, isCreatedAccount, user, isAuthenticated, isLoading, isError],
  );

  return <UserContext.Provider value={userContext}>{children}</UserContext.Provider>;
}
