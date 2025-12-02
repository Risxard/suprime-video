import { useState, useCallback } from 'react';
import { loginAsGuest, loginUser, registerUser } from '../../services/firebase/AuthServices';
import { auth } from '../../services/firebase/firebaseconfig';

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLoginUser = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);
    const result = await loginUser(email, password);
    setLoading(false);
    if (!result.success) {
      setError(result.error);
    }
    return result;
  }, []);

  const handleLoginAsGuest = useCallback(async () => {
    setLoading(true);
    setError(null);
    const result = await loginAsGuest();
    setLoading(false);
    if (!result.success) {
      setError(result.error);
    }
    return result;
  }, []);

  const handleRegisterUser = useCallback(async ({ email, password, name }) => {
    setLoading(true);
    setError(null);
    try {
      const result = await registerUser({ email, password, name });
      setLoading(false);
      return result;
    } catch (error) {
      setLoading(false);
      setError(error.message);
      return { success: false, error: error.message };
    }
  }, []);

  const handleLogout = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await auth.signOut();

      localStorage.removeItem('auth-data');
      localStorage.removeItem('@AuthSV:currentProfile');
      localStorage.removeItem('@AuthSV:profiles');
      localStorage.removeItem('i18nextLng');

      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  }, []);

  return {
    loginUser: handleLoginUser,
    loginAsGuest: handleLoginAsGuest,
    registerUser: handleRegisterUser,
    logout: handleLogout,
    loading,
    error,
  };
}
