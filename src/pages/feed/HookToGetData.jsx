import axios from 'axios';
import { Toast } from '@douyinfe/semi-ui';
import apiClient from '../../middlewares/axiosInterceptors';
// import MockData from '../../mockdata/FeedMockData.json';
// export const GetData = (currentData,pageSize) => {
//             let isSuccessful = Math.random() >= 0;  // 随机成功或失败
//             console.log(isSuccessful)
//             if (isSuccessful) {
//                 Toast.success("请求成功!")
//                 const dataArray:any=Object.values(data)
//                 const filteredData = dataArray[0].filter(item => {
//                     const key = item.key
//                     return key > currentData && key <= currentData+pageSize
//                 })
//                 const result = {
//                     data: filteredData
//                 };
//                 console.log("result"+result)
//                 return (result);  // 成功，调用resolve
//
//             } else {
//                 Toast.warning("请求失败")
//
//                 return ({msg: '请求失败'})
//             }
//     }
export const GetData = (pageNum, pageSize) => {
  return apiClient
    .get('/posts', {
      params: {
        pageNum: pageNum,
        pageSize: pageSize,
      },
    })
    .then(res => {
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
        userId:post.userId,
        avatar: post.avatar,
      }));
      const result = {
        data: data,
        totalPages: res.data.totalPages,
      };
      return result;
    })
    .catch(err => {
      console.log(err);
    });
};
