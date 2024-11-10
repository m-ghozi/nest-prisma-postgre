export interface UserPayload {
  sub: number;
  name: string;
  email: string;
}

export interface LoginResponse {
  access_token: string;
}
