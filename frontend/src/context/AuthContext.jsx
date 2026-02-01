import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/api";
import { authStore } from "../api/authstore";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = ({ user, accessToken }) => {
    authStore.setAccessToken(accessToken);
    setUser(user);
    setLoading(false);
  };

  const logout = () => {
    authStore.setAccessToken(null);
    setUser(null);
    setLoading(false);
  };

useEffect(() => {
  const restoreSession = async () => {
    if (authStore.getAccessToken()) {
      setLoading(false);
      return;
    }

    try {
      const res = await api.post("/auth/refresh");
      
      login(res.data);
    } catch {
      logout();
    }
  };

  restoreSession();
  authStore.bindLogout(logout);
}, []);


  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
