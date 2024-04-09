import type { BaseResponse } from '..';

export interface User {
  id: number;
  name: string;
  email: string;
  isOwner: boolean;
  photo: string | null;
}

export type GetUserResponse = BaseResponse<User>;

export type ChangePasswordRequest = Record<
  'current_password' | 'password' | 'password_confirmation',
  string
>;
