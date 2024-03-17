import apiClient from '../../middlewares/axiosInterceptors';
import { Post, GetPostsResponse } from '../../config/types.ts'



export const GetData = (pageNum: number, pageSize:number):Promise<GetPostsResponse | void>  => {
  return apiClient
    .get('/posts', {
      params: {
        pageNum: pageNum,
        pageSize: pageSize,
      },
    })
    .then(async (res) => {
      const notifCounts = await apiClient.get('/notifications/newMessage');
      const data: Post[] = res.data.posts

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
