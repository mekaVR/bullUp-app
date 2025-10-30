import { use, createContext, type PropsWithChildren } from "react";
import { useStorageState } from "../hooks/useStorageState";

const AuthContext = createContext<{
  signIn: (username: string, password: string) => void;
  signOut: () => void;
  signUp: (username: string, email: string, password: string) => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  signUp: () => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = use(AuthContext);
  if (!value) {
    throw new Error("useSession must be wrapped in a <SessionProvider />");
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");

  const onSignIn = async (username: string, password: string) => {
    try {
      const reponse = await fetch("http://192.168.1.10:8000/api/token/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      const data = await reponse.json();
      setSession(JSON.stringify(data));
    } catch (e) {
      console.log("ERROR", e);
    }
  };

  const onSignUp = async (
    username: string,
    email: string,
    password: string,
  ) => {
    try {
      const response = await fetch("http://192.168.1.10:8000/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      });
      const data = await response.json();
      setSession(JSON.stringify(data));
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  return (
    <AuthContext
      value={{
        signIn: (username, password) => {
          onSignIn(username, password);
        },
        signOut: () => {
          setSession(null);
        },
        signUp: (username, email, password) => {
          onSignUp(username, email, password);
        },
        session,
        isLoading,
      }}
    >
      {children}
    </AuthContext>
  );
}
