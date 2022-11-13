import { createContext, useContext, useEffect, useState } from "react";
import * as authHelper from "./AuthHelper";

const initAuthContextPropsState = {
  auth: authHelper.getAuth(),
  currentUser: undefined,
  setCurrentUser: () => {},
  logout: () => {},
};

const AuthContext = createContext<any>(initAuthContextPropsState);

const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }: any) => {
  const [auth, setAuth] = useState<any>(null);
  const [currentUser, setCurrentUser] = useState<any>();
  const saveAuth = (auth: any) => {
    setAuth(auth);
    if (auth) {
      authHelper.setAuth(auth);
    } else {
      authHelper.removeAuth();
    }
  };

  const logout = () => {
    saveAuth(undefined);
    setCurrentUser(undefined);
  };

  return (
    <AuthContext.Provider
      value={{ auth, saveAuth, currentUser, setCurrentUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const AuthInit = ({ children }: any) => {
  const { auth, logout, setCurrentUser }: any = useAuth();
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  
  useEffect(() => {
    const newauth = authHelper.getAuth()
    if (newauth) {
      setCurrentUser(newauth);
    } else {
      logout();
      setShowSplashScreen(false);
    }
  }, []);

  // return showSplashScreen ? <>loading</> : <>{children}</>;
  return children;
};

export { AuthProvider, AuthInit, useAuth };
