import type { BaseResponse } from '..';

export type LoginRequest = Record<'email' | 'password', string>;

export type LoginResponse = BaseResponse<{
  token: string;
}>;

export type ResetPasswordRequest = Record<
  'token' | 'email' | 'password' | 'password_confirmation',
  string
>;