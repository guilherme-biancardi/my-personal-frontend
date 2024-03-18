import type { BaseResponse } from '..';

export interface LoginRequest {
  email: string;
  password: string;
}

export type LoginResponse = BaseResponse<{
  token: string;
}>;
