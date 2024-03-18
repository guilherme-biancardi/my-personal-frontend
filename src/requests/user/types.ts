import type { BaseResponse } from '..';

export interface User {
  id: number;
  name: string;
  email: string;
  isOwner: boolean;
}

export type GetUserResponse = BaseResponse<User>;
