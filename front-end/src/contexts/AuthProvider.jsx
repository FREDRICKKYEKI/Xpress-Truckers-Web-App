import React, { useContext, useEffect, useState } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
const AuthContext = React.createContext();

export default function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [token, setToken] = useLocalStorage("token", null);

  const value = {
    currentUser,
    setCurrentUser,
    setToken,
    token,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
