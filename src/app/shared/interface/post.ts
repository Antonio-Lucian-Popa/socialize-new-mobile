export interface Post {
  id: string;
  description: string;
  createdAt: string;
  imageFilenames: string[],
  user: UserPost;
  likes: UserPost[];
 // comments: Comment[];
 numberOfComments: number;
}

export interface UserPost {
  id: string;
  firstName: string;
  lastName: string;
  avatar: string;
}
