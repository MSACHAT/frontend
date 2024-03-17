import apiClient from '../../middlewares/axiosInterceptors';
import { AxiosResponse } from 'axios';

export const GetData = (pageNum, pageSize) => {
  return apiClient
    .get('/posts', {
      params: {
        pageNum: pageNum,
        pageSize: pageSize,
      },
    })
    .then(async res => {
      const notifCounts = await apiClient.get('/notifications/newMessage');
      const data = res.data.posts.map(post => ({
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
      const result = {
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
