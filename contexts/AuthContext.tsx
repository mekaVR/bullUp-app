import { use, createContext, type PropsWithChildren } from "react";
import { useStorageState } from "@/hooks/authentication/useStorageState";
import useGetUserProfile from "@/hooks/user/useGetUserProfile";
import { UserProfile } from "@/services/user/user.interfaces";

const AuthContext = createContext<{
  logOut: () => void;
  session?: string | null;
  setSession: (value: string | null) => void;
  isLoading: boolean;
  user: UserProfile | undefined;
}>({
  logOut: () => {},
  session: null,
  setSession: () => null,
  isLoading: false,
  user: undefined,
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
  const { data: user } = useGetUserProfile(session);

  return (
    <AuthContext
      value={{
        logOut: () => {
          setSession(null);
        },
        session,
        setSession,
        isLoading,
        user,
      }}
    >
      {children}
    </AuthContext>
  );
}
