import { useState, useEffect } from "react";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const authData = localStorage.getItem("guesthouse_admin_auth");
      if (authData) {
        const parsedData = JSON.parse(authData);
        setUser(parsedData.user || null);
      }
    } catch (error) {
      console.error("Error parsing auth data:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (userData) => {
    const authData = { user: userData };
    localStorage.setItem("guesthouse_admin_auth", JSON.stringify(authData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("guesthouse_admin_auth");
    setUser(null);
  };

  const updateUser = (updatedUserData) => {
    const authData = { user: updatedUserData };
    localStorage.setItem("guesthouse_admin_auth", JSON.stringify(authData));
    setUser(updatedUserData);
  };

  return {
    user,
    loading,
    login,
    logout,
    updateUser,
    isAuthenticated: !!user,
  };
};

export default useAuth;
