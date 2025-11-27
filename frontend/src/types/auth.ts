export interface User {
  id: number;
  email: string;
  name: string;
  trial_generations: number;
}

export interface Tokens {
  access: string;
  refresh: string;
}

export interface AuthResponse {
  message: string;
  user: User;
  tokens: Tokens;
}

export interface RegisterData {
  email: string;
  name: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface CodeData {
  email: string;
  code: string;
}

