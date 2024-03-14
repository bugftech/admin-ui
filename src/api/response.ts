/**
 * API Response
 */
export type APIResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
  status?: number;
};
