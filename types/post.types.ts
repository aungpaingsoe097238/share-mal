import { UserType } from "./user.types";

export interface PostType {
  id?: string;
  slug?: string;
  title?: string;
  content?: string;
  published?: boolean;
  author?: UserType;
  authorId?: string;
  categoryIDs?: string[];
  categories?: string[];
  createdAt?: string;
}
