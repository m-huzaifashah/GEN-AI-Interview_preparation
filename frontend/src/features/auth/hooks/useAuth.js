import { useContext,useEffect } from "react";
import { AuthContext } from "../auth.context";
import { login, logout, register, getMe } from "../services/auth.api";

export const useAuth = () => {
  const context = useContext(AuthContext);


  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  const { user, setUser, loading, setLoading } = context;

  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    try {
      const data = await login({ email, password });
      console.log(data)
      setUser(data.user);
      return { success: true, data };
    } catch (error) {
      console.error("Login failed:", error);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async ({ username, email, password }) => {
    setLoading(true);
    try {
      const data = await register({ username, email, password });
      setUser(data.user);
      return { success: true, data };
    } catch (error) {
      console.error("Register failed:", error);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      setUser(null);
      return { success: true };
    } catch (error) {
      console.error("Logout failed:", error);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
      
    const getAndSetUser=async () => {
        const data =await getMe()
        setUser(data.user)
        setLoading(false)

    }

    getAndSetUser()
      
    }, [])
    

  return {
    handleLogin,
    handleLogout,
    handleRegister,
    user,
    loading,
  };
};