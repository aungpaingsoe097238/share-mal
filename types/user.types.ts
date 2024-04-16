import { ProfileType } from "./profile.types";

export interface UserType {
  email: string;
  name: string;
  password?: string;
  role: "USER" | "ADMIN";
  posts?: any[];
  profile?: ProfileType;
}
