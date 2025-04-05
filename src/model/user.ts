export type Role = "admin" | "member";

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role
}