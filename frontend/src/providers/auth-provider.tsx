"use client";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

type AuthContext = {
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
};

export const AuthContext = createContext<AuthContext>({
  username: "",
  setUsername: () => {},
});

export default function AuthContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [username, setUsername] = useState("");
  return (
    <AuthContext.Provider
      value={{
        username,
        setUsername,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
