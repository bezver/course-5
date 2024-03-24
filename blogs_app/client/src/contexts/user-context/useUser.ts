import AuthService from '../../services/Auth.service';
import toast from 'react-hot-toast';
import { EventType, LoginService } from '../../services/Login.service';
import { IdentityUser } from '../../models/IdentityUser';
import { useCallback, useEffect } from 'react';
import { useUserContext } from './UserContextProvider';

const useUser = () => {
  const { user, setUser, isAuth, setIsAuth } = useUserContext();

  useEffect(() => {
    LoginService.addEventListener(EventType.Logout, removeAuth);
    LoginService.addEventListener(EventType.Login, setAuth);
    return () => {
      LoginService.removeEventListener(EventType.Logout, removeAuth);
      LoginService.removeEventListener(EventType.Login, setAuth);
    };
  }, []);

  const setAuth = useCallback(() => {
    AuthService.getIdentityUser()
      .then((user: IdentityUser) => {
        setUser(user);
        setIsAuth(true);
      })
      .catch(() => {
        toast.error('Invalid authorization token');
      });
  }, [setUser, setIsAuth]);

  const removeAuth = useCallback(() => {
    setUser(null);
    setIsAuth(false);
  }, [setUser, setIsAuth]);

  return {
    user,
    isAuth,
    setAuth,
    removeAuth
  };
};

export default useUser;
