import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

export interface LoginEntry {
  email: string;
  password: string;
}
export interface RegisterEntry {
  email: string;
  password: string;
  repeatPassword?: string;
}

interface ContextProps {
  user: FirebaseAuthTypes.User | null;
  login: (data: LoginEntry) => void;
  logout: () => void;
  setUser: React.Dispatch<React.SetStateAction<FirebaseAuthTypes.User | null>>;
  isAuthenticated: boolean;
  isLoading: boolean;
  isError: boolean;
}
export const UserContext = createContext<ContextProps | null>(null);

export function UserProvider({ children }: React.PropsWithChildren<unknown>) {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setError] = useState<boolean>(false);

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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = useCallback(() => {
    setIsLoading(true);
    auth()
      .signOut()
      // .then(async () => {
      //   await storage.removeValue("AccountSettings");
      //   queryClient.removeQueries();
      //   setUser(null);
      // })
      .catch((error: Error) => console.error(error.message))
      .finally(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isAuthenticated = useMemo(() => !!user, [user]);

  const userContext = useMemo(
    () => ({
      login,
      logout,
      user,
      setUser,
      isAuthenticated,
      isLoading,
      isError,
    }),
    [login, logout, user, isAuthenticated, isLoading, isError]
  );

  return (
    <UserContext.Provider value={userContext}>{children}</UserContext.Provider>
  );
}
