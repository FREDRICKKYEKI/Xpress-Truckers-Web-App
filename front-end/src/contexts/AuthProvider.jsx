import React, { useContext, useEffect, useState } from "react";

const AuthContext = React.createContext();

export default function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    localStorage.getItem("token")
      ? setCurrentUser(localStorage.getItem("token"))
      : setCurrentUser(null);
  }, []);

  const value = {
    currentUser,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
