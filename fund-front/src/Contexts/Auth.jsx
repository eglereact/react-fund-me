import { createContext, useCallback, useState } from "react";

export const AuthContext = createContext();

export const Auth = ({ children }) => {
  const [user, setUser] = useState((_) => {
    const user = localStorage.getItem("fundUser");
    return user ? JSON.parse(user) : null;
  });

  const addUser = useCallback((user) => {
    setUser(user);
    localStorage.setItem("fundUser", JSON.stringify(user));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        addUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
