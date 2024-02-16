import { UserPost } from "./post";

export interface Comment {
  id: string;
  value: string;
  createdAt: string;
  postId: string;
  userDto: UserPost;
  parentId: string;
  subComments: Comment[];
  // likes: {
  //   id: number;
  //   user: {
  //     id: string;
  //     name: string;
  //     avatar: string;
  //   }
  // }[];
}
