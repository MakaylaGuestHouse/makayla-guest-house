// Auth utility functions
export const setAuthSession = (userData) => {
  const authData = {
    user: userData,
    timestamp: Date.now(),
    expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
  };

  // Store in localStorage for persistence
  localStorage.setItem("guesthouse_admin_auth", JSON.stringify(authData));

  // Also set in sessionStorage as backup
  sessionStorage.setItem("guesthouse_admin_session", JSON.stringify(authData));
};

export const clearAuthSession = () => {
  localStorage.removeItem("guesthouse_admin_auth");
  sessionStorage.removeItem("guesthouse_admin_session");
};
