export interface SignUpType {
  name: string;
  email: string;
  password: string;
  password_confirmation?: string;
}

export interface SignInType {
  email: string;
  password: string;
}