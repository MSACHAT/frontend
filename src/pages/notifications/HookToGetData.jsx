import { Toast } from '@douyinfe/semi-ui';
import { useState } from 'react';
// @ts-ignore
// import data from "../../mockdata/NotificationMockData.json"
import axios from 'axios';
import apiClient from "../../middlewares/axiosInterceptors";
export const GetData = (pageNum, pageSize) => {
  return apiClient
    .get('http://localhost:8085/notif/getbypagenumandpagesize/test', {
      params: {
        pageNum: pageNum,
        pageSize: pageSize,
      }
    })
    .then(res => {
      console.log(res.data);
      const data = res.data.notifs.map(notif => ({
        id: notif.id,
        userName: notif.userName,
        commentContent: notif.commentContent,
        postId: notif.postId,
        senderId: notif.senderId,
        timeStamp: new Date(notif.timeStamp).getTime(),
        receiverId: notif.receiverId,
        previewType:notif.previewType,
        previewString:notif.previewString
      }));
      const result = {
        data: data,
        totalPages: res.data.totalPages,
        totalNotifs: res.data.totalNotifs,
        notifTag:res.data.notifTag
      };
      console.log(result);
      return result;
    })
    .catch(err => {
      console.log(err);
    });
};
