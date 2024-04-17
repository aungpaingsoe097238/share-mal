import { PostType } from "./post.types";

export interface CategoryType {
  id?: string;
  name?: string;
  postIDs?: String[];
  posts?: PostType[];
  createdAt?: String;
}
