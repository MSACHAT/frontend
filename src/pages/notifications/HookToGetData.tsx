import apiClient from '../../middlewares/axiosInterceptors';
import {NotifModel} from "../../../types/notif";
import {BasePageResponse} from "../../../types/common/service";
export const GetData = (pageNum:number, pageSize:number) => {
  return apiClient
    .get('/notification1s/', {
      params: {
        pageNum: pageNum,
        pageSize: pageSize,
      },
    })
    .then(res => {
      console.log(res.data);
      const data = res.data.notifs.map((notif:NotifModel):NotifModel => ({
        id: notif.id,
        userName: notif.userName,
        commentContent: notif.commentContent,
        postId: notif.postId,
        senderId: notif.senderId,
        timeStamp: new Date(notif.timeStamp).getTime(),
        receiverId: notif.receiverId,
        previewType: notif.previewType,
        previewString: notif.previewString,
        userAvatar: notif.userAvatar,
      }));
      const result:BasePageResponse<NotifModel>&{totalNotifs:number} = {
        data: data,
        totalPages: res.data.totalPages,
        totalNotifs: res.data.totalNotifs,
      };
      console.log(result);
      return result;
    })
    .catch(err => {
      return Promise.reject(err);
    });
};
