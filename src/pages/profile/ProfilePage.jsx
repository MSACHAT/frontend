import React, { useState, useEffect, useRef } from 'react';
import './profileStyle.scss';
import fakeData from '../../mockdata/ProfileMockData.json';
import { Post } from '../../components/PostComponent.jsx';
import { List, Button, Image, Spin, ImagePreview } from '@douyinfe/semi-ui';
import InfiniteScroll from 'react-infinite-scroller';
import { IconCamera, IconChevronLeft } from '@douyinfe/semi-icons';
import Text from '@douyinfe/semi-ui/lib/es/typography/text';
import Title from '@douyinfe/semi-ui/lib/es/typography/title';
import BottomBar from '../../components/BottomNavigationBar.jsx';
import { GetData } from './HookToGetData.jsx';
import { UserAvatar } from './UserAvatar';
import apiClient from '../../middlewares/axiosInterceptors';
export const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [dataCount, setDataCount] = useState(0);
  const [postData, setPostData] = useState([]);

  // const fetchData = () => {
  //   setLoading(true);
  //   return new Promise(res => {
  //     //TODO 这里替换为真实的请求
  //     res(fakeData.data);
  //   }).then(newDataSource => {
  //     const newData = [...dataSource, ...newDataSource].map((x, index) => {
  //       return { ...x, likeCount: index };
  //     });
  //     setDataCount(prevCount => prevCount + 1);
  //     setLoading(false);
  //     setDataSource(newData);
  //     setHasMore(newDataSource.length !== 0);
  //   });
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);
  const [pageSize, setPageSize] = useState(2); //修改这个值来调整一次获取的数据量
  const [pageNum, setPageNum] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [userName, setUserName] = useState('');
  const [posts, setPosts] = useState({ data: [] });

  useEffect(() => {
    const fetchData = async () => {
      const result = await GetData(pageNum, pageSize);
      setPosts(prevPosts => ({ data: [...prevPosts.data, ...result.data] }));
      setPageNum(prevPageNum => prevPageNum + 1);
      setTotalPages(result.totalPages);
      console.log(result.data);
    };

    fetchData().then(
      apiClient.get('/users/info').then(res => {
        setUserName(res.data.userName);
      })
    );
  }, []);

  // const showLoadMore = dataCount % 4 === 0;
  function loadMoreData() {
    GetData(pageNum, pageSize).then(result => {
      result.data = [...posts.data, ...result.data];
      setPosts(result);
      setTotalPages(result.totalPages);
      setPageNum(pageNum + 1);
    });
  }

  return (
    <div className="profile-page">
      <div className="empty-space"></div>
      <div className="headtab">
        <UserAvatar />
        <Text className="user-name">{userName}</Text>
      </div>
      <div
        className="light-scrollbar"
        style={{
          overflow: 'auto',
          padding: 10,
        }}
      >
        <InfiniteScroll
          initialLoad={false}
          useWindow={false}
          loadMore={loadMoreData}
          hasMore={pageNum < totalPages}
          pageStart={0}
          threshold={30}
        >
          <List
            dataSource={posts.data}
            renderItem={item => <Post hideUser {...item} />}
          />
          {loading && hasMore && (
            <div style={{ textAlign: 'center' }}>
              <Spin />
            </div>
          )}
        </InfiniteScroll>
      </div>
      <BottomBar></BottomBar>
    </div>
  );
};
