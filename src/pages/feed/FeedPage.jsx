import React, { useEffect } from 'react';
import { Layout, List, Badge } from '@douyinfe/semi-ui';
import { Post } from '../../components/PostComponent.jsx';
import { IconBellStroked } from '@douyinfe/semi-icons';
import './FeedStyle.scss';
import { GetData } from './HookToGetData.jsx';
import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import apiClient from '../../middlewares/axiosInterceptors';
import BottomNavigationBar from '../../components/BottomNavigationBar';
import { Link } from 'react-router-dom';
import { UserAvatar } from '../profile/UserAvatar';
export function NewNotif(newNotifCount) {
  if (newNotifCount > 0) {
    return (
      <Link to={'/notifications'} className={'feed-link'}>
        <Badge
          count={newNotifCount}
          className={'feed-badge'}
          position={'rightTop'}
        >
          <IconBellStroked className={'feed-iconbellstroked'}></IconBellStroked>
        </Badge>
      </Link>
    );
  } else {
    return (
      <Link to={'/notifications'} className={'feed-link'}>
        <IconBellStroked className={'feed-iconbellstroked'}></IconBellStroked>
      </Link>
    );
  }
}
export function Feed() {
  const [newNotifCount, setNewNotifCount] = useState(0);
  const pageSize = 3; //修改这个值来调整一次获取的数据量
  const [pageNum, setPageNum] = useState(0);
  function loadMoreData() {
    console.log(pageNum);
    GetData(pageNum, pageSize).then(result => {
      result.data = [...posts.data, ...result.data];
      setPosts(result);
      setTotalPages(result.totalPages);
      setPageNum(pageNum + 1);
    });
  }

  const { Header, Content, Footer } = Layout;
  const [posts, setPosts] = useState({ data: [] });
  const [totalPages, setTotalPages] = useState();
  useEffect(() => {
    setPageNum(0);
    console.log('Getting Data');
    GetData(pageNum, pageSize).then(result => {
      console.log(result);
      setPosts(result);
      setTotalPages(result.totalPages);
    });
    setPageNum(pageNum + 1);
    // setPosts(data);
  }, []);
  useEffect(() => {
    apiClient.get('/notifications/newMessage').then(res => {
      setNewNotifCount(res.data.newNotifCounts);
    });
  }, [newNotifCount]);
  useEffect(() => {
    // 注意：这里没有在挂载时执行的代码，只有在卸载时执行的代码
    return () => {
      setPageNum(0);
      setTotalPages(0);
    };
  }, []);
  return (
    <div className={'feed-page'}>
      <Header className={'feed-header'}>
        <span></span>
        <NewNotif newNotifCount={newNotifCount}></NewNotif>
      </Header>
      <div className={'feed-content'}>
        <InfiniteScroll
          initialLoad={false}
          useWindow={false}
          loadMore={loadMoreData}
          hasMore={pageNum <= totalPages}
          pageStart={0}
          threshold={100}
        >
          <List
            className={'feed-posts'}
            dataSource={posts.data}
            renderItem={record => <Post {...record}></Post>}
          />
        </InfiniteScroll>
      </div>
      <BottomNavigationBar></BottomNavigationBar>
    </div>
  );
}
