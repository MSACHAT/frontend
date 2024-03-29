import axios from 'axios';
import { Toast } from '@douyinfe/semi-ui';
import apiClient from '../../middlewares/axiosInterceptors';
// import data from "../../mockdata/FeedMockData.json"
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
// 一个整数值

export const GetData = (pageNum, pageSize) => {
  return apiClient
    .get('/profile', {
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
      console.log(result, 2222222222222222);
      return result;
    })
    .catch(err => {
      console.log(err);
    });
};
