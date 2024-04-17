import { PostType } from "./post.types";

export interface TopicType {
  id?: string;
  name?: string;
  postIDs?: String[];
  posts?: PostType[];
  parentId?: string;
  children?: TopicType[];
  createdAt?: String;
}
