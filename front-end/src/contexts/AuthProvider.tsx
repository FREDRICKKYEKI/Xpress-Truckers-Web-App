import { createContext, useContext, useState, ReactNode } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import { AuthContextInterface, userResponse, userToken } from "../utils/types";

const AuthContext = createContext<AuthContextInterface>({
  currentUser: null,
  setCurrentUser: () => {},
  setToken: () => {},
  token: null,
});

export default function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<userResponse | null>(null);
  const [token, setToken] = useLocalStorage<userToken | null>("user_tk", null);

  const value = {
    currentUser,
    setCurrentUser,
    setToken,
    token,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
