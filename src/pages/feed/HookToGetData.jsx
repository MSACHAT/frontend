import { Toast } from '@douyinfe/semi-ui';
import {useState} from 'react';
// @ts-ignore
import data from "../../mockdata/FeedMockData.json"
export const GetData = (currentData,pageSize) => {
            let isSuccessful = Math.random() >= 0;  // 随机成功或失败
            console.log(isSuccessful)
            if (isSuccessful) {
                Toast.success("请求成功!")
                const dataArray:any=Object.values(data)
                const filteredData = dataArray[0].filter(item => {
                    const key = item.key
                    return key > currentData && key <= currentData+pageSize
                })
                const result = {
                    data: filteredData
                };

                return (result);  // 成功，调用resolve

            } else {
                Toast.warning("请求失败")

                return ({msg: '请求失败'})
            }
    }