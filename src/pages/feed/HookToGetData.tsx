import apiClient from '../../middlewares/axiosInterceptors.js';
import {BasePageResponse} from '../../../types/common/service';
import {PostModel} from '../../../types/post';

export const GetData = async (pageNum: number, pageSize: number): Promise<(BasePageResponse<PostModel>&{newNotifCounts:number})> => {
  const params = {pageNum, pageSize};
  const res = await apiClient.get('/posts', {params});
  const notifCounts = await apiClient.get('/notifications/newMessage');

  return {
    data:res.data.posts,
    totalPages: res.data.totalPages,
    newNotifCounts: notifCounts.data.newNotifCounts,
  };
  // 没有错误处理
};
