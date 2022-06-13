import axios from 'axios';
import {
  updateLocalAccessToken,
  updateLocalRefreshToken,
} from 'utils/TokenService';
import { User } from 'types/user';
import { TokenResponse } from 'types/token';
import { AxiosResponse } from 'axios';

export const register = (user: User) =>
  axios
    .post('/auth/register', user, { baseURL: 'http://localhost:3001/' })
    .then((res) => {
      updateLocalAccessToken(res.data.token);
      updateLocalRefreshToken(res.data.token);
      return res.data.user;
    });

export const login = (info: { email: string; password: string }) => axios
    .post('/auth/login', info, { baseURL: 'http://localhost:3001/' })
