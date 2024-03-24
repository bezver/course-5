import AuthService from '../../services/Auth.service';
import toast from 'react-hot-toast';
import { createContext, FC, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { IdentityUser } from '../../models/IdentityUser';

export interface IUserContext {
  user: IdentityUser | null;
  setUser(user: IdentityUser | null): void;
  isAuth: boolean;
  setIsAuth(isAuth: boolean): void;
}

const UserContext = createContext<IUserContext | undefined>(undefined);
const useUserContext = (): IUserContext => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }

  return context;
};

const UserProvider: FC<PropsWithChildren> = ({ children }) => {
  const token = localStorage.getItem('authToken');

  const [user, setUser] = useState<IdentityUser | null>(null);
  const [isAuth, setIsAuth] = useState<boolean>(!!token);

  useEffect(() => {
    if (!!token) {
      AuthService.getIdentityUser()
        .then((user: IdentityUser) => {
          setUser(user);
        })
        .catch(() => {
          toast.error('Invalid authorization token');
        });
    }
  }, []);

  const UserContextValue: IUserContext = {
    user,
    setUser,
    isAuth,
    setIsAuth
  };

  return <UserContext.Provider value={UserContextValue}>{children}</UserContext.Provider>;
};

export { UserProvider, useUserContext };
