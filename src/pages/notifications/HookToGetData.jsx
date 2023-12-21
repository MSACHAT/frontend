import { Toast } from '@douyinfe/semi-ui';
import {useState} from 'react';
// @ts-ignore
// import data from "../../mockdata/NotificationMockData.json"
import axios from "axios";
// export const GetData = (currentData,pageSize) => {
//     let isSuccessful = Math.random() >= 0;  // 随机成功或失败
//     console.log(isSuccessful)
//     if (isSuccessful) {
//         Toast.success("请求成功!")
//         const dataArray:any=Object.values(data)
//         const filteredData = dataArray[0].filter(item => {
//             const key = item.key
//             return key > currentData && key <= currentData+pageSize
//         })
//         const result = {
//             data: filteredData
//         };
//
//         return (result);  // 成功，调用resolve
//
//     } else {
//         Toast.warning("请求失败")
//
//         return ({msg: '请求失败'})
//     }
// }
export const GetData=(pageNum,pageSize)=>{
    return axios.get('http://localhost:8085/notif/getbypagenumandpagesize/test', {
        params:{
            "pageNum":pageNum,
            "pageSize":pageSize
        },
        headers:{
            'Content-Type':"application/json"
        }
    }).then(res => {
        console.log(res.data)
        const data=res.data.notifs.map(notif=>({
            "id":notif.id,
            "userName":notif.userName,
            "commentContent":notif.commentContent,
            "postId":notif.postId,
            "senderId":notif.senderId,
            "timeStamp":notif.timeStamp,
            "isRead":notif.read
        }))
        const result= {
            "data":data,
            "totalPages":res.data.totalPages
        }
        console.log(result)
        return(result)
    }).catch(err => {
        console.log(err);
    });
}