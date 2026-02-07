export interface ResponseType<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface AuthResponseType<T> extends ResponseType<T> {
  accessToken: string;
  refreshToken: string;
}

export interface PaginatedResponseType<T> extends ResponseType<T> {
  meta: {
    total_count: number;
    current_page: number;
    per_page: number;
    total_pages: number;
  };
}

export type JWTPayload = {
  sub: number;
  email: string;
};
