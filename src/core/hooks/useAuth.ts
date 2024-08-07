import { useState, useEffect, useCallback } from 'react';
import WebApp from '@twa-dev/sdk';
import { getTokenByTgInitData } from '../services/login.service';
import { IUserData } from '../types';

interface IUseAuthReturn {
  isLogin: boolean;
  user?: IUserData;
  isLoading: boolean;
  token: string;
}

export const useAuth = (): IUseAuthReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [user, setUser] = useState<IUserData>();
  const [token, setToken] = useState<string>('');

  const login = useCallback((newToken: string) => {
    localStorage.setItem('token', JSON.stringify(newToken));
    setToken(newToken);
    setIsLogin(true);
  }, []);

  const getToken = async () => {
    const data = WebApp.initData;
    //const data =
    //"query_id=AAHa1-IqAAAAANrX4ipzlSME&user=%7B%22id%22%3A719509466%2C%22first_name%22%3A%22%D0%92%D0%BB%D0%B0%D0%B4%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22vlad_bedlam%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1719857198&hash=4b4c720bcff02c3bf99d06c5fa94033aac492746e7fc79b0a8dd617007759f5d";
    try {
      const { token, user } = await getTokenByTgInitData(data);
      login(token);
      setUser(user);
      setIsLoading(false);
    } catch (error: any) {
      console.log('Failed to get token', error);
      return;
    }
  };

  useEffect(() => {
    if (!isLogin) {
      getToken();
    }
  }, [isLogin]);

  return {
    user,
    isLogin,
    isLoading,
    token,
  };
};
