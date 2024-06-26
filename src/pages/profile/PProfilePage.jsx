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
import { GetData } from './HookToGetData copy.jsx';
import { UserAvatar } from './UserAvatar.tsx';
import { useParams } from 'react-router-dom';
export const PProfile = () => {
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [pageSize, setPageSize] = useState(100); //修改这个值来调整一次获取的数据量
  const [pageNum, setPageNum] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const { userId } = useParams();
  let avatar;
  const [posts, setPosts] = useState({ data: [] });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await GetData(pageNum, pageSize, userId);
      setPosts(prevPosts => ({ data: [...prevPosts.data, ...result.data] }));
      setPageNum(prevPageNum => prevPageNum + 1);
      setTotalPages(result.totalPages);
      avatar = result.avatar;
      setLoading(false);
    };
    fetchData();
  }, []);
  //=============头像专用
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const result = await GetData(pageNum, pageSize, userId);
      setAvatarUrl(result.avatar);
    }
    fetchData();
  }, []);

  //==============
  function loadMoreData() {
    setLoading(true);
    GetData(pageNum, pageSize, userId).then(result => {
      result.data = [...posts.data, ...result.data];
      setPosts(result);
      setTotalPages(result.totalPages);
      setPageNum(pageNum + 1);
      setLoading(false);
    });
  }
  return (
    <div className="profile-page">
      <div className="empty-space"></div>
      <div className="headtab">
        {avatarUrl && <UserAvatar imageUrl={avatarUrl} disableEdit={true} />}
        <Text className="user-name">
          {posts.data.length > 0 ? posts.data[0].userName : ''}
        </Text>
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
