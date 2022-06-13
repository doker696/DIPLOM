import axios from 'utils/axios';
import {
  updateLocalAccessToken,
  updateLocalRefreshToken,
} from 'utils/TokenService';
import { User } from 'types/user';
import { TokenResponse } from 'types/token';
import { AxiosResponse } from 'axios';


export const getCurrentUser = () => axios.get('/auth/me')
.then( res => {
    if (res.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('tokenRefresh')
    }
    return res.data
  })
