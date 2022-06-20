import { BaseModel } from './base/base.model';

export interface ApiResponse<T> extends BaseModel {
  isValidResponse: boolean;
  errors: [];
  result: Result<T>;
}

export interface Result<T> {
  commandMessage: string;
  responseData: T;
}

export interface BaseResponse<T> {
  message: string;
  errors: string[];
  innerData: T;
}

export interface TableResponseModel<T> {
  items: T[];
  total: number;
}
