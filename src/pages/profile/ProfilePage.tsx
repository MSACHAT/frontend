import React, { useState, useEffect } from 'react';
import './profileStyle.scss';

import { Post } from '../../components/PostComponent';
import { List, Spin } from '@douyinfe/semi-ui';
import InfiniteScroll from 'react-infinite-scroller';

import Text from '@douyinfe/semi-ui/lib/es/typography/text';

import BottomBar from '../../components/BottomNavigationBar';
import { GetData } from './HookToGetData';
import { UserAvatar } from './UserAvatar';
import apiClient from '../../middlewares/axiosInterceptors';
import { PostModel } from '../../../types/post';

interface ProfileProps { }

export const Profile: React.FC<ProfileProps> = () => {
  const [loading, setLoading] = useState<boolean>(false);


  const [pageNum, setPageNum] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [userName, setUserName] = useState<string>('');
  const [posts, setPosts] = useState<PostModel[]>([]);
  const pageSize: number = 100;
  const hasMore: boolean = true;
  useEffect(() => {
    const fetchData = async () => {
      const result = await GetData(pageNum, pageSize);
      setPosts(prevPosts => [...prevPosts, ...result.data]);
      setPageNum(prevPageNum => prevPageNum + 1);
      setTotalPages(result.totalPages);
    };
    setLoading(true);
    fetchData().then(() => {
      apiClient.get('/users/info').then(res => {
        setUserName(res.data.userName);
        setLoading(false);
      });
    });
  }, []);

  function loadMoreData() {
    setLoading(true);
    GetData(pageNum, pageSize).then(result => {
      setPosts([...posts, ...result.data]);
      setTotalPages(result.totalPages);
      setPageNum(pageNum + 1);
      setLoading(false);
    });
  }

  return (
    <div className="profile-page">
      <div className="empty-space"></div>
      <div className="headtab">
        <UserAvatar disableEdit={false} imageUrl={"https://upen.caup.net/ai_pics_mj/202303/1677952366325269.jpg"} />
        <Text className="user-name">{userName || 'User'}</Text>
      </div>
      <div className="light-scrollbar" style={{ overflow: 'auto', padding: 10 }}>
        <InfiniteScroll
          initialLoad={false}
          useWindow={false}
          loadMore={loadMoreData}
          hasMore={pageNum < totalPages}
          pageStart={0}
          threshold={30}
        >
          <List dataSource={posts} renderItem={(item: object) => <Post hideUser {...item} />} />
          {loading && hasMore && (
            <div style={{ textAlign: 'center' }}>
              <Spin />
            </div>
          )}
        </InfiniteScroll>
      </div>
      <BottomBar />
    </div>
  );
};
