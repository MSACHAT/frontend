import React, {useEffect, useState} from 'react';
import {List, Descriptions, ButtonGroup, Rating, Button, Toast} from '@douyinfe/semi-ui';
import fakeData from "../Json/profile.json"

const LayoutList = () => {

    const [postData, setPostData] = useState([]);
    const [loginSuccess, setLoginSuccess] = useState(undefined);

    useEffect(() => {
        // 模拟登录请求的Promise
        const requestProfile = new Promise((resolve, reject) => {
            // 随机生成成功或失败
            let isSuccessful = true;

            if (isSuccessful) {
                // 成功时，调用resolve
                resolve(fakeData);
            } else {
                // 失败时，调用resolve，并返回错误消息和代码
                resolve({ msg: '密码错误', code: 1001 });
            }
        });

        // 等待登录请求的Promise解析
        requestProfile.then((res) => {
            console.log(res)
            if (res.msg) {
                // 如果有错误消息，将错误消息存储到状态中
                setLoginSuccess(res.msg);
            } else {
                // 如果没有错误消息，显示登录成功的Toast
                Toast.success('登录成功');
                setPostData(fakeData);
            }
        });
    }, []); // 依赖数组为空，确保 effect 在初始渲染后只执行一次

    const handleClick = (postid) => {


        Toast.success(postid+'')
        console.log("AAAAAAAAAAAAAA",postid)
        // 在这里可以使用 postData 进行后续逻辑
    };

    const style = {
        border: '1px solid var(--semi-color-border)',
        backgroundColor: 'var(--semi-color-bg-2)',
        borderRadius: '3px',
        paddingLeft: '20px',
        position: 'relative',
        width: '250px',
        height: '250px',
        overflow: 'hidden'
    };

    return (
        <div>
            <List
                grid={{
                    gutter: 12,
                    span: 6,
                }}
                dataSource={postData.data}
                renderItem={(item) => (
                    <List.Item style={style}>
                        <div onClick={()=>handleClick(item.postId)}>
                            <div>AAAAAAAS</div>

                            <img
                                src={item.image}

                                 style={{
                                     width: '100%',
                                     height: '100%',
                                     objectFit: 'cover',
                                     position: 'absolute',
                                     top: '0',
                                     left: '0',
                                 }}
                            />
                        </div>
                    </List.Item>
                )}
            />
        </div>
    );
};

export default LayoutList;