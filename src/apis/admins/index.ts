import { instance } from '../axios';
import { LoginRequest } from './type';
import { LoginResponse } from './type';
import { AxiosResponse } from 'axios';

// 로그인
export const login = async (data: LoginRequest): Promise<AxiosResponse<LoginResponse>> => {
  return await instance.post<LoginResponse>('/admins/login', data);
};
