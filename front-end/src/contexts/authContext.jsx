import React, { useContext } from "react";

const AuthContext = React.createContext();

export default function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const value = {};
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
