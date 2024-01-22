import axios from 'axios';
import { Toast } from '@douyinfe/semi-ui';
import apiClient from '../../middlewares/axiosInterceptors';
export const GetData = (pageNum, pageSize, userId) => {
  return apiClient
    .get(`/profile/${userId}`, {
      params: {
        pageNum: pageNum,
        pageSize: pageSize,
      },
    })
    .then(res => {
      console.log('获取profile数据');
      console.log(res.data);

      const data = res.data.posts.map(post => ({
        id: post.id,
        userName: post.userName,
        title: post.title,
        content: post.content,
        commentCount: post.commentCount,
        likeCount: post.likeCount,
        timeStamp: post.timeStamp,
        images: post.images,
        userId: post.userId,
        isLiked: post.isLiked,
      }));

      const result = {
        data: data,
        totalPages: res.data.totalPages,
      };
      console.log(result, 1111111111111);
      return result;
    });
};
