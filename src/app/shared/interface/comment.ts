export interface Comment {
  id: number;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    avatar: string;
  };
  content: string;
  createdAt: string;
  subComments: Comment[];
  likes: {
    id: number;
    user: {
      id: string;
      name: string;
      avatar: string;
    }
  }[];
}
