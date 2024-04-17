import { ProfileType } from "./profile.types";

export interface UserType {
  email: string;
  name: string;
  username : string;
  password?: string;
  role: "USER" | "ADMIN";
  posts?: any[];
  profile?: ProfileType;
}
