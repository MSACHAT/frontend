import apiClient from '../../middlewares/axiosInterceptors';
import { AxiosResponse } from 'axios';
import { Post, GetPostsResponse } from '../../config/types.ts'



export const GetData = (pageNum: number, pageSize:number):Promise<GetPostsResponse | void>  => {
  return apiClient
    .get('/posts', {
      params: {
        pageNum: pageNum,
        pageSize: pageSize,
      },
    })
    .then(async (res:AxiosResponse<any>) => {
      const notifCounts = await apiClient.get('/notifications/newMessage');
      const data: Post[] = res.data.posts.map((post: Post) => ({
        id: post.id,
        userName: post.userName,
        title: post.title,
        content: post.content,
        commentCount: post.commentCount,
        likeCount: post.likeCount,
        timeStamp: post.timeStamp,
        images: post.images,
        isLiked: post.isLiked,
        userId: post.userId,
        avatar: post.avatar,
      }));

      const result:GetPostsResponse = {
        data: data,
        totalPages: res.data.totalPages,
        newNotifCounts: notifCounts.data.newNotifCounts,
      };
      return result;
    })
    .catch(err => {
      console.log(err);
    });
};
