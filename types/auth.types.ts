export interface SignUpType {
  name: string;
  username: string;
  email: string;
  password: string;
  password_confirmation?: string;
}

export interface SignInType {
  email: string;
  password: string;
}

export interface CheckTokenType {
  token: string;
}
