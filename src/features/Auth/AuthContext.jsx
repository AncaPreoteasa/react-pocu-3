import { createContext, useCallback, useContext, useMemo } from "react";
import { useLocalStorageState } from "../../hooks/useLocalStorageState";
import { toast } from "react-toastify";

const initialAuth = {
  accessToken: null,
  user: null,
};

const AuthContext = createContext(null);

export function AuthContextProvider({ children }) {
  const [auth, setAuth] = useLocalStorageState("auth", initialAuth);

  const login = useCallback(
    (data) => {
      setAuth(data);
    },
    [setAuth]
  );

  const logout = useCallback(() => {
    setAuth(initialAuth);
  }, [setAuth]);

  const updateUserProfile = async (newData) => {
    try {
      const response = await fetch(
        `http://localhost:3000/users/${auth.user.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.accessToken}`,
          },
          body: JSON.stringify(newData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update user profile");
      }

      const updatedUser = await response.json();

      setAuth((prevAuth) => ({
        ...prevAuth,
        user: updatedUser,
      }));

      toast.success("User profile updated successfully!");
    } catch (error) {
      toast.error(`Failed to update user profile: ${error}`);
    }
  };

  const value = useMemo(() => {
    return { ...auth, login, logout, updateUserProfile };
  }, [auth, login, logout, updateUserProfile]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (ctx === null) {
    throw new Error(
      "Please only use useAuthContext inside a descendant of AuthContextProvider."
    );
  }
  return ctx;
}
