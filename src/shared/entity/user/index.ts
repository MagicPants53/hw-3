export type User = {
  id: number;
  username: string;
  email: string;
}

export type AuthResponse = {
  jwt: string;
  user: User;
}
