import axios from 'axios';
import { Toast } from '@douyinfe/semi-ui';
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
export const GetData = (pageNum, pageSize) => {
  return axios
    .get('http://localhost:8085/post/getbypagenumandpagesize/test', {
      params: {
        pageNum: pageNum,
        pageSize: pageSize,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(res => {
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
        isLiked: post.liked,
      }));
      const result = {
        data: data,
        totalPages: res.data.totalPages,
      };
      console.log(result);
      return result;
    })
    .catch(err => {
      console.log(err);
    });
};
