import type { AxiosResponse } from 'axios';

export type RequestFactory<Req = null> = (params: Req) => () => Promise<AxiosResponse>;

export interface BaseResponse<Data> {
  data: Data;
  message?: string;
}

export type ErrorWithRequest<Fields extends string> = Record<Fields, string[]>;
