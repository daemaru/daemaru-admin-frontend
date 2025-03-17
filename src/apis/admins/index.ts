import { instance } from '../axios';
import { LoginRequest } from './type';
import { LoginResponse } from './type';

// 로그인
export const login = async (data: LoginRequest) => {
  return await instance.post<LoginResponse>('/admins/login', data);
};
