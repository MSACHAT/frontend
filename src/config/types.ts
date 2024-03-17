
export interface Post {
  id: number;
  userName: string;
  title: string;
  content: string;
  commentCount: number;
  likeCount: number;
  timeStamp: string;
  images: string[];
  isLiked: boolean;
  userId: number;
  avatar: string;
}

export interface GetPostsResponse  {
  data: Post[];
  totalPages: number;
  newNotifCounts: number;
}