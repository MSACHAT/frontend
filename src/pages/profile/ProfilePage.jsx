import React, { useState, useEffect } from 'react';
import { Avatar, Toast } from '@douyinfe/semi-ui';
import fakeData from "../../mockdata/ProfileMockData.json";
import { Post } from "../../components/PostComponentNew.jsx";
import BottomBarCompomnent from "../../components/BottomBarComponent.jsx";
import { List, Button, Avatar, Spin } from '@douyinfe/semi-ui';

export const Profile = () => {
  const [postData, setPostData] = useState([]);
  const [loginSuccess, setLoginSuccess] = useState(undefined);

  useEffect(() => {
    const count = 2;
    const [data, setData] = useState([]);
    const [countValue, setCountValue] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        const dataList = [];
        for (let i = 0; i < 100; i++) {
            dataList.push({
                color: 'grey',
                title: `Semi Design Title ${i}`,
                loading: false,
            });
        }
        setData(dataList);
        setCountValue(0);
    }, []);

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
    requestProfile.then(res => {
      console.log(res);
      if (res.msg) {
        // 如果有错误消息，将错误消息存储到状态中
        setLoginSuccess(res.msg);
      } else {
        // 如果没有错误消息，显示登录成功的Toast
        Toast.success('登录成功');
        console.log(loginSuccess);
        setPostData(fakeData);
        setLoginSuccess(true);
      }
    });


  }, []); // 依赖数组为空，确保 effect 在初始渲染后只执行一次


  const showLoadMore = countValue % 4 === 0;

  const loadMore =
      !loading && hasMore && showLoadMore ? (
          <div
              style={{
                  textAlign: 'center',
                  marginTop: 12,
                  height: 32,
                  lineHeight: '32px',
              }}
          >
              <Button onClick={fetchData}>显示更多</Button>
          </div>
      ) : null;

  return (
    <div>
         <InfiniteScroll
                initialLoad={false}
                pageStart={0}
                threshold={20}
                loadMore={fetchData}
                hasMore={!loading && hasMore && !showLoadMore}
                useWindow={false}
            >
                <List
                    loadMore={loadMore}
                    dataSource={postData.data}
                    renderItem={ 
                    <Post
                            userName={postData.userName}
                            timeStamp={postData.timeStamp}
                            images={postData.data[0].images}  // 选择一个帖子的图像数组
                            content={postData.data[0].content}  // 选择一个帖子的内容
                            likeCount={postData.data[0].likeCount}  // 选择一个帖子的点赞数
                            commentCount={postData.data[0].commentCount}  // 选择一个帖子的评论数
                            liked={postData.data[0].isLiked}  // 选择一个帖子的是否点赞
                            title={postData.data[0].title}  // 选择一个帖子的标题
                            postId={postData.data[0].postId}  // 选择一个帖子的 ID
                          />
                        }

            </InfiniteScroll>
        
    </div>

//     <>
//       <div>
//         <Avatar size="default" style={{ margin: 4 }} alt="User">
//           <img src={postData.protrait} alt="User" />
//         </Avatar>
//       </div>
//       <div>
//         <h1>个人页面</h1>
//       </div>

// {loginSuccess ? (
//   <Post
//     userName={postData.userName}
//     timeStamp={postData.timeStamp}
//     images={postData.data[0].images}  // 选择一个帖子的图像数组
//     content={postData.data[0].content}  // 选择一个帖子的内容
//     likeCount={postData.data[0].likeCount}  // 选择一个帖子的点赞数
//     commentCount={postData.data[0].commentCount}  // 选择一个帖子的评论数
//     liked={postData.data[0].isLiked}  // 选择一个帖子的是否点赞
//     title={postData.data[0].title}  // 选择一个帖子的标题
//     postId={postData.data[0].postId}  // 选择一个帖子的 ID
//   />
// ) : (
//   <p>Login failed: {loginSuccess}</p>
// )}
//       <BottomBarCompomnent></BottomBarCompomnent>
//     </>
  );
};

export default Profile;
